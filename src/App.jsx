import React, { Suspense } from "react"
import { RouterProvider } from "react-router-dom";
import AppRouting from "./Routes/AppRouting";
import {LoadingSpinner} from "./components/common/index";
function App() {

  return (
    <div>
      <Suspense fallback={<LoadingSpinner/>}>
        <RouterProvider router={AppRouting}/>
      </Suspense>
    </div>
  );
}

export default App
