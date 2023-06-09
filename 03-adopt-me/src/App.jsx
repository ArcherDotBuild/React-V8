// Importing parts of packages
import { useState} from 'react'
import { createRoot } from "react-dom/client";
import { Link, BrowserRouter, Routes, Route } from "react-router-dom";
// Instantiate the query provider
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AdoptedPetContext from './AdoptedPetContenxt';
import SearchParams from "./SearchParams";
import Details from "./Details";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // How long do you want me to cache things for our petAPI, breed lists and everything
      staleTime: Infinity,
      // SO if I wanted 10 minutes i would do 1000 * 60 * 10
      cacheTime: Infinity,
    },
  },
});

const App = () => {
  const adoptedPet = useState(null)
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AdoptedPetContext.Provider value={adoptedPet}>
          <header>
            <Link to="/">
              <h1>Adopt Me!</h1>
            </Link>
          </header>
          <Routes>
            <Route path="/details/:id" element={<Details />} />
            <Route path="/" element={<SearchParams />} />
          </Routes>
        </AdoptedPetContext.Provider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
