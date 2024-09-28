import { useState } from "react";

function SemFour() {
  const [cgpa, setCgpa] = useState(null); 
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
    'coa': 3, 
    'dbms': 3,
    'wt': 3,
    'oe': 3,
    'dbms-lab': 2,
  };

  function handleCalculate() {
    
    const dm = document.getElementById('dm').value;
    const daa = document.getElementById('daa').value;
    const coa = document.getElementById('coa').value;
    const dbms = document.getElementById('dbms').value;
    const wt = document.getElementById('wt').value;
    const oe = document.getElementById('oe').value;
    const dbmsLab = document.getElementById('dbms-lab').value;

    
    const grades = {
      'dm': dm,
      'daa': daa,
      'coa': coa,
      'dbms': dbms,
      'wt': wt,
      'oe': oe,
      'dbms-lab': dbmsLab,
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
      const calculatedCgpa = (totalPoints / totalCredits).toFixed(2);
      setCgpa(calculatedCgpa);
    } else {
      setCgpa("Invalid input. Please enter valid grades."); // Handle case with no valid grades
    }
    console.log(cgpa);
  }

  return (
    <section>
      <nav className="text-center py-3 text-white bg-ksr">
        <h2>K.S.Rangasamy College of Technology</h2>
        <h4>Department of Information Technology</h4>
      </nav>
      <p className="text-center display-6 mt-4">CGPA Calculator (Semester 4)</p>
      <p className="text-center">
        <strong>NOTE:</strong> Enter the Grade <strong>(in capital letters)</strong> correctly to the corresponding subject!
        <br />In case of arrears, Enter <strong>'U'</strong>
      </p>
      <div className="wrapper container">
        <div className="row">
          <div className="col-md-3 col-sm-1"></div>
          <div className="col-md-6 col-sm-10">
            <div className="row mt-4 me-2">
              <label htmlFor="dm" className="col-6">Discrete Mathematics</label>
              <input type="text" id="dm" className="col-6 rounded border border-dark" />
            </div>
            <div className="row mt-4 me-2">
              <label htmlFor="daa" className="col-6">Design and Analysis of Algorithms</label>
              <input type="text" id="daa" className="col-6 rounded border border-dark" />
            </div>
            <div className="row mt-4 me-2">
              <label htmlFor="coa" className="col-6">Computer Organization and Architecture</label>
              <input type="text" id="coa" className="col-6 rounded border border-dark" />
            </div>
            <div className="row mt-4 me-2">
              <label htmlFor="dbms" className="col-6">Database Management Systems</label>
              <input type="text" id="dbms" className="col-6 rounded border border-dark" />
            </div>
            <div className="row mt-4 me-2">
              <label htmlFor="wt" className="col-6">Web Technology</label>
              <input type="text" id="wt" className="col-6 rounded border border-dark" />
            </div>
            <div className="row mt-4 me-2">
              <label htmlFor="oe" className="col-6">Open Elective – I</label>
              <input type="text" id="oe" className="col-6 rounded border border-dark" />
            </div>
            <div className="row mt-4 me-2">
              <label htmlFor="dbms-lab" className="col-6">Database Management Systems Laboratory</label>
              <input type="text" id="dbms-lab" className="col-6 rounded border border-dark" />
            </div>
          </div>
          <div className="col-md-3 col-sm-1"></div>
        </div>
      </div>
      <div className="d-flex justify-content-center flex-column align-items-center">
        {cgpa !== null && (
          <div className="text-center mt-3">
            <h5>Your CGPA is: {cgpa}</h5>
          </div>
        )}
        <p onClick={handleCalculate} className="btn btn-outline-primary mt-3">
          Calculate
        </p>
      </div>
    </section>
  );
}

export default SemFour;
