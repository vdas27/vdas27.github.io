import React, { useRef, useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Resume from './pages/Resume';
import ProjectDetail from './pages/ProjectDetail';
import styles from './App.module.css';
import Waves from './Waves';

// Route order for determining direction
const routeOrder = ['/', '/projects', '/projects/:id', '/resume'];

const isProjectDetail = (path) => /^\/projects\/[\w-]+$/.test(path.replace(/\/$/, ''));

// Directional Slide Transition Component
const DirectionalSlideTransition = ({ pathname }) => {
  const [slideDirection, setSlideDirection] = useState('right');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentPage, setCurrentPage] = useState(pathname);
  const [nextPage, setNextPage] = useState(pathname);
  const prevLocationRef = useRef(pathname);

  useEffect(() => {
    const prev = prevLocationRef.current;
    let direction = 'right';
    // Vertical transitions for project detail
    if (isProjectDetail(pathname) && !isProjectDetail(prev)) {
      direction = 'up'; // Detail slides in from bottom
    } else if (!isProjectDetail(pathname) && isProjectDetail(prev)) {
      direction = 'down'; // Detail slides out to bottom
    } else {
      // Horizontal for all other transitions
      const currentIndex = routeOrder.indexOf(pathname);
      const prevIndex = routeOrder.indexOf(prev);
      if (currentIndex > prevIndex) {
        direction = 'right';
      } else if (currentIndex < prevIndex) {
        direction = 'left';
      }
    }
    setSlideDirection(direction);
    setIsTransitioning(true);
    setNextPage(pathname);
    const timer = setTimeout(() => {
      setIsTransitioning(false);
      setCurrentPage(pathname);
      prevLocationRef.current = pathname;
    }, 600);
    return () => clearTimeout(timer);
  }, [pathname]);

  const renderPage = (pagePath) => {
    const normalized = pagePath.replace(/\/$/, '');
    if (isProjectDetail(normalized)) {
      const id = normalized.split('/').pop();
      return <ProjectDetail id={id} />;
    }
    switch (normalized) {
      case '':
      case '/':
        return <Home />;
      case '/projects':
        return <Projects />;
      case '/resume':
        return <Resume />;
      default:
        return <Home />;
    }
  };

  // Determine the opposite direction for slide out
  let slideOutDirection = slideDirection;
  if (slideDirection === 'left') slideOutDirection = 'Right';
  if (slideDirection === 'right') slideOutDirection = 'Left';
  if (slideDirection === 'up') slideOutDirection = 'Up';
  if (slideDirection === 'down') slideOutDirection = 'Down';

  return (
    <div className={styles.slideContainer}>
      {/* Current page sliding out */}
      {isTransitioning && (
        <div
          className={`${styles.slidePage} ${styles.slideOut} ${styles[`slideOut${slideOutDirection.charAt(0).toUpperCase() + slideOutDirection.slice(1)}`]}`}
        >
          {renderPage(currentPage)}
        </div>
      )}
      {/* New page sliding in */}
      <div
        className={`${styles.slidePage} ${styles.slideIn} ${styles[`slideIn${slideDirection.charAt(0).toUpperCase() + slideDirection.slice(1)}`]}`}
      >
        {renderPage(nextPage)}
      </div>
    </div>
  );
};

function App() {
  return (
    <div className={styles.appBg}>
      {/* Liquid Chrome Background */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
      }}>
        <Waves
          lineColor="#234086"
          backgroundColor="#000"
          waveSpeedX={0.01}
          waveSpeedY={0.005}
          waveAmpX={18}
          waveAmpY={8}
          friction={0.92}
          tension={0.008}
          maxCursorMove={60}
          xGap={8}
          yGap={24}
        />
      </div>
      {/* Main App Content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Router>
          <NavBar />
          <div style={{ minHeight: 'calc(100vh - 110px)' }}>
            <Routes>
              <Route path="/" element={<SlideTransitionWrapper />} />
              <Route path="/projects" element={<SlideTransitionWrapper />} />
              <Route path="/projects/:id" element={<SlideTransitionWrapper />} />
              <Route path="/resume" element={<SlideTransitionWrapper />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </Router>
      </div>
    </div>
  );
}

// Wrapper to get location and pass pathname to DirectionalSlideTransition
function SlideTransitionWrapper() {
  const location = useLocation();
  return <DirectionalSlideTransition pathname={location.pathname} />;
}

export default App;
