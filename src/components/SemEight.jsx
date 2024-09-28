import React, { useState } from "react";

function SemEight() {
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
      <p className="text-center display-6 mt-4">CGPA Calculator (Semester 8)</p>
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
              <label htmlFor="p" className="col-6">Project Work Phase - II</label>
              <input type="text" id="p" className="col-6 rounded border border-dark" />
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

export default SemEight;
