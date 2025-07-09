import React, { useState } from 'react';
import styles from './Home.module.css';
import { Link } from 'react-router-dom';
import profilePic from '../assets/profile-picture.JPEG';
import CircularText from '../CircularText';

const linkedinUrl = 'https://www.linkedin.com/in/vivandas/';
const githubUrl = 'https://github.com/vdas27';
const email = 'vdas@uchicago.edu';

const Home = () => {
  const [showAbout, setShowAbout] = useState(false);

  return (
    <div className={styles.hero}>
      {showAbout && (
        <div className={styles.aboutModalOverlay}>
          <div className={styles.aboutModal}>
            <button className={styles.closeBtn} onClick={() => setShowAbout(false)} title="Close">&times;</button>
            <h2>About Me</h2>
            <p>
              Hi! I'm Vivan, an undergraduate Computer Science major and Classical Studies minor at the University of Chicago.
              I'm passionate about software engineering, systems engineering, and using AI and ML to create data driven insights on real world problems. <br />
              Recently, as part of an internship project, I've done lots of work with NLP models. Specifically, I've been working on a project to train an NER model to recognize special entities in a national sports league.
              This model is then used to enhance analysis on current trends within the league. <br />
              Beyond programming, I'm a huge fan of European Soccer, the NBA, and F1. I'm also a big runner and love to play the piano. I hope you enjoy my website!
            </p>
            <h3>Reach Out!</h3>
            <div className={styles.reachOutLinks}>
              <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className={styles.reachOutBtn}>LinkedIn</a>
              <a href={githubUrl} target="_blank" rel="noopener noreferrer" className={styles.reachOutBtn}>GitHub</a>
              <a href={`mailto:${email}`} className={styles.reachOutBtn}>Email</a>
            </div>
          </div>
        </div>
      )}
      <div className={styles.profileContainer} style={{ position: 'relative' }}>
        <CircularText
          text="Click me! * Click me! * "
          onHover="speedUp"
          spinDuration={20}
          className="custom-class"
        />
        <img
          src={profilePic}
          alt="Vivan Das"
          className={styles.profilePic}
          style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', zIndex: 2, cursor: 'pointer' }}
          onClick={() => setShowAbout(true)}
        />
        <div className={styles.profileGlow}></div>
      </div>
      <h1>Vivan Sen Das</h1>
      <h2>Undergraduate Computer Science Major at the University of Chicago</h2>
      <p className={styles.tagline}>Groton, MA</p>
      <Link to="/projects" className={styles.cta}>View My Projects</Link>
    </div>
  );
};

export default Home; 