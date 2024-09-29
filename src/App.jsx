import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Home from './components/Home.jsx';
import SemOne from './components/SemOne.jsx';
import SemTwo from './components/SemTwo.jsx';
import SemThree from './components/SemThree.jsx';
import SemFour from './components/SemFour.jsx';
import SemFive from './components/SemFive.jsx';
import SemSix from './components/SemSix.jsx';
import SemSeven from './components/SemSeven.jsx';
import SemEight from './components/SemEight.jsx';
import ParticlesComponent from './components/ParticlesComponent.jsx';
import { SgpaProvider } from './components/SgpaContext.jsx';

function App() {
  const location = useLocation();  // Use location for route-specific animations

  return (
    <SgpaProvider>
      <ParticlesComponent id="particlesBG" />
      <AnimatePresence>
        <Routes location={location} key={location.pathname}>
          <Route path='/' element={
              <PageWrapper>
                <Home />
              </PageWrapper>
            }/>
          <Route path='/sem-one' element={
              <PageWrapper>
                <SemOne />
              </PageWrapper>
            }/>
          <Route path='/sem-two' element={
              <PageWrapper>
                <SemTwo />
              </PageWrapper>
            }/>
          <Route path='/sem-three' element={
              <PageWrapper>
                <SemThree />
              </PageWrapper>
            }/>
          <Route path='/sem-four' element={
              <PageWrapper>
                <SemFour />
              </PageWrapper>
            }/>
          <Route path='/sem-five' element={
              <PageWrapper>
                <SemFive />
              </PageWrapper>
            }/>
          <Route path='/sem-six' element={
              <PageWrapper>
                <SemSix />
              </PageWrapper>
            }/>
          <Route path='/sem-seven' element={
              <PageWrapper>
                <SemSeven />
              </PageWrapper>
            }/>
          <Route path='/sem-eight' element={
              <PageWrapper>
                <SemEight />
              </PageWrapper>
            }/>
          
        </Routes>
      </AnimatePresence>
    </SgpaProvider>
  );
}

// PageWrapper component for animating the route transition
function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0}}
      animate={{ opacity: 1}}
      exit={{ opacity: 1}}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}

export default App;
