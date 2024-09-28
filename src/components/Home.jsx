import { Link } from "react-router-dom";

function Home(){
    return(
        <section>
            <nav className="text-center mt-2 container">
                <h2>K.S.Rangasamy College of Technology</h2>
                <h4>Department of Information Technology</h4>
            </nav>
                <p className="mt-5 text-center" style={{fontSize:"30px"}}>Calculate your CGPA/SCGPA easily!</p>
                <div className="row">
                    <div className="col-md-3 col-sm-0"></div>
                    <div className="col-md-6 col-sm-12 d-flex justify-content-evenly">
                        <Link to="/sem-one" className="btn btn-outline-primary">1st Semester</Link>
                        <Link to="/sem-two" className="btn btn-outline-primary">2nd Semester</Link>
                        <Link to="/sem-three" className="btn btn-outline-primary">3rd Semester</Link>
                        <Link to="/sem-four" className="btn btn-outline-primary">4th Semester</Link>
                    </div>
                    <div className="col-md-3 col-sm-0"></div>
                </div>
                <div className="row mt-4">
                    <div className="col-md-3 col-sm-0"></div>
                    <div className="col-md-6 col-sm-12 d-flex justify-content-evenly">
                        <Link to="/sem-five" className="btn btn-outline-primary">5th Semester</Link>
                        <Link to="/sem-six" className="btn btn-outline-primary">6th Semester</Link>
                        <Link to="/sem-seven" className="btn btn-outline-primary">7th Semester</Link>
                        <Link to="/sem-eight" className="btn btn-outline-primary">8th Semester</Link>
                    </div>
                    <div className="col-md-3 col-sm-0"></div>
                </div>
        </section>
    )
}

export default Home;