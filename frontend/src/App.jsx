
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Lots from "./pages/Lots";
import Slots from "./pages/Slots";
import Navbar from "./pages/Navbar";
import Booking from "./pages/Booking";
import TicketHistory from "./pages/TicketHistory";
import ViewLots from "./pages/ViewLots";
import AddLots from "./pages/AddLots";


function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="lotsByCity" element={<Lots />} />
          <Route path="slots/:lotId" element={<Slots />} />
          <Route path="booking/:slotId" element={<Booking />} />
          <Route path="/ticket-history" element={<TicketHistory />} />
          <Route path="/viewLot" element={<ViewLots />} />
          <Route path="/addLot" element={<AddLots />} />


          </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
