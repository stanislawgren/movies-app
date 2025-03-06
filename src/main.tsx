import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "@/components/ui/provider";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./utils/queryClient.ts";
import MainPage from "./pages/MainPage.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </QueryClientProvider>
  </StrictMode>
);
