import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './Projects.module.css';
import ProjectCard from '../components/ProjectCard';
import { projectsData } from '../projectsData';

const Projects = () => {
  const location = useLocation();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (location.state?.scrollToIndex !== undefined) {
      setCurrentIndex(location.state.scrollToIndex);
    }
  }, [location.state]);

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % projectsData.length);
  };

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + projectsData.length) % projectsData.length);
  };

  // Get the 3 projects to display (current, next, and previous)
  const getVisibleProjects = () => {
    const projects = [];
    const totalProjects = projectsData.length;
    // Add previous project
    const prevIndex = (currentIndex - 1 + totalProjects) % totalProjects;
    projects.push({ ...projectsData[prevIndex], position: 'left', index: prevIndex });
    // Add current project
    projects.push({ ...projectsData[currentIndex], position: 'center', index: currentIndex });
    // Add next project
    const nextIndex = (currentIndex + 1) % totalProjects;
    projects.push({ ...projectsData[nextIndex], position: 'right', index: nextIndex });
    return projects;
  };

  const visibleProjects = getVisibleProjects();

  return (
    <div className={styles.projectsPage}>
      <div className={styles.galleryContainer}>
        <button 
          className={styles.arrowButton} 
          onClick={prevProject}
          aria-label="Previous project"
        >
          ‹
        </button>
        <div className={styles.galleryContent}>
          <div className={styles.cardsContainer}>
            {visibleProjects.map((project) => (
              <div 
                key={`${project.id}-${currentIndex}`} 
                className={`${styles.cardWrapper} ${styles[project.position]}`}
              >
                <ProjectCard {...project} index={project.index} />
              </div>
            ))}
          </div>
        </div>
        <button 
          className={styles.arrowButton} 
          onClick={nextProject}
          aria-label="Next project"
        >
          ›
        </button>
      </div>
      <div className={styles.galleryInfo}>
        <span className={styles.projectCounter}>
          {currentIndex + 1} of {projectsData.length}
        </span>
      </div>
    </div>
  );
};

export default Projects; 