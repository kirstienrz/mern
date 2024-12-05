import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    facebookId: { type: String, required: false, unique: true },
    name: {type: String, required: true},
    email: {type: String, required:true, unique:true},
    profilePicture: { type: String, default: "" },
    password: {type: String, required:true},
    cartData: {type: Object, default: {}}

}, {minimize: false})

const userModel = mongoose.models.user || mongoose.model('user',userSchema);

export default userModel