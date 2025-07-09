import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './ProjectCard.module.css';

const ProjectCard = React.memo(({ id, title, description, image, video, github, demo, tags = [], index }) => {
  const [hovered, setHovered] = useState(false);
  const handleButtonClick = (e, url) => {
    e.stopPropagation();
    e.preventDefault();
    window.open(url, '_blank', 'noopener,noreferrer');
  };
  return (
    <Link
      to={`/projects/${id}`}
      state={{ fromIndex: index }}
      className={styles.cardLink}
      tabIndex={0}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      <div className={styles.card}>
        {video ? (
          hovered ? (
            <video className={styles.media} src={video} autoPlay loop muted playsInline poster={image} />
          ) : (
            <img className={styles.media} src={image} alt={title + ' screenshot'} loading="lazy" />
          )
        ) : image ? (
          <img className={styles.media} src={image} alt={title + ' screenshot'} loading="lazy" />
        ) : null}
        <div className={styles.content}>
          <h2 className={styles.title}>{title}</h2>
          <div className={styles.tags}>{tags.map((tag, i) => <span className={styles.tag} key={i}>{tag}</span>)}</div>
          <p className={styles.description}>{description}</p>
          <div className={styles.links}>
            {github && (
              <span
                className={styles.link}
                onClick={e => handleButtonClick(e, github)}
                tabIndex={0}
                role="button"
                onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && handleButtonClick(e, github)}
              >
                GitHub
              </span>
            )}
            {demo && (
              <span
                className={styles.link}
                onClick={e => handleButtonClick(e, demo)}
                tabIndex={0}
                role="button"
                onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && handleButtonClick(e, demo)}
              >
                Live Demo
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
});

export default ProjectCard; 