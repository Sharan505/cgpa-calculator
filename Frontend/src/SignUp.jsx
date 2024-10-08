import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import signupImage from './assets/sign_in_img.jpg'; // Import your signup image

const SignUp = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    regNo: "",
    password: "",
  });

  const [modalMessage, setModalMessage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:3001/api/signup", data);
      setModalMessage("Signup successful");
      setModalVisible(true);
      setTimeout(() => {
        setModalVisible(false);
        navigate("/login"); // Redirect to sign-in after closing the popup
      }, 3000); // Auto-close modal after 3 seconds
    } catch (error) {
      console.error("Error signing up:", error);
      setModalMessage("Failed to sign up");
      setModalVisible(true);
    }
  };

  return (
    <>
      <section className="container d-flex justify-content-center align-items-center min-vh-100 py-0">
        <div className="row w-100 d-flex justify-content-center align-items-center">
          <div className="col-md-6 col-sm-12 mb-3 d-flex justify-content-center align-items-center">
            <img src={signupImage} alt="Sign Up illustration" className="img-fluid w-75" />
          </div>
          <div className="col-md-6 col-sm-12">
            <h1 className="text-center mb-4">Sign Up</h1>
            <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center w-100 px-4">
              <input
                type="text"
                placeholder="Full Name"
                name="name"
                value={data.name}
                onChange={handleChange}
                className="form-control mb-3"
              />
              <input
                type="number"
                placeholder="Register Number"
                name="regNo"
                value={data.regNo}
                onChange={handleChange}
                className="form-control mb-3"
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={data.password}
                onChange={handleChange}
                className="form-control mb-3"
              />
              <button type="submit" className="btn btn-outline-primary px-3 w-100">Sign Up</button>
              <p className="mt-3">
                Already have an account? <Link to="/login">Sign In</Link>
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Modal Component */}
      {modalVisible && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Message</h5>
                <button type="button" className="btn-close" onClick={() => setModalVisible(false)}></button>
              </div>
              <div className="modal-body">
                <p>{modalMessage}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={() => setModalVisible(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SignUp;
