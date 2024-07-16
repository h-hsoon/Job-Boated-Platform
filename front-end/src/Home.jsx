import { useState } from "react";
import axios from 'axios';

function Home() {
      
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword:''
      });

      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };

    function clickFunction() {
        console.log('call for the api');
        
        console.log(formData);
        
        axios.post('http://localhost:5000/', formData)
            .then((data) => {
                //if sign up succeed then redirect to component saying sign up succefull
                console.log(data);
               
            }).catch((err)=>{
                console.log(err);
            })

    }



    return (
        <div>
            <h1 >Sign Up</h1>
            <hr />
            <form className="SignUpForm">

                <input type="text" name="firstName"  onChange={handleChange}  placeholder="First Name" />
                <input type="text" name="lastName"   onChange={handleChange} placeholder="Last Name" />
                <input type="text" name="email"   onChange={handleChange} placeholder="Email" />
                <input type="password" name="password"    onChange={handleChange} placeholder="Password" />
                <input type="password" name="confirmPassword"   onChange={handleChange} placeholder="Confirm Password" />
                <button onClick={clickFunction}>SignUp</button>

            </form>



        </div>
    )
}

export default Home;