import React from "react";
import "./ApplyNow.css";
import Cookies from "js-cookie";
import axios from "../axiosConfig";

function Modal({ setOpenModal, jobId }) {
  const Datatoken = () => {
    const storedUser = Cookies.get("Datatoken");
    return storedUser ? JSON.parse(storedUser) : null;
  };
  const user = Datatoken();

  const handelSubmit = () => {
    axios
      .post("/apply", {
        candidateId: user.id,
        jobId,
      })
      .then(() => {
        setOpenModal(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className="title">
          <h1>Are You Sure You Want to Continue?</h1>
        </div>
        <div className="body">
          <p>If you want to apply click on the submit button </p>
        </div>
        <div className="footer">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancelBtn"
          >
            Cancel
          </button>
          <button onClick={handelSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
