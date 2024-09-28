import React, { useState } from "react";

function SemSeven() {
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
      const calculatedCgpa = (totalPoints / totalCredits).toFixed(2);
      setCgpa(calculatedCgpa);
    } else {
      setCgpa("Invalid input. Please enter valid grades."); // Handle case with no valid grades
    }
  }

  return (
    <section>
      <nav className="text-center text-white bg-ksr py-3">
        <h2>K.S.Rangasamy College of Technology</h2>
        <h4>Department of Information Technology</h4>
      </nav>
      <p className="text-center display-6 mt-4">CGPA Calculator (Semester 7)</p>
      <p className="text-center">
        <strong>NOTE:</strong> Enter the Grade <strong>(in capital letters)</strong> correctly to the corresponding subject!
      </p>
      <div className="wrapper container">
        <div className="row">
          <div className="col-md-3 col-sm-1"></div>
          <div className="col-md-6 col-sm-10">
            <div className="row mt-4 me-2">
              <label htmlFor="mc" className="col-6">Mobile Communication</label>
              <input type="text" id="mc" className="col-6 rounded border border-dark" />                            
            </div>
            <div className="row mt-4 me-2">
              <label htmlFor="cns" className="col-6">Cryptography and Network Security</label>
              <input type="text" id="cns" className="col-6 rounded border border-dark" />
            </div>
            <div className="row mt-4 me-2">
              <label htmlFor="cc" className="col-6">Cloud Computing</label>
              <input type="text" id="cc" className="col-6 rounded border border-dark" />
            </div>
            <div className="row mt-4 me-2">
              <label htmlFor="cg" className="col-6">Computer Graphics and Virtual Reality</label>
              <input type="text" id="cg" className="col-6 rounded border border-dark" />
            </div>
            <div className="row mt-4 me-2">
              <label htmlFor="st" className="col-6">Software Testing</label>
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
              <label htmlFor="ccLab" className="col-6">Cloud Computing Laboratory </label>
              <input type="text" id="ccLab" className="col-6 rounded border border-dark" />
            </div>
            <div className="row mt-4 me-2">
              <label htmlFor="pLab" className="col-6">Project Work Phase – I</label>
              <input type="text" id="pLab" className="col-6 rounded border border-dark" />
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

export default SemSeven;
