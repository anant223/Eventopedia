import React, { Suspense } from "react"
import { RouterProvider } from "react-router-dom";
import AppRouting from "./Routes/AppRouting";
import {LoadingSpinner} from "./components/common/index";
import { Toaster } from "sonner"; 

function App() {

  return (
    <div>
      <Toaster position="top-center" richColors/>
        <Suspense fallback={<LoadingSpinner />}>
          <RouterProvider router={AppRouting} />
        </Suspense>
    </div>
  );
}

export default App
