import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import login from './assets/sign_in_img.jpg';

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
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
      const response = await axios.post("http://127.0.0.1:3001/api/signin", data);
      const { token, user } = response.data;

      // Save the token (in localStorage or state)
      localStorage.setItem("token", token);

      setModalMessage("Login successful!");
      setModalVisible(true);

      // Auto-close the modal and redirect after 3 seconds
      setTimeout(() => {
        setModalVisible(false);
        navigate("/initial"); // Redirect to dashboard after successful login
      }, 3000);
    } catch (error) {
      console.error("Error logging in:", error);
      setModalMessage("Failed to login");
      setModalVisible(true);
    }
  };

  return (
    <>
      <section className="container d-flex justify-content-center align-items-center min-vh-100 py-0">
        <div className="row w-100 d-flex justify-content-center align-items-center">
          <div className="col-md-6 col-sm-12 mb-3 d-flex justify-content-center align-items-center">
            <img src={login} alt="Login illustration" className="img-fluid w-75" />
          </div>
          <div className="col-md-6 col-sm-12">
            <h1 className="text-center mb-4">Login</h1>
            <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center w-100 px-4">
              <input
                type="number"
                name="regNo"
                placeholder="Register Number"
                value={data.regNo}
                onChange={handleChange}
                className="form-control mb-3"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={data.password}
                onChange={handleChange}
                className="form-control mb-3"
              />
              <button type="submit" className="btn btn-primary px-4 w-100">Login</button>
              <p className="signup mt-3">
                Don't have an account? <Link to="/signup">Sign up</Link>
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

export default Login;
