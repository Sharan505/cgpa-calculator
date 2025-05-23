import './App.css';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import ParticlesComponent from './components/ParticlesComponent.jsx';
import { SgpaProvider } from './components/SgpaContext.jsx';

import InitialPage from './components/InitialPage.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// IT
import HomeIt from './components/itt/HomeIt.jsx';
import SemOne from './components/itt/SemOne.jsx';
import SemTwo from './components/itt/SemTwo.jsx';
import SemThree from './components/itt/SemThree.jsx';
import SemFour from './components/itt/SemFour.jsx';
import SemFive from './components/itt/SemFive.jsx';
import SemSix from './components/itt/SemSix.jsx';
import SemSeven from './components/itt/SemSeven.jsx';
import SemEight from './components/itt/SemEight.jsx';

// CSE
import HomeCse from './components/cse/HomeCse.jsx';
import SemOneCse from './components/cse/SemOneCse.jsx';
import SemTwoCse from './components/cse/SemTwoCse.jsx';
import SemThreeCse from './components/cse/SemThreeCse.jsx';
import SemFourCse from './components/cse/SemFourCse.jsx';
import SemFiveCse from './components/cse/SemFiveCse.jsx';
import SemSixCse from './components/cse/SemSixCse.jsx';
import SemSevenCse from './components/cse/SemSevenCse.jsx';
import SemEightCse from './components/cse/SemEightCse.jsx';

function App() {
  const location = useLocation(); // Use location for route-specific animations

  return (
    <SgpaProvider>
      <ParticlesComponent id="particlesBG" />
      <AnimatePresence>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Navigate to="/it-dept" />} />
          
          <Route
            path="/initial"
            element={
              <PageWrapper>
                <InitialPage />
              </PageWrapper>
            }
          />
          <Route
            path="/it-dept"
            element={
              <PageWrapper>
                <HomeIt />
              </PageWrapper>
            }
          />
          <Route
            path="/it-sem-one"
            element={
              <PageWrapper>
                <SemOne />
              </PageWrapper>
            }
          />
          <Route
            path="/it-sem-two"
            element={
              <PageWrapper>
                <SemTwo />
              </PageWrapper>
            }
          />
          <Route
            path="/it-sem-three"
            element={
              <PageWrapper>
                <SemThree />
              </PageWrapper>
            }
          />
          <Route
            path="/it-sem-four"
            element={
              <PageWrapper>
                <SemFour />
              </PageWrapper>
            }
          />
          <Route
            path="/it-sem-five"
            element={
              <PageWrapper>
                <SemFive />
              </PageWrapper>
            }
          />
          <Route
            path="/it-sem-six"
            element={
              <PageWrapper>
                <SemSix />
              </PageWrapper>
            }
          />
          <Route
            path="/it-sem-seven"
            element={
              <PageWrapper>
                <SemSeven />
              </PageWrapper>
            }
          />
          <Route
            path="/it-sem-eight"
            element={
              <PageWrapper>
                <SemEight />
              </PageWrapper>
            }
          />

          <Route
            path="/cse-dept"
            element={
              <PageWrapper>
                <HomeCse />
              </PageWrapper>
            }
          />
          <Route
            path="/cse-sem-one"
            element={
              <PageWrapper>
                <SemOneCse />
              </PageWrapper>
            }
          />
          <Route
            path="/cse-sem-two"
            element={
              <PageWrapper>
                <SemTwoCse />
              </PageWrapper>
            }
          />
          <Route
            path="/cse-sem-three"
            element={
              <PageWrapper>
                <SemThreeCse />
              </PageWrapper>
            }
          />
          <Route
            path="/cse-sem-four"
            element={
              <PageWrapper>
                <SemFourCse />
              </PageWrapper>
            }
          />
          <Route
            path="/cse-sem-five"
            element={
              <PageWrapper>
                <SemFiveCse />
              </PageWrapper>
            }
          />
          <Route
            path="/cse-sem-six"
            element={
              <PageWrapper>
                <SemSixCse />
              </PageWrapper>
            }
          />
          <Route
            path="/cse-sem-seven"
            element={
              <PageWrapper>
                <SemSevenCse />
              </PageWrapper>
            }
          />
          <Route
            path="/cse-sem-eight"
            element={
              <PageWrapper>
                <SemEightCse />
              </PageWrapper>
            }
          />
        </Routes>
      </AnimatePresence>
    </SgpaProvider>
  );
}

// PageWrapper component for animating the route transition
function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }} // Fixed this from 1 to 0 for the exit animation
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}

export default App;
