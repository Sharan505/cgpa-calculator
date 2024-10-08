import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SgpaContext } from '../SgpaContext';
import NavBarCse from "./NavBarCse.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import GradeSelector from "../GradeSelector.jsx";


function SemFiveCse() {
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
    'ai': 3, 
    'ca': 3, 
    'os': 3, 
    'at': 4,
    'dt': 3,
    'e1': 3,
    'oe': 3,
    'aiLab': 2,
    'osLab': 2,
  };

  function handleCalculate() {
    const ai = document.getElementById('ai').value;
    const ca = document.getElementById('ca').value;
    const os = document.getElementById('os').value;
    const at = document.getElementById('at').value;
    const dt = document.getElementById('dt').value;
    const e1 = document.getElementById('e1').value;
    const oe = document.getElementById('oe').value;
    const aiLab = document.getElementById('aiLab').value;
    const osLab = document.getElementById('osLab').value;

    const grades = {
        'ai': ai,
        'ca': ca,
        'os': os,
        'at': at,
        'dt': dt,
        'e1': e1,
        'oe': oe,
        'aiLab': aiLab,
        'osLab': osLab,
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
    navigate("/cse-sem-six");
  }
  const prevSemPage = () => {
    navigate("/cse-sem-four");
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
      <p className="text-center display-6 mt-4">SGPA Calculator (Semester 5)</p>
      <p className="text-center">
        <strong>NOTE:</strong> Enter the Grade <strong>(in capital letters)</strong> correctly to the corresponding subject!
      </p>
      <div className="wrapper container">
        <div className="row">
          <div className="col-md-3 col-sm-1"></div>
          <div className="col-md-6 col-sm-10">
            <GradeSelector id="ai" label="Artificial Intelligence (60 CS 501)" />
            <GradeSelector id="ca" label="Computer Architecture (60 CS 502)" />
            <GradeSelector id="os" label="Operating Systems (60 CS 503)" />
            <GradeSelector id="at" label="Formal Language and Automata Theory (60 CS 504)" />
            <GradeSelector id="dt" label="Design Thinking (60 IT 003)" />
            <GradeSelector id="e1" label="Elective – I" />
            <GradeSelector id="oe" label="Open Elective – II" />
            <GradeSelector id="aiLab" label="AI Lab (60 CS 5P1)" />
            <GradeSelector id="osLab" label="OS Lab (60 CS 5P2)" />
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

export default SemFiveCse;
