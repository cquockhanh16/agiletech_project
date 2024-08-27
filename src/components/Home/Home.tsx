import React from "react";
import "./Home.css";
import Header from "../../shared/components/Navigation/Header";
import Introduction from "./Introduction/Introduction";
import Features from "./Features/Features";
import Testimonials from "./Testimonials/Testimonials";
import Footer from "../../shared/components/Footer/Footer";

interface LoginProps {
  isAuthenticated: boolean;
  onLogout: () => void;
}

const Home: React.FC<LoginProps> = ({ isAuthenticated, onLogout }) => {
  return (
    <main>
      <div className='container'>
        <Header isAuthenticated={isAuthenticated} onLogout={onLogout} />
        <Introduction />
        <Features />
        <Testimonials />
        <Footer />
      </div>
    </main>
  );
};

export default Home;
