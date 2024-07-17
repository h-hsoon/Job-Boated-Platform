import { useState } from "react";
import axios from "axios";

function Home() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    function clickFunction() {
        console.log("call for the api");

        console.log(formData);
        
        axios
            .post("http://localhost:5000/", formData)
            .then((data) => {
                //if sign up succeed then redirect to component saying sign up succefull
                console.log(data);
            })
            .catch((err) => {
                if (err.response) {
                    setError(err.response.data.error);
                }
                console.log(err);
            });
    }

    return (
        <div>
            <h1>Sign Up</h1>
            <hr />
            <form className="SignUpForm">
                <input
                    type="text"
                    name="firstName"
                    onChange={handleChange}
                    placeholder="First Name"
                    required="true"
                />
                <input
                    type="text"
                    name="lastName"
                    onChange={handleChange}
                    placeholder="Last Name"
                    required="true"
                />
                <input
                    type="text"
                    name="email"
                    onChange={handleChange}
                    placeholder="Email"
                    required="true"
                />
                <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    placeholder="Password"
                    required="true"
                />
                <input
                    type="password"
                    name="confirmPassword"
                    onChange={handleChange}
                    placeholder="Confirm Password"
                    required="true"
                />
                <button onClick={clickFunction}>SignUp</button>
            </form>
            <p>{error}</p>
        </div>
    );
}

export default Home;
