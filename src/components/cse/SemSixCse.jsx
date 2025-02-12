import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SgpaContext } from '../SgpaContext';
import NavBarCse from "./NavBarCse.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import GradeSelector from "../GradeSelector.jsx";


function SemSixCse() {
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
    'cns': 3, 
    'cd': 4, 
    'ds': 3, 
    'e2': 3,
    'e3': 3,
    'oe': 3,
    'cnsLab': 2,
    'dsLab': 2,
  };

  function handleCalculate() {
    const cns = document.getElementById('cns').value;
    const cd = document.getElementById('cd').value;
    const ds = document.getElementById('ds').value;
    const e2 = document.getElementById('e2').value;
    const e3 = document.getElementById('e3').value;
    const oe = document.getElementById('oe').value;
    const cnsLab = document.getElementById('cnsLab').value;
    const dsLab = document.getElementById('dsLab').value;

    const grades = {
        'cns': cns, 
        'cd': cd, 
        'ds': ds, 
        'e2': e2,
        'e3': e3,
        'oe': oe,
        'cnsLab': cnsLab,
        'dsLab': dsLab,
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
    navigate("/cse-sem-seven");
  }
  const prevSemPage = () => {
    navigate("/cse-sem-five");
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
      <p className="text-center display-6 mt-4">SGPA Calculator (Semester 6)</p>
      <p className="text-center">
        <strong>NOTE:</strong> Enter the Grade <strong>(in capital letters)</strong> correctly to the corresponding subject!
      </p>
      <div className="wrapper container">
        <div className="row">
          <div className="col-md-3 col-sm-1"></div>
          <div className="col-md-6 col-sm-10">
            <GradeSelector id="cns" label="Cryptography and Network Security (60 CS 601)" />
            <GradeSelector id="cd" label="Principles of Compiler Design (60 CS 602)" />
            <GradeSelector id="ds" label="Data Science (60 CS 603)" />
            <GradeSelector id="e2" label="Elective – II" />
            <GradeSelector id="e3" label="Elective – III" />
            <GradeSelector id="oe" label="Open Elective – II" />
            <GradeSelector id="cnsLab" label="Cryptography and Network Security Laboratory (60 CS 6P1)" />
            <GradeSelector id="dsLab" label="Data Science Laboratory (60 CS 6P2)" />
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

export default SemSixCse;
