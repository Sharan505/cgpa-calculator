import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React, { useState } from 'react';
import { Link } from "react-router-dom";

function InitialPage() {
    const [selectedOption, setSelectedOption] = useState("Select a Department");

    const handleSelect = (e) => {
        setSelectedOption(e.target.textContent);
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <nav className="text-center py-3 bg-ksr text-white">
                <h2>K.S.Rangasamy College of Technology</h2>
            </nav>
            <div className="flex-fill text-center">
                <p className="display-6 mt-3">Choose your Department :</p>
                <div className="dropdown">
                    <button
                        className="btn btn-outline-primary dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton"
                        data-bs-toggle="dropdown"
                        aria-expanded="false">
                        {selectedOption}
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <li><Link className="dropdown-item" to="/it-dept">IT</Link></li>
                        <li><Link className="dropdown-item" to="/mech-dept">MECH</Link></li>
                        <li><a className="dropdown-item" href="#">EEE</a></li>
                        <li><a className="dropdown-item" href="#">ECE</a></li>
                        <li><Link className="dropdown-item" to="/cse-dept">CSE</Link></li>
                        <li><a className="dropdown-item" href="#">MCT</a></li>
                        <li><a className="dropdown-item" href="#">CIVIL</a></li>
                        <li><a className="dropdown-item" href="#">TXT</a></li>
                        <li><a className="dropdown-item" href="#">BT</a></li>
                        <li><a className="dropdown-item" href="#">FT</a></li>
                    </ul>
                </div>
            </div>
            <footer className="row mb-4">
                <p className="text-end pe-5 col-6 mb-0" id="sign">Developed by Sharan M <br />IT 3rd year</p>
                <div className="col-6 d-flex justify-content-start gap-4 icons">
                    <a id="linkedin" href="https://www.linkedin.com/in/sharan-m-18274932b/overlay/about-this-profile/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3BwLKD%2F7MJTgKqcPbfqmoKag%3D%3D" target="_blank" rel="noopener noreferrer">
                        <ion-icon name="logo-linkedin"></ion-icon>
                    </a>
                    <a id="whatsapp" href="https://wa.me/917540008788" target="_blank" rel="noopener noreferrer">
                        <ion-icon name="logo-whatsapp"></ion-icon>
                    </a>
                    <a id="github" href="https://github.com/Sharan505" target="_blank" rel="noopener noreferrer">
                        <ion-icon name="logo-github"></ion-icon>
                    </a>
                    <a id="mail" href="mailto:sharan27505@gmail.com" target="_blank" rel="noopener noreferrer">
                        <ion-icon name="mail-outline"></ion-icon>
                    </a>
                </div>
            </footer>
        </div>
    );
}

export default InitialPage;
