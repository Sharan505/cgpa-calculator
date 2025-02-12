import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SgpaContext } from '../SgpaContext';
import NavBarIt from "./NavBarIt.jsx";
import GradeSelector from '../GradeSelector.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function SemOne() {
  const [sgpa, setSgpa] = useState(null); 
  const [cgpa, setCgpa] = useState(null);
  const { sgpaList, addSgpa } = useContext(SgpaContext);
  const [isLoading, setIsLoading] = useState(false);
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
    
    setCgpa(cgpaValue);
    return cgpaValue;
  }

  const nextSemPage = () => {
    navigate("/it-sem-two");
  }

  function handleCgpaCalculation() {
    setIsLoading(true);
    setTimeout(() => {
      calculateCgpa();
      setIsLoading(false);
    }, 800);
  }

  return (
    <section>
      <NavBarIt/>
      <p className="text-center display-6 mt-4">SGPA Calculator (Semester 1)</p>
      <p className="text-center">
        <strong>NOTE:</strong> Enter the Grade <strong>(in capital letters)</strong> correctly to the corresponding subject!
        <br />In case of arrears, Enter <strong>'U'</strong>
      </p>
      <div className="wrapper container">
        <div className="row">
          <div className="col-md-3 col-sm-1"></div>
          <div className="col-md-6 col-sm-10">
            <GradeSelector id="pe" label="Professional English I (60 EN 001)" />
            <GradeSelector id="mc" label="Matrices and Calculus (60 MA 001)" />
            <GradeSelector id="ec" label="Engineering Chemistry (60 CH 004)" />
            <GradeSelector id="eg" label="Engineering Graphics (60 ME 002)" />
            <GradeSelector id="cp" label="C Programming (60 CS 001)" />
            <GradeSelector id="freLab" label="FRE Lab (60 ME 0P1)" />
            <GradeSelector id="cLab" label="CP Lab (60 CS 0P1)" />
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
        {cgpa === null ? (
          <button onClick={handleCgpaCalculation} className="btn btn-outline-primary mt-3 mb-4">
            {isLoading ? (
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              "Calculate CGPA upto this Semester"
            )}
          </button>
        ) : (
          <div className="text-center mt-3">
            <h5>Your CGPA is: {cgpa}</h5>
          </div>
        )}
      </div>
    </section>
  );
}

export default SemOne;
