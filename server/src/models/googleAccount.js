import mongoose from "mongoose";

const googleAccountSchema = new mongoose.Schema({}, { collection: "googleAccount", timestamps: true, strict: false });

const GoogleAccount = mongoose.model('googleAccount', googleAccountSchema);

export default GoogleAccount;
