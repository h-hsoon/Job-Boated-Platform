import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Rejestier() {
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [aboutCompany, setAboutCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    addUser(companyName, email, password, aboutCompany, phone);
  };

  const addUser = (companyName, email, password, aboutCompany, phone) => {
    axios
      .post("http://localhost:8000/register/employer", {
        companyName,
        email,
        password,
        aboutCompany,
        phone,
      })
      .then(() => {
        setCompanyName("");
        setEmail("");
        setPassword("");
        setAboutCompany("");
        setPhone("");
        setError("");
        navigate("/login");
      })
      .catch((err) => {
        setError(err.response.data.error);
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-50 h-100 mt-3 mb-5 p-5 border border-primary border-5 rounded-2 d-flex flex-column"
    >
      {error && <p className="text-danger fw-bold fs-3">{error}</p>}
      <div className="mb-3">
        <label htmlFor="companyName" className="form-label">
          Company Name
        </label>
        <input
          type="text"
          className="form-control"
          id="companyName"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div id="emailHelp" className="form-text">
          We'll never share your email with anyone else.
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="exampleInputPassword1"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleFormControlTextarea1" className="form-label">
          About the Company
        </label>
        <textarea
          className="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
          value={aboutCompany}
          onChange={(e) => setAboutCompany(e.target.value)}
        ></textarea>
      </div>
      <div className="mb-3">
        <label htmlFor="phone" className="form-label">
          Phone Number
        </label>
        <input
          type="text"
          className="form-control"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Rejestier
      </button>
    </form>
  );
}
