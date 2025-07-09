import React from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { projectsData } from '../projectsData';
import styles from './Projects.module.css';
import cardStyles from '../components/ProjectCard.module.css';

const ProjectDetail = (props) => {
  // Support both prop and route param
  const params = useParams();
  const location = useLocation();
  const id = props.id || params.id;
  const project = projectsData.find(p => p.id === id);
  const navigate = useNavigate();
  const fromIndex = location.state?.fromIndex;

  if (!project) {
    return <div className={styles.projectsPage}><h1>Project Not Found</h1></div>;
  }

  return (
    <div className={styles.projectsPage} style={{ minHeight: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className={cardStyles.modal} style={{ maxWidth: 800, width: '100%' }}>
        <button className={cardStyles.closeBtn} onClick={() => navigate('/projects', { state: { scrollToIndex: fromIndex } })} title="Back to Projects">&times;</button>
        <div className={cardStyles.modalMedia}>
          {project.video ? (
            <video src={project.video} controls autoPlay loop muted playsInline poster={project.image} className={cardStyles.modalVideo} />
          ) : project.image ? (
            <img src={project.image} alt={project.title + ' screenshot'} className={cardStyles.modalImage} />
          ) : null}
        </div>
        <h2 className={cardStyles.modalTitle}>{project.title}</h2>
        <div className={cardStyles.tags}>{project.tags.map((tag, i) => <span className={cardStyles.tag} key={i}>{tag}</span>)}</div>
        <div 
          className={cardStyles.modalDescription}
          dangerouslySetInnerHTML={{ __html: project.details || project.description }}
        />
        <div className={cardStyles.links}>
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className={cardStyles.link}>
              GitHub
            </a>
          )}
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer" className={cardStyles.link}>
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail; 