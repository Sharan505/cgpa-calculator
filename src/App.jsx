import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home.jsx';
import SemOne from './components/SemOne.jsx';
import SemTwo from './components/SemTwo.jsx';
import SemThree from './components/SemThree.jsx';
import SemFour from './components/SemFour.jsx';
import SemFive from './components/SemFive.jsx';
import ParticlesComponent from './components/ParticlesComponent.jsx';

function App() {
  return (
    <>
      <ParticlesComponent id="particlesBG"/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sem-one' element={<SemOne />} />
        <Route path='/sem-two' element={<SemTwo />} />
        <Route path='/sem-three' element={<SemThree />} />
        <Route path='/sem-four' element={<SemFour />} />
        <Route path='/sem-five' element={<SemFive />} />
      </Routes>
    </>
  );
}

export default App;
