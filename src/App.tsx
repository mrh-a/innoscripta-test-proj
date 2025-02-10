import { Route, Routes } from "react-router";
import { MainRoutes } from "./core/config/routes.config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "./components/Header/Header";
import { ToastContainer } from "react-toastify";
import { ErrorBoundary } from "react-error-boundary";

function App() {
  const queryClient = new QueryClient();

  return (
    <div className="">
      <ToastContainer />
      <div className="container mx-auto py-[10px] shadow">
        <QueryClientProvider client={queryClient}>
          <Header />
          <ErrorBoundary
            fallback={
              <div className="text-[24px] text-center font-bold mt-[300px]">
                Something went wrong!
              </div>
            }
          >
            <main className="p-[20px]">
              <Routes>
                {MainRoutes.map(({ component: Component, route }) => (
                  <Route key={route} path={route} element={<Component />} />
                ))}
              </Routes>
            </main>
          </ErrorBoundary>
          <footer></footer>
        </QueryClientProvider>
      </div>
    </div>
  );
}

export default App;
