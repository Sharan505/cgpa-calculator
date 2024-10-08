import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SgpaContext } from '../SgpaContext';
import NavBarIt from "./NavBarIt.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import GradeSelector from "../GradeSelector.jsx";


function SemSeven() {
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
    'mc': 3,
    'cns': 3, 
    'cc': 3, 
    'cg': 3,
    'st': 3,
    'e1': 3,
    'oe': 3,
    'ccLab': 2,
    'pLab': 2,
  };

  function handleCalculate() {
    const mc = document.getElementById('mc').value;
    const cns = document.getElementById('cns').value;
    const cc = document.getElementById('cc').value;
    const cg = document.getElementById('cg').value;
    const e1 = document.getElementById('e1').value;
    const oe = document.getElementById('oe').value;
    const ccLab = document.getElementById('ccLab').value;
    const pLab = document.getElementById('pLab').value;

    const grades = {
      'mc': mc,
      'cns': cns,
      'cc': cc,
      'cg': cg,
      'e1': e1,
      'oe': oe,
      'ccLab': ccLab,
      'pLab': ccLab,
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
    navigate("/it-sem-eight");
  }
  const prevSemPage = () => {
    navigate("/it-sem-six");
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
      <p className="text-center display-6 mt-4">SGPA Calculator (Semester 7)</p>
      <p className="text-center">
        <strong>NOTE:</strong> Enter the Grade <strong>(in capital letters)</strong> correctly to the corresponding subject!
      </p>
      <div className="wrapper container">
        <div className="row">
          <div className="col-md-3 col-sm-1"></div>
          <div className="col-md-6 col-sm-10">
            <GradeSelector id="mc" label="Mobile Communication (60 IT 701)" />
            <GradeSelector id="cns" label="Cryptography and Network Security (60 IT 702)" />
            <GradeSelector id="cc" label="Cloud Computing (60 IT 703)" />
            <GradeSelector id="cg" label="Computer Graphics and Virtual Reality (60 IT 704)" />
            <GradeSelector id="st" label="Software Testing (60 IT 705)" />
            <GradeSelector id="e3" label="Elective – III" />
            <GradeSelector id="oe" label="Open Elective – IV" />
            <GradeSelector id="ccLab" label="Cloud Computing Laboratory (60 IT 7P1)" />
            <GradeSelector id="pLab" label="Project Work Phase – I (60 IT 7P2)" />
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

export default SemSeven;
