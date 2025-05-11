import React, { Suspense } from "react"
import { RouterProvider } from "react-router-dom";
import AppRouting from "./Routes/AppRouting";
function App() {

  return (
    <div>
      <Suspense fallback={<h1 className=" text-text font-bold">Loading...</h1>}>
        <RouterProvider router={AppRouting}/>
      </Suspense>
    </div>
  );
}

export default App
