
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Lots from "./pages/Lots";
import Slots from "./pages/Slots";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="lotsByCity" element={<Lots />} />
          <Route path="slots/:lotId" element={<Slots />} />
                  </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
