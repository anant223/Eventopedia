# React + Vite

# Socket.IO Integration for Like Button
## Implemented real-time updates for the "Like" feature using Socket.IO. When a user likes or unlikes an event, the action is emitted via WebSockets, instantly broadcasting updates across all connected clients.


# 🧠 Data Management Strategy
## React Query handles most read-heavy server state like fetching events.

## Custom hook useAPI handles mutations like liking or subscribing, and integrates with Redux.

## This hybrid setup keeps flexibility, performance, and developer experience in balance.