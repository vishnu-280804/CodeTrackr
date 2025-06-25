import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username:String,
    email:String,
    password:String,
    lc:String,
    github:String,
    codeforces:String,
    twitter:String
});

const User = mongoose.model("User",userSchema);

export default User;