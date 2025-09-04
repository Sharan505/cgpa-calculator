import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SgpaContext } from '../SgpaContext';
import NavBarIt from "./NavBarIt.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import GradeSelector from "../GradeSelector.jsx";


function SemSix() {
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
    'eefa': 3,
    'dm': 3, 
    'fd': 3, 
    'ml': 4,
    'e1': 3,
    'oe': 3,
    'dmLab': 2,
    'fdLab': 2,
  };

  function handleCalculate() {
    const eefa = document.getElementById('eefa').value;
    const dm = document.getElementById('dm').value;
    const fd = document.getElementById('fd').value;
    const ml = document.getElementById('ml').value;
    const e1 = document.getElementById('e1').value;
    const oe = document.getElementById('oe').value;
    const dmLab = document.getElementById('dmLab').value;
    const fdLab = document.getElementById('fdLab').value;

    const grades = {
      'eefa': eefa,
      'dm': dm,
      'fd': fd,
      'ml': ml,
      'e1': e1,
      'oe': oe,
      'dmLab': dmLab,
      'fdLab': fdLab,
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
    navigate("/it-sem-seven");
  }
  const prevSemPage = () => {
    navigate("/it-sem-five");
  }

  function handleCgpaCalculation() {
    setIsLoading(true);  // Start loading state
    setTimeout(() => {
      calculateCgpa();
      setIsLoading(false);  // Stop loading after 1.5 seconds
    }, 800);  // Adjust the delay time as needed
  }

  return (
    <section>
      <NavBarIt/>
      <p className="text-center display-6 mt-4">SGPA Calculator (Semester 6)</p>
      <p className="text-center">
        <strong>NOTE:</strong> Enter the Grade <strong>(in capital letters)</strong> correctly to the corresponding subject!
      </p>
      <div className="wrapper container">
        <div className="row">
          <div className="col-md-3 col-sm-1"></div>
          <div className="col-md-6 col-sm-10">
            <GradeSelector id="eefa" label="Engineering Economics and Financial Accounting (60 HS 002)" />
            <GradeSelector id="dm" label="Data Mining and Analytics (60 IT 601)" />
            <GradeSelector id="fd" label="Full Stack Development (60 IT 602)" />
            <GradeSelector id="ml" label="Machine Learning (60 IT 603)" />
            <GradeSelector id="e1" label="Elective – II" />
            <GradeSelector id="oe" label="Open Elective – III" />
            <GradeSelector id="dmLab" label="Data Mining and Analytics Laboratory (60 IT 6P1)" />
            <GradeSelector id="fdLab" label="Full Stack Development Laboratory (60 IT 6P2)" />
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

export default SemSix;
