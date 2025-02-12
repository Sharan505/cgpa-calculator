import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SgpaContext } from '../SgpaContext';
import NavBarIt from "./NavBarIt.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import GradeSelector from "../GradeSelector.jsx";

function SemOne() {
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
    'pe': 2, 
    'mc': 4, 
    'bee': 3, 
    'pct': 3,
    'py': 4,
    'phyLab': 2,
    'pyLab': 2,
  };

  function handleCalculate() {
    const pe = document.getElementById('pe').value;
    const mc = document.getElementById('mc').value;
    const bee = document.getElementById('bee').value;
    const pct = document.getElementById('pct').value;
    const py = document.getElementById('py').value;
    const phyLab = document.getElementById('phyLab').value;
    const pyLab = document.getElementById('pyLab').value;

    const grades = {
      'pe': pe,
      'mc': mc,
      'bee': bee,
      'pct': pct,
      'py': py,
      'phyLab': phyLab,
      'pyLab': pyLab,
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
    navigate("/it-sem-three");
  }
  const prevSemPage = () => {
    navigate("/it-sem-one");
  }

  // Lazy loading effect when Calculate CGPA is clicked
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
      <p className="text-center display-6 mt-4">SGPA Calculator (Semester 2)</p>
      <p className="text-center">
        <strong>NOTE:</strong> Enter the Grade <strong>(in capital letters)</strong> correctly to the corresponding subject!
        <br />In case of arrears, Enter <strong>'U'</strong>
      </p>
        <div className="wrapper container">
        <div className="row">
          <div className="col-md-3 col-sm-1"></div>
          <div className="col-md-6 col-sm-10">
            {/* Reusing GradeSelector for each subject */}
            <GradeSelector id="pe" label="Professional English II (60 EN 002)" />
            <GradeSelector id="mc" label="Integrals, Partial Differential Equations And Laplace Transform (60 MA 003)" />
            <GradeSelector id="bee" label="Basic Electrical and Electronics Engineering (60 EE 001)" />
            <GradeSelector id="pct" label="Physics for Computer Technology (60 PH 004)" />
            <GradeSelector id="py" label="Python Programming (60 IT 001)" />
            <GradeSelector id="phyLab" label="Engineering Physics and Chemistry Laboratory (60 CP 0P2)" />
            <GradeSelector id="pyLab" label="Python Programming Laboratory (60 IT 0P1)" />
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

export default SemOne;
