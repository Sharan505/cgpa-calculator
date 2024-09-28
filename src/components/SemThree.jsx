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
    'msnm': 4, 
    'ds': 3, 
    'jp': 3, 
    'dlm': 3,
    'se': 3,
    'dsLab': 2,
    'jpLab': 2,
  };

  function handleCalculate() {
    const msnm = document.getElementById('msnm').value;
    const ds = document.getElementById('ds').value;
    const jp = document.getElementById('jp').value;
    const dlm = document.getElementById('dlm').value;
    const se = document.getElementById('se').value;
    const dsLab = document.getElementById('dsLab').value;
    const jpLab = document.getElementById('jpLab').value;

    const grades = {
      'msnm': msnm,
      'ds': ds,
      'jp': jp,
      'dlm': dlm,
      'se': se,
      'dsLab': dsLab,
      'jpLab': jpLab,
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
      <nav className="text-center text-white py-3 bg-ksr">
        <h2>K.S.Rangasamy College of Technology</h2>
        <h4>Department of Information Technology</h4>
      </nav>
      <p className="text-center display-6 mt-4">CGPA Calculator (Semester 3)</p>
      <p className="text-center">
        <strong>NOTE:</strong> Enter the Grade <strong>(in capital letters)</strong> correctly to the corresponding subject!
        <br />In case of arrears, Enter <strong>'U'</strong>
      </p>
      <div className="wrapper container">
        <div className="row">
          <div className="col-md-3 col-sm-1"></div>
          <div className="col-md-6 col-sm-10">
            <div className="row mt-4 me-2">
              <label htmlFor="msnm" className="col-6">Mathematical Statistics and Numerical Methods</label>
              <input type="text" id="msnm" className="col-6 rounded border border-dark" />                            
            </div>
            <div className="row mt-4 me-2">
              <label htmlFor="ds" className="col-6">Data Structures</label>
              <input type="text" id="ds" className="col-6 rounded border border-dark" />
            </div>
            <div className="row mt-4 me-2">
              <label htmlFor="jp" className="col-6">Java Programming</label>
              <input type="text" id="jp" className="col-6 rounded border border-dark" />
            </div>
            <div className="row mt-4 me-2">
              <label htmlFor="dlm" className="col-6">Digital Logic and Microprocessor</label>
              <input type="text" id="dlm" className="col-6 rounded border border-dark" />
            </div>
            <div className="row mt-4 me-2">
              <label htmlFor="se" className="col-6">Software Engineering</label>
              <input type="text" id="se" className="col-6 rounded border border-dark" />
            </div>
            <div className="row mt-4 me-2">
              <label htmlFor="dsLab" className="col-6">Data Structures Laboratory</label>
              <input type="text" id="dsLab" className="col-6 rounded border border-dark" />
            </div>
            <div className="row mt-4 me-2">
              <label htmlFor="jpLab" className="col-6">Java Programming Laboratory</label>
              <input type="text" id="jpLab" className="col-6 rounded border border-dark" />
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
