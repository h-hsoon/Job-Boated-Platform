const employee = require("../models/Schema")



const  SignUp = (req, res) => {
    console.log('receive  call  of the api');
    console.log(req.body);
    //create an employee
    var  employeeObj = {
        firstName: "Abd",
        lastName: "sohail",
        email: "abd@gmail.com",
    }
    const data =employee (employeeObj)
    //data.save();
    res.send(employeeObj)
}







module.exports = {
    SignUp,
}
