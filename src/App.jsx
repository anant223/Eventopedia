import React, { Suspense } from "react"
import { RouterProvider } from "react-router-dom";
import AppRouting from "./Routes/AppRouting";
import Loader from "./components/Loader/Loader";
function App() {

  return (
    <div>
      <Suspense fallback={<Loader/>}>
        <RouterProvider router={AppRouting}/>
      </Suspense>
    </div>
  );
}

export default App
