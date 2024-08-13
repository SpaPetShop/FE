import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import Header from "./components/common/header/Header";
import Banner from "./components/common/banner/Banner";
import Footer from "./components/common/footer/Footer";
import DetailPage from "./components/detail/DetailPage";
import Booking from "./components/booking/Booking";
import ScrollToTop from "./core/common/ScrollToTop";
import ScrollToTopButton from "./components/common/scrollToTop/ScrollToTopButton";

const App: React.FC = () => (
  <Router>
    <ScrollToTop />
    <Header />
    <Banner />
    <ScrollToTopButton />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/detail" element={<DetailPage />} />
      <Route path="/booking" element={<Booking />} />
    </Routes>
    <Footer />
  </Router>
);

export default App;
