import { useState } from "react";

function SemOne() {
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
    'pe': 2, 
    'mc': 4, 
    'ec': 3, 
    'eg': 4,
    'cp': 3,
    'freLab': 2,
    'cLab': 2,
  };

  function handleCalculate() {
    const pe = document.getElementById('pe').value;
    const mc = document.getElementById('mc').value;
    const ec = document.getElementById('ec').value;
    const eg = document.getElementById('eg').value;
    const cp = document.getElementById('cp').value;
    const freLab = document.getElementById('freLab').value;
    const cLab = document.getElementById('cLab').value;

    const grades = {
      'pe': pe,
      'mc': mc,
      'ec': ec,
      'eg': eg,
      'cp': cp,
      'freLab': freLab,
      'cLab': cLab,
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
      setCgpa("Invalid input. Please enter valid grades.");
    }
  }

  return (
    <section>
      <nav className="text-center py-3 bg-ksr text-white">
        <h2>K.S.Rangasamy College of Technology</h2>
        <h4>Department of Information Technology</h4>
      </nav>
      <p className="text-center display-6 mt-4">CGPA Calculator (Semester 1)</p>
      <p className="text-center">
        <strong>NOTE:</strong> Enter the Grade <strong>(in capital letters)</strong> correctly to the corresponding subject!
        <br />In case of arrears, Enter <strong>'U'</strong>
      </p>
      <div className="wrapper container">
        <div className="row">
          <div className="col-md-3 col-sm-1"></div>
          <div className="col-md-6 col-sm-10">
            <div className="row mt-4 me-2">
              <label htmlFor="pe" className="col-6">Professional English I</label>
              <input type="text" id="pe" className="col-6 rounded border border-dark" />                            
            </div>
            <div className="row mt-4 me-2">
              <label htmlFor="mc" className="col-6">Matrices and Calculus</label>
              <input type="text" id="mc" className="col-6 rounded border border-dark" />
            </div>
            <div className="row mt-4 me-2">
              <label htmlFor="ec" className="col-6">Engineering Chemistry</label>
              <input type="text" id="ec" className="col-6 rounded border border-dark" />
            </div>
            <div className="row mt-4 me-2">
              <label htmlFor="eg" className="col-6">Engineering Graphics</label>
              <input type="text" id="eg" className="col-6 rounded border border-dark" />
            </div>
            <div className="row mt-4 me-2">
              <label htmlFor="cp" className="col-6">C Programming</label>
              <input type="text" id="cp" className="col-6 rounded border border-dark" />
            </div>
            <div className="row mt-4 me-2">
              <label htmlFor="freLab" className="col-6">FRE Lab</label>
              <input type="text" id="freLab" className="col-6 rounded border border-dark" />
            </div>
            <div className="row mt-4 me-2">
              <label htmlFor="cLab" className="col-6">CP Lab</label>
              <input type="text" id="cLab" className="col-6 rounded border border-dark" />
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

export default SemOne;
