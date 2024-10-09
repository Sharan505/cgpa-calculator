import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SgpaContext } from '../SgpaContext.jsx';
import NavBarCse from "./NavBarCse.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import GradeSelector from "../GradeSelector.jsx";


function SemFourCse() {
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
    'dm': 4, 
    'daa': 3, 
    'wt': 3,
    'dbms': 3,
    'se': 3, 
    'oe': 3,
    'dbms-lab': 2,
    'wt-lab': 2,
  };

  function handleCalculate() {
    
    const dm = document.getElementById('dm').value;
    const daa = document.getElementById('daa').value;
    const wt = document.getElementById('wt').value;
    const dbms = document.getElementById('dbms').value;
    const coa = document.getElementById('se').value;
    const oe = document.getElementById('oe').value;
    const dbmsLab = document.getElementById('dbms-lab').value;
    const wtLab = document.getElementById('wt-lab').value;
    
    const grades = {
      'dm': dm,
      'daa': daa,
      'wt': wt,
      'dbms': dbms,
      'se': se,
      'oe': oe,
      'dbms-lab': dbmsLab,
      'wt-lab': wtLab,
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
    navigate("/cse-sem-five");
  }
  const prevSemPage = () => {
    navigate("/cse-sem-three");
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
      <p className="text-center display-6 mt-4">SGPA Calculator (Semester 4)</p>
      <p className="text-center">
        <strong>NOTE:</strong> Enter the Grade <strong>(in capital letters)</strong> correctly to the corresponding subject!
        <br />In case of arrears, Enter <strong>'U'</strong>
      </p>
      <div className="wrapper container">
        <div className="row">
          <div className="col-md-3 col-sm-1"></div>
          <div className="col-md-6 col-sm-10">
            <GradeSelector id="dm" label="Discrete Mathematics (60 MA 017)" />
            <GradeSelector id="daa" label="Design and Analysis of Algorithms (60 IT 002)" />
            <GradeSelector id="wt" label="Advanced Web Development (61 CS 401)" />
            <GradeSelector id="dbms" label="Database Management Systems (60 IT402)" />
            <GradeSelector id="se" label="Software Engineering (60 CS 403)" />
            <GradeSelector id="oe" label="Open Elective – I" />
            <GradeSelector id="dbms-lab" label="Database Management Systems Laboratory (60 IT4P1)" />
            <GradeSelector id="wt-lab" label="Advanced Web Development Laboratory (60 IT4P1)" />
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

export default SemFourCse;