import { useMemo, useEffect } from "react";

const useOptimizedPositioning = (sampleEvents) => {
  const memoizedPositions = useMemo(() => {
    if (!sampleEvents?.length) return [];

    const BOUNDS = { minX: 8, maxX: 92, minY: 15, maxY: 85 };
    const MIN_DISTANCE = 12;
    const GRID_SIZE = 15;

    // Create spatial grid for fast collision detection
    const spatialGrid = new SpatialGrid(100, 100, GRID_SIZE);

    // Pre-calculate optimal cluster configuration
    const getOptimalClusters = (eventCount) => {
      if (eventCount <= 5) return 2;
      if (eventCount <= 15) return 3;
      if (eventCount <= 30) return 4;
      return Math.min(6, Math.ceil(eventCount / 8));
    };

    // Fast distance check using spatial grid
    const hasCollision = (x, y) => {
      const nearby = spatialGrid.getNearby(x, y, MIN_DISTANCE);
      return nearby.some((point) => {
        const dx = x - point.x;
        const dy = y - point.y;
        return dx * dx + dy * dy < MIN_DISTANCE * MIN_DISTANCE;
      });
    };

    // Optimized position generator with regional bounds
    const generatePosition = (cluster, maxAttempts = 25) => {
      // Try clustered positions first (more likely to succeed)
      for (let attempt = 0; attempt < maxAttempts; attempt++) {
        const angle =
          (attempt / maxAttempts) * Math.PI * 2 + Math.random() * 0.3;
        const distance = Math.sqrt(Math.random()) * cluster.radius;

        let x =
          cluster.centerX +
          Math.cos(angle) * distance +
          (Math.random() - 0.5) * 6;
        let y =
          cluster.centerY +
          Math.sin(angle) * distance +
          (Math.random() - 0.5) * 6;

        // Clamp to regional bounds first, then global bounds
        if (cluster.bounds) {
          x = Math.max(cluster.bounds.minX, Math.min(cluster.bounds.maxX, x));
          y = Math.max(cluster.bounds.minY, Math.min(cluster.bounds.maxY, y));
        }

        x = Math.max(BOUNDS.minX, Math.min(BOUNDS.maxX, x));
        y = Math.max(BOUNDS.minY, Math.min(BOUNDS.maxY, y));

        if (!hasCollision(x, y)) {
          return { x, y };
        }
      }

      // Fallback: systematic search within region bounds
      const searchBounds = cluster.bounds || BOUNDS;
      const step = MIN_DISTANCE * 0.8;

      for (let gx = searchBounds.minX; gx <= searchBounds.maxX; gx += step) {
        for (let gy = searchBounds.minY; gy <= searchBounds.maxY; gy += step) {
          const jitterX = gx + (Math.random() - 0.5) * step * 0.5;
          const jitterY = gy + (Math.random() - 0.5) * step * 0.5;

          if (!hasCollision(jitterX, jitterY)) {
            return {
              x: Math.max(BOUNDS.minX, Math.min(BOUNDS.maxX, jitterX)),
              y: Math.max(BOUNDS.minY, Math.min(BOUNDS.maxY, jitterY)),
            };
          }
        }
      }

      // Last resort: random position within region
      return {
        x:
          searchBounds.minX +
          Math.random() * (searchBounds.maxX - searchBounds.minX),
        y:
          searchBounds.minY +
          Math.random() * (searchBounds.maxY - searchBounds.minY),
      };
    };

    // Define geographic regions
    const REGIONS = {
      US: {
        name: "US Zone",
        centerX: 25, // Left side of map
        centerY: 40,
        width: 35, // Region width
        height: 50, // Region height
        subClusters: 2, // Number of clusters within region
      },
      EUROPE_ASIA_AFRICA: {
        name: "Europe/Asia/Africa Zone",
        centerX: 75, // Right side of map
        centerY: 40,
        width: 35,
        height: 50,
        subClusters: 3, // More clusters for larger region
      },
    };

    // Categorize events by region (you can customize this logic)
    const categorizeEvent = (event, index) => {
      // Example categorization - customize based on your event data
      if (
        event.region === "US" ||
        event.country === "USA" ||
        event.timezone?.includes("America")
      ) {
        return "US";
      }
      // You can add more sophisticated logic here based on:
      // - event.country, event.timezone, event.location
      // - or simply alternate: return index % 2 === 0 ? 'US' : 'EUROPE_ASIA_AFRICA';
      return "EUROPE_ASIA_AFRICA";
    };

    // Group events by region
    const eventsByRegion = {
      US: [],
      EUROPE_ASIA_AFRICA: [],
    };

    sampleEvents.forEach((event, index) => {
      const region = categorizeEvent(event, index);
      eventsByRegion[region].push({ ...event, originalIndex: index });
    });

    // Generate clusters for each region
    const clusters = [];

    Object.entries(REGIONS).forEach(([regionKey, region]) => {
      const regionEvents = eventsByRegion[regionKey];
      if (regionEvents.length === 0) return;

      // Create sub-clusters within this region
      for (let i = 0; i < region.subClusters; i++) {
        // Distribute clusters within region bounds
        const offsetX = (i % 2) * (region.width * 0.6) - region.width * 0.3;
        const offsetY =
          Math.floor(i / 2) * (region.height * 0.6) - region.height * 0.3;

        clusters.push({
          regionKey,
          regionName: region.name,
          centerX: region.centerX + offsetX + (Math.random() - 0.5) * 10,
          centerY: region.centerY + offsetY + (Math.random() - 0.5) * 10,
          radius: Math.max(10, 20 - regionEvents.length / region.subClusters),
          bounds: {
            minX: region.centerX - region.width / 2,
            maxX: region.centerX + region.width / 2,
            minY: region.centerY - region.height / 2,
            maxY: region.centerY + region.height / 2,
          },
          targetEvents: regionEvents,
        });
      }
    });

    // Generate positions by region
    const positions = [];
    let globalEventIndex = 0;

    // Process each cluster and distribute its target events
    clusters.forEach((cluster, clusterIndex) => {
      const eventsInCluster = Math.ceil(
        cluster.targetEvents.length /
          clusters.filter((c) => c.regionKey === cluster.regionKey).length
      );

      const clusterEvents = cluster.targetEvents.slice(0, eventsInCluster);

      clusterEvents.forEach((event) => {
        const position = generatePosition(cluster);

        // Add to spatial grid for collision detection
        spatialGrid.insert(position.x, position.y, globalEventIndex);

        positions.push({
          ...event,
          position,
          clusterId: clusterIndex,
          regionKey: cluster.regionKey,
          regionName: cluster.regionName,
        });

        globalEventIndex++;
      });

      // Remove processed events from the target list
      cluster.targetEvents = cluster.targetEvents.slice(eventsInCluster);
    });

    // Handle any remaining unprocessed events
    clusters.forEach((cluster) => {
      cluster.targetEvents.forEach((event) => {
        const position = generatePosition(cluster);

        spatialGrid.insert(position.x, position.y, globalEventIndex);

        positions.push({
          ...event,
          position,
          clusterId: -1,
          regionKey: cluster.regionKey,
          regionName: cluster.regionName,
        });

        globalEventIndex++;
      });
    });

    return positions;
  }, [sampleEvents]);

  // Memoized regeneration function for updates
  const regeneratePositions = useCallback(() => {
    // Force re-render by returning new array reference
    return memoizedPositions.map((event) => ({
      ...event,
      position: { ...event.position },
    }));
  }, [memoizedPositions]);

  return { positions: memoizedPositions, regeneratePositions };
};
