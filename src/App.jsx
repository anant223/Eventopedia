import React, { Suspense } from "react"
import { RouterProvider } from "react-router-dom";
import AppRouting from "./Routes/AppRouting";
import { Toaster } from "sonner"; 
import { LoadingSpinner } from "./components/common";
import useAuth from "./hooks/useAuth";

function App() {
  // const {loading, initialized} = useAuth()
  // if(loading || initialized) return <LoadingSpinner/>
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
