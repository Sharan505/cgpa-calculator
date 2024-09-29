import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SgpaContext } from './SgpaContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


function SemSeven() {
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
    navigate("/sem-eight");
  }
  const prevSemPage = () => {
    navigate("/sem-six");
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
      <p className="text-center display-6 mt-4">SGPA Calculator (Semester 7)</p>
      <p className="text-center">
        <strong>NOTE:</strong> Enter the Grade <strong>(in capital letters)</strong> correctly to the corresponding subject!
      </p>
      <div className="wrapper container">
        <div className="row">
          <div className="col-md-3 col-sm-1"></div>
          <div className="col-md-6 col-sm-10">
            <div className="row mt-4 me-2">
              <label htmlFor="mc" className="col-6">Mobile Communication <strong>(60 IT 701)</strong></label>
              <input type="text" id="mc" className="col-6 rounded border border-dark" />                            
            </div>
            <div className="row mt-4 me-2">
              <label htmlFor="cns" className="col-6">Cryptography and Network Security <strong>(60 IT 702)</strong></label>
              <input type="text" id="cns" className="col-6 rounded border border-dark" />
            </div>
            <div className="row mt-4 me-2">
              <label htmlFor="cc" className="col-6">Cloud Computing (60 IT 703)</label>
              <input type="text" id="cc" className="col-6 rounded border border-dark" />
            </div>
            <div className="row mt-4 me-2">
              <label htmlFor="cg" className="col-6">Computer Graphics and Virtual Reality <strong>(60 IT 704)</strong></label>
              <input type="text" id="cg" className="col-6 rounded border border-dark" />
            </div>
            <div className="row mt-4 me-2">
              <label htmlFor="st" className="col-6">Software Testing <strong>(60 IT 705)</strong></label>
              <input type="text" id="st" className="col-6 rounded border border-dark" />
            </div>
            <div className="row mt-4 me-2">
              <label htmlFor="e1" className="col-6">Elective – III</label>
              <input type="text" id="e1" className="col-6 rounded border border-dark" />
            </div>
            <div className="row mt-4 me-2">
              <label htmlFor="oe" className="col-6">Open Elective – IV</label>
              <input type="text" id="oe" className="col-6 rounded border border-dark" />
            </div>
            <div className="row mt-4 me-2">
              <label htmlFor="ccLab" className="col-6">Cloud Computing Laboratory <strong>(60 IT 7P1)</strong></label>
              <input type="text" id="ccLab" className="col-6 rounded border border-dark" />
            </div>
            <div className="row mt-4 me-2">
              <label htmlFor="pLab" className="col-6">Project Work Phase – I <strong>(60 IT 7P2)</strong></label>
              <input type="text" id="pLab" className="col-6 rounded border border-dark" />
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

export default SemSeven;
