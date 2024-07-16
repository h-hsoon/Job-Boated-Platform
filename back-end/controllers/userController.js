const employee = require("../models/Schema")



const  SignUp = (req, res) => {
    console.log('receive  call  of the api');
    console.log(req.body);

    const data =employee (req.body)
    //data.save();
    res.send(req.body)
}







module.exports = {
    SignUp,
}
