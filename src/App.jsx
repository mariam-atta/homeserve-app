import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BookingsProvider } from "./context/BookingsContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Services from "./pages/Services";
import ServiceDetails from "./pages/ServiceDetails";
import Booking from "./pages/Booking";
import BookingConfirmed from "./pages/BookingConfirmed";
import About from "./pages/About";
import UserDashboard from "./pages/UserDashboard";
import AdminPanel from "./pages/AdminPanel";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import Faq from "./pages/Faq";
import HelpCenter from "./pages/HelpCenter";
import CardDetails from "./pages/CardDetails";
import ScrollToTop from "./components/ScrollToTop";


export default function App() {
  return (
    <BookingsProvider>
      <BrowserRouter>
      <ScrollToTop />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:serviceId" element={<ServiceDetails />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/booking-confirmed" element={<BookingConfirmed />} />
            <Route path="/about" element={<About />} />
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/help" element={<HelpCenter />} />
            <Route path="/payment-details" element={<CardDetails />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </BookingsProvider>
  );
}