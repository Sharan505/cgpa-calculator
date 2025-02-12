import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SgpaContext } from '../SgpaContext';
import NavBarCse from "./NavBarCse.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import GradeSelector from "../GradeSelector.jsx";


function SemSevenCse() {
  const [sgpa, setSgpa] = useState(null); 
  const [cgpa, setCgpa] = useState(null);
  const { sgpaList, addSgpa } = useContext(SgpaContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);


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
    'ef': 3, 
    'cc': 3, 
    'dl': 3, 
    'st': 3,
    'e4': 3,
    'ccLab': 2,
    'p1': 2,
  };

  function handleCalculate() {
    const ef = document.getElementById('ef').value;
    const cc = document.getElementById('cc').value;
    const dl = document.getElementById('dl').value;
    const st = document.getElementById('st').value;
    const e4 = document.getElementById('e4').value;
    const ccLab = document.getElementById('ccLab').value;
    const p1 = document.getElementById('p1').value;

    const grades = {
        'ef': ef, 
        'cc': cc, 
        'dl': dl, 
        'st': st,
        'e4': e4,
        'ccLab': ccLab,
        'p1': p1,
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
    navigate("/cse-sem-eight");
  }
  const prevSemPage = () => {
    navigate("/cse-sem-six");
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
      <NavBarCse/>
      <p className="text-center display-6 mt-4">SGPA Calculator (Semester 7)</p>
      <p className="text-center">
        <strong>NOTE:</strong> Enter the Grade <strong>(in capital letters)</strong> correctly to the corresponding subject!
      </p>
      <div className="wrapper container">
        <div className="row">
          <div className="col-md-3 col-sm-1"></div>
          <div className="col-md-6 col-sm-10">
            <GradeSelector id="ef" label="Engineering Economics and Financial Accounting (60 HS 002)" />
            <GradeSelector id="cc" label="Cloud Computing (60 CS 701)" />
            <GradeSelector id="dl" label="Deep Learning (60 CS 702)" />
            <GradeSelector id="st" label="Software Testing (60 CS 703)" />
            <GradeSelector id="e4" label="Elective – IV" />
            <GradeSelector id="ccLab" label="Cloud Computing Laboratory (60 CS 7P1)" />
            <GradeSelector id="p1" label="Project Work Phase-I (60 CS 7P2)" />
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
        <div className="d-flex gap-5 mb-4">
          <button onClick={prevSemPage} className="btn btn-outline-primary mt-3 d-flex align-items-center"><ion-icon name="arrow-back-outline"></ion-icon></button>
          <button onClick={handleCalculate} className="btn btn-outline-primary mt-3">
            Calculate SGPA
          </button>
          <button onClick={nextSemPage} className="btn btn-outline-primary mt-3 d-flex align-items-center"><ion-icon name="arrow-forward-outline"></ion-icon></button>
        </div>
        {cgpa === null ? (
          // Show the "Calculate CGPA" button when CGPA is not yet calculated
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
          // Once calculated, display CGPA
          <div className="text-center mt-3">
            <h5>Your CGPA is: {cgpa}</h5>
          </div>
        )}
      </div>
    </section>
  );
}

export default SemSevenCse;
