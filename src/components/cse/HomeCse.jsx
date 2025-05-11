import { Link } from "react-router-dom";
import NavBarCse from "./NavBarCse.jsx";

function HomeCse(){
    return(
        <section>
            <nav className="text-center py-3 bg-ksr text-white">
                <h2>K.S.Rangasamy College of Technology</h2>
                <h4>Department of Computer Science and Engineering</h4>
            </nav>
                <p className="mt-5 text-center" style={{fontSize:"30px"}}>Calculate your CGPA/SCGPA easily!</p>
                <div className="row">
                    <div className="col-md-3 col-sm-0"></div>
                    <div className="col-md-6 col-sm-12 d-flex justify-content-evenly">
                        <Link to="/cse-sem-one" className="btn btn-outline-primary">1st Semester</Link>
                        <Link to="/cse-sem-two" className="btn btn-outline-primary">2nd Semester</Link>
                        <Link to="/cse-sem-three" className="btn btn-outline-primary">3rd Semester</Link>
                        <Link to="/cse-sem-four" className="btn btn-outline-primary">4th Semester</Link>
                    </div>
                    <div className="col-md-3 col-sm-0"></div>
                </div>
                <div className="row mt-4">
                    <div className="col-md-3 col-sm-0"></div>
                    <div className="col-md-6 col-sm-12 d-flex justify-content-evenly">
                        <Link to="/cse-sem-five" className="btn btn-outline-primary">5th Semester</Link>
                        <Link to="/cse-sem-six" className="btn btn-outline-primary">6th Semester</Link>
                        <Link to="/cse-sem-seven" className="btn btn-outline-primary">7th Semester</Link>
                        <Link to="/cse-sem-eight" className="btn btn-outline-primary">8th Semester</Link>
                    </div>
                    <div className="col-md-3 col-sm-0"></div>
                </div><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                <hr className="mx-5 text-secondary"/><br />
                {/* <footer className="row">
                    <p className="text-end pe-5 col-6" id="sign">Developed by Sharan M <br />IT 3rd year</p>
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
                </footer> */}
        </section>
    )
}

export default HomeCse;