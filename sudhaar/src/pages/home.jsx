import React from 'react';
import Navbar from "../components/Navbar";
import { Link } from 'react-router-dom';
import Lottie from 'lottie-react'; // Default import for Lottie
import styles from './home.module.css';
import homemoneyAnimation from '../assets/homemoney.json'; // Path to your JSON file

const Home = () => {
  return (
    <>
      <Navbar />
      <div className={styles.container}>
        {/* Left Column */}
        <div className={styles.leftColumn}>
          <h1 className={styles.textRow}>ASK</h1>
          <h1 className={styles.textRow}>PREDICT</h1>
          <h1 className={styles.textRow}>ANALYSE</h1>
          <div className={styles.buttonGroup}>
            <Link to="/predict" className={styles.button}>Predict Now</Link>
            <Link to="/aboutus" className={styles.button}>What We Do</Link>
          </div>
        </div>

        {/* Right Column */}
        <div className={styles.rightColumn}>
          <Lottie 
            animationData={homemoneyAnimation} 
            className={styles.animation} 
          />
        </div>
      </div>
    </>
  );
};

export default Home;
