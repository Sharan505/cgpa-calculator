import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SgpaContext } from './SgpaContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


function SemEight() {
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
    'e': 3,
    'p': 8,
  };

  function handleCalculate() {
    const e = document.getElementById('e').value;
    const p = document.getElementById('p').value;

    const grades = {
      'e': e,
      'p': p,
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

  const prevSemPage = () => {
    navigate("/sem-seven");
  }


  useEffect(() => {
    const popoverTrigger = document.querySelector('[data-bs-toggle="popover"]');
    if (popoverTrigger) {
      new window.bootstrap.Popover(popoverTrigger);
    }
  }, [cgpa]);


  return (
    <section>
      <nav className="text-center text-white bg-ksr py-3">
        <h2>K.S.Rangasamy College of Technology</h2>
        <h4>Department of Information Technology</h4>
      </nav>
      <p className="text-center display-6 mt-4">SGPA Calculator (Semester 8)</p>
      <p className="text-center">
        <strong>NOTE:</strong> Enter the Grade <strong>(in capital letters)</strong> correctly to the corresponding subject!
      </p>
      <div className="wrapper container">
        <div className="row">
          <div className="col-md-3 col-sm-1"></div>
          <div className="col-md-6 col-sm-10">
            <div className="row mt-4 me-2">
              <label htmlFor="e" className="col-6">Elective - V</label>
              <input type="text" id="e" className="col-6 rounded border border-dark" />                            
            </div>
            <div className="row mt-4 me-2">
              <label htmlFor="p" className="col-6">Project Work Phase - II (60 IT 8P1)</label>
              <input type="text" id="p" className="col-6 rounded border border-dark" />
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
        <div className="d-flex gap-5 mb-4">
          <button onClick={prevSemPage} className="btn btn-outline-primary mt-3 d-flex align-items-center"><ion-icon name="arrow-back-outline"></ion-icon></button>
          <button onClick={handleCalculate} className="btn btn-outline-primary mt-3">
            Calculate SGPA
          </button>
          <button className="btn btn-outline-secondary mt-3 d-flex align-items-center disabled"><ion-icon name="arrow-forward-outline"></ion-icon></button>
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

export default SemEight;
