import React from 'react';
import styles from './Aboutus.module.css';
import Navbar from "../components/Navbar";

const Aboutus = () => {
  return(
    <>
      <Navbar/>

      <div className={styles.container}>
        {/* Main Box */}
        <div className={styles.missionBox}>
          <h1 className={styles.heading}>What We Do?</h1>
          <p className={styles.missionText}>
            To help individuals figure out the outcome
            of their loan approvals and additionally better their outcome by providing in depth analysis of the
            information provided by them.
          </p>
          <button className={styles.readMoreButton}>TRY IT OUT</button>
        </div>
      </div>
    </>
  );
};
export default Aboutus;
