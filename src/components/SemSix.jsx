import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SgpaContext } from './SgpaContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


function SemSix() {
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
    navigate("/sem-seven");
  }
  const prevSemPage = () => {
    navigate("/sem-five");
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
      <p className="text-center display-6 mt-4">SGPA Calculator (Semester 6)</p>
      <p className="text-center">
        <strong>NOTE:</strong> Enter the Grade <strong>(in capital letters)</strong> correctly to the corresponding subject!
      </p>
      <div className="wrapper container">
        <div className="row">
          <div className="col-md-3 col-sm-1"></div>
          <div className="col-md-6 col-sm-10">
            <div className="row mt-4 me-2">
              <label htmlFor="eefa" className="col-6">Engineering Economics and Financial Accounting (60 HS 002)</label>
              <input type="text" id="eefa" className="col-6 rounded border border-dark" />                            
            </div>
            <div className="row mt-4 me-2">
              <label htmlFor="dm" className="col-6">Data Mining and Analytics (60 IT 601)</label>
              <input type="text" id="dm" className="col-6 rounded border border-dark" />
            </div>
            <div className="row mt-4 me-2">
              <label htmlFor="fd" className="col-6">Full Stack Development (60 IT 602)</label>
              <input type="text" id="fd" className="col-6 rounded border border-dark" />
            </div>
            <div className="row mt-4 me-2">
              <label htmlFor="ml" className="col-6">Machine Learning (60 IT 603)</label>
              <input type="text" id="ml" className="col-6 rounded border border-dark" />
            </div>
            <div className="row mt-4 me-2">
              <label htmlFor="e1" className="col-6">Elective – II</label>
              <input type="text" id="e1" className="col-6 rounded border border-dark" />
            </div>
            <div className="row mt-4 me-2">
              <label htmlFor="oe" className="col-6">Open Elective – III</label>
              <input type="text" id="oe" className="col-6 rounded border border-dark" />
            </div>
            <div className="row mt-4 me-2">
              <label htmlFor="dmLab" className="col-6">Data Mining and Analytics Laboratory (60 IT 6P1)</label>
              <input type="text" id="dmLab" className="col-6 rounded border border-dark" />
            </div>
            <div className="row mt-4 me-2">
              <label htmlFor="fdLab" className="col-6">Full Stack Development Laboratory (60 IT 6P2 )</label>
              <input type="text" id="fdLab" className="col-6 rounded border border-dark" />
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

export default SemSix;
