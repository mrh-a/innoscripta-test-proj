import { Route, Routes } from 'react-router';
import { MainRoutes } from './core/config/routes.config';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from "./components/Header/Header";
import SearchBar from './components/HomePageContainer/SearchBar/SearchBar';

function App() {

  const queryClient = new QueryClient()

  return (
    <div className="">
      <div className="container mx-auto h-[2000px] py-[10px] shadow">
        <QueryClientProvider client={queryClient}>
          <Header />
          <main className="p-[20px]">
            <Routes>
              {MainRoutes.map(({ component: Component, route }) => (
                <Route key={route} path={route} element={<Component />} />
              ))}
            </Routes>
          </main>
          <footer></footer>
        </QueryClientProvider>
      </div>
    </div>
  );
}

export default App
