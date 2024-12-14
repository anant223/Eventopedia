import React from "react"
import { RouterProvider } from "react-router-dom";
import AppRouting from "./Routes/AppRouting";
function App() {

  return (
    <div>
      <RouterProvider router={AppRouting}/>
    </div>
  );
}

export default App
