import React, { useState, useEffect } from 'react';
import styles from './Resume.module.css';
import resumePDF from '../assets/Das_Vivan_Resume.pdf';

const Resume = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showPDF, setShowPDF] = useState(false);

  useEffect(() => {
    // Show loading for a minimum time to prevent flash
    const timer = setTimeout(() => {
      setIsLoading(false);
      setShowPDF(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.resumePage}>
      <h1>Résumé</h1>
      
      {isLoading && (
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}></div>
          <p>Loading resume...</p>
        </div>
      )}
      
      {showPDF && (
        <div className={styles.viewerContainer}>
          <iframe
            src={resumePDF}
            title="Resume PDF"
            className={styles.resumeViewerLarge}
            frameBorder="0"
            onLoad={() => setIsLoading(false)}
          />
        </div>
      )}
      
      <a href={resumePDF} download className={styles.downloadBtn}>
        Download PDF
      </a>
    </div>
  );
};

export default Resume; 