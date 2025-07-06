import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {Provider} from "react-redux"
import store from "./app/store.js"
import './index.css'
import App from './App.jsx'
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient(
  {
    defaultOptions : {
      queries : {
        staleTime : 5 * 60 * 1000,
        retry : 3,
        refetchOnWindowFocus : false
      }
    }
  }
)
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Provider>
  </StrictMode>
);
