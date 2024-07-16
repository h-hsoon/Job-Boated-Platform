import { useState } from "react";


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
   
        
        fetch('http://localhost:5000/', {
            method: "POST",
            body: JSON.stringify(formData)
        })

            .then((data) => {
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
                <br />
                <input type="text" name="lastName"   onChange={handleChange} placeholder="Last Name" />
                <br />
                <input type="text" name="email"   onChange={handleChange} placeholder="Email" />
                <br />
                <input type="password" name="password"    onChange={handleChange} placeholder="Password" />
                <br />
                <input type="password" name="confirmPassword"   onChange={handleChange} placeholder="Confirm Password" />
               <br /> <button onClick={clickFunction}>SignUp</button>

            </form>



        </div>
    )
}

export default Home;