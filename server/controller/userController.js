const User = require("../model/userModel.js");

async function createOne(req,res){
    try{
        // check weather the new email and phone are already registered or not?
        const userWithEmail = await User.findOne({email: req.body.email});
        if(userWithEmail){
            return res.status(500).json({msg: "The email is already registered"});
        }

        const userWithPhone = await User.findOne({phone: req.body.phone});
        if(userWithPhone){
            return res.status(500).json({msg: "The phone is already registered"});
        }


        const userData = new User(req.body)
        
        const result = await userData.save();
        // console.log(result);

        res.status(200).json(result);
    }

    catch(err){
        res.status(500).json({msg: err.message});
    }
}


async function getAll(req,res){
    try{
        const result = await User.find();
        
        if(result.length==0){
            return res.status(404).json({msg: "Data not available"})
        }

        res.status(200).json(result);
    }

    catch(err){
        res.status(500).json({msg: err.message});
    }
}


async function getOne(req,res){
    try{
        const userId = req.params.id;
        const result = await User.findById(userId);

        if(!result){
            return res.status(404).json({msg: "User data not found"});
        }

        res.status(200).json(result);
    }
    catch(err){
        res.status(500).json({msg: err.message});
    }

}

async function updateOne(req,res){
    try{
        const userId = req.params.id;
        const currUser = await User.findById(userId);


        // if all the field values are same, then we don't need to update in database
        if(currUser.firstName===req.body.firstName && currUser.lastName===req.body.lastName && currUser.email===req.body.email && currUser.phone===req.body.phone){
            return res.status(500).json({msg: "The data is already similar"});
        }


        // it means someone is trying to update the email also, hence we have to check weather the changed email or we can say the new email is already present in the database or not.
        if(currUser.email !== req.body.email){ 
            const userWithEmail = await User.findOne({email: req.body.email});
            if(userWithEmail){
                return res.status(500).json({msg: "The email is already registered"});
            }
        }


        // it means someone is trying to update the phone also, hence we have to check weather the changed phone or we can say the new phone is already present in the database or not.
        if(currUser.phone!==req.body.phone){
            const userWithPhone = await User.findOne({phone: req.body.phone});
            if(userWithPhone){
                return res.status(500).json({msg: "The phone is already registered"});
            }
        }




        const result = await User.findByIdAndUpdate(userId, {$set: req.body},  {runValidators:true}); 
        //* it will return null if no data found.
        //* result will store the previous value if updation done.
        //* if we want result to store updated value, then we have to pass {new: true} but in that case runValidators will not work

        if(!result){
            return res.status(404).json({msg: "no user found to update"});
        }

        res.status(200).json({msg: "updation successfull"});
    }
    catch(err){
        res.status(500).json({msg: err.message});
    }
}


async function deleteOne(req,res){
    try{
        const userId = req.params.id;
        const result = await User.findByIdAndDelete(userId);
        //* result will store null, if user not found
        //* if user data found, then it will be deleted from database and result will store the value of that user.

        if(!result){
            return res.status(404).json({msg: "user not found to delete"});
        }

        res.status(200).json({msg: "deletion performed successfully"});
    }
    catch(err){
        res.status(500).json({msg: err.message});
    }
}

module.exports = {createOne,getAll,getOne,updateOne,deleteOne}