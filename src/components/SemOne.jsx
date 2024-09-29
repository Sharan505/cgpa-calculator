import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SgpaContext } from './SgpaContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function SemOne() {
  const [sgpa, setSgpa] = useState(null); 
  const [cgpa, setCgpa] = useState(null);
  const { sgpaList, addSgpa } = useContext(SgpaContext);
  const navigate = useNavigate();

  const gr = {
    'O': 10,
    'A+': 9,
    'A': 8,
    'B+': 7,
    'B': 6,
    'C': 5,
    'U': 0,
  };

  const credits = {
    'pe': 2, 
    'mc': 4, 
    'ec': 3, 
    'eg': 4,
    'cp': 3,
    'freLab': 2,
    'cLab': 2,
  };

  function handleCalculate() {
    const pe = document.getElementById('pe').value;
    const mc = document.getElementById('mc').value;
    const ec = document.getElementById('ec').value;
    const eg = document.getElementById('eg').value;
    const cp = document.getElementById('cp').value;
    const freLab = document.getElementById('freLab').value;
    const cLab = document.getElementById('cLab').value;

    const grades = {
      'pe': pe,
      'mc': mc,
      'ec': ec,
      'eg': eg,
      'cp': cp,
      'freLab': freLab,
      'cLab': cLab,
    };

    let totalPoints = 0;
    let totalCredits = 0;

    for (let subject in grades) {
      const grade = grades[subject];
      const credit = credits[subject];

      if (gr[grade] !== undefined) { 
        totalPoints += gr[grade] * credit; 
        totalCredits += credit;
      }
    }

    if (totalCredits > 0) {
      const calculatedSgpa = (totalPoints / totalCredits).toFixed(2);
      setSgpa(calculatedSgpa);
      addSgpa(parseFloat(calculatedSgpa));
    } else {
      setSgpa("Invalid input. Please enter valid grades.");
    }
  }

  function calculateCgpa() {
    if (sgpaList.length === 0) {
      return "No SGPAs calculated yet.";
    }

    const totalSgpa = sgpaList.reduce((acc, curr) => acc + curr, 0);
    const cgpaValue = (totalSgpa / sgpaList.length).toFixed(2);
    
    setCgpa(cgpaValue); // Set the CGPA to display in the popover
    return cgpaValue;
  }

  const nextSemPage = () => {
    navigate("/sem-two");
  }

  useEffect(() => {
    const popoverTrigger = document.querySelector('[data-bs-toggle="popover"]');
    if (popoverTrigger) {
      new window.bootstrap.Popover(popoverTrigger); // Initialize popover
    }
  }, [cgpa]); // Reinitialize when CGPA changes

  return (
    <section>
      <nav className="text-center py-3 bg-ksr text-white">
        <h2>K.S.Rangasamy College of Technology</h2>
        <h4>Department of Information Technology</h4>
      </nav>
      <p className="text-center display-6 mt-4">SGPA Calculator (Semester 1)</p>
      <p className="text-center">
        <strong>NOTE:</strong> Enter the Grade <strong>(in capital letters)</strong> correctly to the corresponding subject!
        <br />In case of arrears, Enter <strong>'U'</strong>
      </p>
      <div className="wrapper container">
        <div className="row">
          <div className="col-md-3 col-sm-1"></div>
          <div className="col-md-6 col-sm-10">
            <div className="row mt-4 me-2">
              <label htmlFor="pe" className="col-6">Professional English I <strong>(60 EN 001)</strong></label>
              <input type="text" id="pe" className="col-6 rounded border border-dark" />                            
            </div>
            <div className="row mt-4 me-2">
              <label htmlFor="mc" className="col-6">Matrices and Calculus <br /> <strong> (60 MA 001)</strong></label>
              <input type="text" id="mc" className="col-6 rounded border border-dark" />
            </div>
            <div className="row mt-4 me-2">
              <label htmlFor="ec" className="col-6">Engineering Chemistry <br /> <strong> (60 CH 004)</strong></label>
              <input type="text" id="ec" className="col-6 rounded border border-dark" />
            </div>
            <div className="row mt-4 me-2">
              <label htmlFor="eg" className="col-6">Engineering Graphics <br /> <strong> (60 ME 002)</strong></label>
              <input type="text" id="eg" className="col-6 rounded border border-dark" />
            </div>
            <div className="row mt-4 me-2">
              <label htmlFor="cp" className="col-6">C Programming <br /> <strong> (60 CS 001)</strong></label>
              <input type="text" id="cp" className="col-6 rounded border border-dark" />
            </div>
            <div className="row mt-4 me-2">
              <label htmlFor="freLab" className="col-6">FRE Lab br <strong> (60 ME 0P1)</strong></label>
              <input type="text" id="freLab" className="col-6 rounded border border-dark" />
            </div>
            <div className="row mt-4 me-2">
              <label htmlFor="cLab" className="col-6">CP Lab <strong> (60 CS 0P1)</strong></label>
              <input type="text" id="cLab" className="col-6 rounded border border-dark" />
            </div>
          </div>
          <div className="col-md-3 col-sm-1"></div>
        </div>
      </div>
      <div className="d-flex justify-content-center flex-column align-items-center">
        {sgpa !== null && (
          <div className="text-center mt-3">
            <h5>Your SGPA is: {sgpa}</h5>
          </div>
        )}
        <div className="d-flex gap-5">
          <button className="btn btn-outline-secondary mt-3 d-flex align-items-center disabled"><ion-icon name="arrow-back-outline"></ion-icon></button>
          <button onClick={handleCalculate} className="btn btn-outline-primary mt-3">
            Calculate SGPA
          </button>
          <button onClick={nextSemPage} className="btn btn-outline-primary mt-3 d-flex align-items-center"><ion-icon name="arrow-forward-outline"></ion-icon></button>
        </div>
        <button 
          onClick={calculateCgpa} 
          className="btn btn-outline-primary mt-3 mb-4" 
          data-bs-toggle="popover" 
          data-bs-content={cgpa ? `CGPA: ${cgpa}` : "No SGPAs calculated yet."} 
          data-bs-placement="top"
        >
          Calculate CGPA upto this Semester
        </button>
      </div>
    </section>
  );
}

export default SemOne;
