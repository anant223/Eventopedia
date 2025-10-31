import { useMemo, useCallback } from "react";

// Spatial grid for O(1) collision detection
export class SpatialGrid {
  constructor(width, height, cellSize = 15) {
    this.cellSize = cellSize;
    this.cols = Math.ceil(width / cellSize);
    this.rows = Math.ceil(height / cellSize);
    this.grid = new Array(this.cols * this.rows).fill(null).map(() => []);
  }

  getGridIndex(x, y) {
    const col = Math.floor(x / this.cellSize);
    const row = Math.floor(y / this.cellSize);
    return Math.max(
      0,
      Math.min(this.cols * this.rows - 1, row * this.cols + col)
    );
  }

  insert(x, y, id) {
    const index = this.getGridIndex(x, y);
    this.grid[index].push({ x, y, id });
  }

  getNearby(x, y, radius = 15) {
    const nearby = [];
    const cellRadius = Math.ceil(radius / this.cellSize);
    const col = Math.floor(x / this.cellSize);
    const row = Math.floor(y / this.cellSize);

    for (let r = row - cellRadius; r <= row + cellRadius; r++) {
      for (let c = col - cellRadius; c <= col + cellRadius; c++) {
        if (r >= 0 && r < this.rows && c >= 0 && c < this.cols) {
          const index = r * this.cols + c;
          nearby.push(...this.grid[index]);
        }
      }
    }
    return nearby;
  }
}

// Optimized positioning hook
// Alternative: Use the hook directly
// const { positions, regeneratePositions } = useOptimizedPositioning(sampleEvents);
// setEvents(positions);
