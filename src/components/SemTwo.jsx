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
      <p className="text-center display-6 mt-4">CGPA Calculator (Semester 2)</p>
      <p className="text-center">
        <strong>NOTE:</strong> Enter the Grade <strong>(in capital letters)</strong> correctly to the corresponding subject!
        <br />In case of arrears, Enter <strong>'U'</strong>
      </p>
      <div className="wrapper container">
        <div className="row">
          <div className="col-md-3 col-sm-1"></div>
          <div className="col-md-6 col-sm-10">
            <div className="row mt-4 me-2">
              <label htmlFor="pe" className="col-6">Professional English II</label>
              <input type="text" id="pe" className="col-6 rounded border border-dark" />                            
            </div>
            <div className="row mt-4 me-2">
              <label htmlFor="mc" className="col-6">Integrals, Partial Differential Equations And Laplace Transform </label>
              <input type="text" id="mc" className="col-6 rounded border border-dark" />
            </div>
            <div className="row mt-4 me-2">
              <label htmlFor="bee" className="col-6"> Basic Electrical and Electronics Engineering</label>
              <input type="text" id="bee" className="col-6 rounded border border-dark" />
            </div>
            <div className="row mt-4 me-2">
              <label htmlFor="pct" className="col-6">Physics for Computer Technology</label>
              <input type="text" id="pct" className="col-6 rounded border border-dark" />
            </div>
            <div className="row mt-4 me-2">
              <label htmlFor="py" className="col-6">Python Programming</label>
              <input type="text" id="py" className="col-6 rounded border border-dark" />
            </div>
            <div className="row mt-4 me-2">
              <label htmlFor="phyLab" className="col-6">Engineering Physics and Chemistry Laboratory</label>
              <input type="text" id="phyLab" className="col-6 rounded border border-dark" />
            </div>
            <div className="row mt-4 me-2">
              <label htmlFor="pyLab" className="col-6">Python Programming Laboratory</label>
              <input type="text" id="pyLab" className="col-6 rounded border border-dark" />
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
