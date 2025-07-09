import React from 'react';
import { NavLink } from 'react-router-dom';
import githubIcon from '../assets/github-colored.png';
import linkedinIcon from '../assets/linkedin-colored.png';
import styles from './NavBar.module.css';

const NavBar = () => (
  <nav className={styles.navbar}>
    <div className={styles.logo}>VSD</div>
    <div className={styles.links}>
      <NavLink to="/" className={({ isActive }) => isActive ? styles.active : ''}>Home</NavLink>
      <NavLink to="/projects" className={({ isActive }) => isActive ? styles.active : ''}>Projects</NavLink>
      <NavLink to="/resume" className={({ isActive }) => isActive ? styles.active : ''}>Résumé</NavLink>
    </div>
    <div className={styles.socials}>
      <a href="https://github.com/vdas27" target="_blank" rel="noopener noreferrer">
        <img src={githubIcon} alt="GitHub" />
      </a>
      <a href="https://www.linkedin.com/in/vivan-das-5782b1283" target="_blank" rel="noopener noreferrer">
        <img src={linkedinIcon} alt="LinkedIn" />
      </a>
    </div>
  </nav>
);

export default NavBar; 