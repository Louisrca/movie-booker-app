import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Movie from "./pages/Movie/Movie";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Booking from "./pages/Booking/Booking";

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/movie/:id" element={<Movie />} />
          <Route path="booking" element={<Booking />} />
        </Routes>
      </QueryClientProvider>
    </>
  );
}

export default App;
