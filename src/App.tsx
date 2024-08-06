import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import Header from "./components/common/header/Header";
import Banner from "./components/common/banner/Banner";

const App: React.FC = () => (
  <Router>
    <Header />
    <Banner />
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  </Router>
);

export default App;
