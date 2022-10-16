const { required } = require('@hapi/joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        unique:true
    },
    password: {
        type: String,
        required: true
    },
    role:{
        type: String,
        enum:['user','admin'],
        default:'user'
    }

});

userSchema.pre('save',async function(next){
     try{
        if(this.isNew){
       //  console.log("CALLED BEFORE SAVINNG A USER")
       const salt = await bcrypt.genSalt(10);
       const hashedPassword = await bcrypt.hash(this.password, salt);
       this.password=hashedPassword;
        }
       next();

     }
     catch(error){
     next(error)
     }
})

// userSchema.post('save',async function(next){
//     try{
//         console.log("CALLED AFTER SAVINNG A USER")

//     }
//     catch(error){
//     next(error)
//     }
// })

userSchema.methods.isValidPassword = async function(password){
    try{
       return await bcrypt.compare(password,this.password)
    }
    catch(error){
       throw error
    }
}

const User = mongoose.model('user',userSchema)
module.exports=User
