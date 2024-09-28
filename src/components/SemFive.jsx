import React, { useState } from "react";

function SemFive() {
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
    'os': 3, 
    'cn': 3, 
    'iot': 3, 
    'dt': 3,
    'e1': 3,
    'oe': 3,
    'strt': 2,
    'osLab': 2,
    'cnLab': 2,
  };

  function handleCalculate() {
    const os = document.getElementById('os').value;
    const cn = document.getElementById('cn').value;
    const iot = document.getElementById('iot').value;
    const dt = document.getElementById('dt').value;
    const e1 = document.getElementById('e1').value;
    const oe = document.getElementById('oe').value;
    const strt = document.getElementById('strt').value;
    const osLab = document.getElementById('osLab').value;
    const cnLab = document.getElementById('cnLab').value;

    const grades = {
      'os': os,
      'cn': cn,
      'iot': iot,
      'dt': dt,
      'e1': e1,
      'oe': oe,
      'strt': strt,
      'osLab': osLab,
      'cnLab': cnLab,
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
      <p className="text-center display-6 mt-4">CGPA Calculator (Semester 5)</p>
      <p className="text-center">
        <strong>NOTE:</strong> Enter the Grade <strong>(in capital letters)</strong> correctly to the corresponding subject!
      </p>
      <div className="wrapper container">
        <div className="row">
          <div className="col-md-3 col-sm-1"></div>
          <div className="col-md-6 col-sm-10">
            <div className="row mt-4 me-2">
              <label htmlFor="os" className="col-6">Operating Systems</label>
              <input type="text" id="os" className="col-6 rounded border border-dark" />                            
            </div>
            <div className="row mt-4 me-2">
              <label htmlFor="cn" className="col-6">Computer Networks</label>
              <input type="text" id="cn" className="col-6 rounded border border-dark" />
            </div>
            <div className="row mt-4 me-2">
              <label htmlFor="iot" className="col-6">Embedded Systems and IOT</label>
              <input type="text" id="iot" className="col-6 rounded border border-dark" />
            </div>
            <div className="row mt-4 me-2">
              <label htmlFor="dt" className="col-6">Design Thinking</label>
              <input type="text" id="dt" className="col-6 rounded border border-dark" />
            </div>
            <div className="row mt-4 me-2">
              <label htmlFor="e1" className="col-6">Elective – I</label>
              <input type="text" id="e1" className="col-6 rounded border border-dark" />
            </div>
            <div className="row mt-4 me-2">
              <label htmlFor="oe" className="col-6">Open Elective – II</label>
              <input type="text" id="oe" className="col-6 rounded border border-dark" />
            </div>
            <div className="row mt-4 me-2">
              <label htmlFor="strt" className="col-6">Start-ups and Entrepreneurship</label>
              <input type="text" id="strt" className="col-6 rounded border border-dark" />
            </div>
            <div className="row mt-4 me-2">
              <label htmlFor="osLab" className="col-6">OS Lab</label>
              <input type="text" id="osLab" className="col-6 rounded border border-dark" />
            </div>
            <div className="row mt-4 me-2">
              <label htmlFor="cnLab" className="col-6">CN Lab</label>
              <input type="text" id="cnLab" className="col-6 rounded border border-dark" />
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

export default SemFive;
