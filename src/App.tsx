import { BrowserRouter, Routes, Route } from "react-router-dom";
import Location from "./pages/Location";
import Home from "./pages/Home";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/location" element={<Location />} />
      </Routes>
    </BrowserRouter>
  );
}
