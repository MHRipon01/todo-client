import React from "react";
import "./index.css";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom"; 
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { DndProvider, useDrag } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

 
import AuthProvider from "./firebase/AuthProvider";
import router from "./Routes/Router";
import App from "./App";

const queryClient = new QueryClient()




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
    <DndProvider backend={HTML5Backend}>
    <QueryClientProvider client={queryClient}>
    <RouterProvider router={router}></RouterProvider>
     
    </QueryClientProvider>
    </DndProvider>
    </AuthProvider>
    
  </React.StrictMode>,
)
