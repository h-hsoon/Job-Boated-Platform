const jobSeekerModel = require("../models/jobSeekerModel");



const  SignUp = (req, res) => {
    console.log('receive  call  of the api');
    console.log(req.body);

    const emp = {
        firstName: 'aicha',
        lastName: 'metioui',
        email: 'aicha',
        password: '123'
    }
    const data =jobSeekerModel (emp)
    data.save();
    res.send(req.body)
}







module.exports = {
    SignUp,
}
