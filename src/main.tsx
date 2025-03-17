import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router";
import App from './App.tsx'
import './index.css'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import ExampleContextProvider from './contexts/Example/ExampleProvider.tsx';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ExampleContextProvider>
          <App />
        </ExampleContextProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
