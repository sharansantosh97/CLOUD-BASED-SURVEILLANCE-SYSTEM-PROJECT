const User = require('../models/user');

const login = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const record =  await User.findOne({ email: email });
    console.log("record",record);
    if(!record){
        res.json({"status":401,"message":"no user present"});
    }else{
       if(record?.password == password){
            // req.session.isLoggedIn = true;
            // req.session.userId = record._id;
           res.json({"status":200,"message":"authorized","isAdmin":record.isAdmin, "userId":record._id
                   ,name:record.firstName+" "+record.lastName});
       }else{
           res.json({"status":401,"message":"wrong password"});
       }
   }
}

const logout = (req,res,next)=>{
    // req.session.destroy(err => {
    //     console.log(err);
    //     res.json({"status":200});
    // });
    console.log("logout reached");
    //req.session.destroy();
    res.json({status:200,"message":"user logged off"});
}

const register = async (req,res,next)=>{
    await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password:req.body.password,
        email:req.body.email,
        isAdmin:req.body.isAdmin,
        status:"Onboarding",
        campusName:req.body.campusName,
        phoneNumber:req.body.phoneNumber
    });
    res.json({'status':200});
}

module.exports = {
    login,
    logout,
    register
}