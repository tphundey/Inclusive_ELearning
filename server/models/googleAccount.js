const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({}, { collection: "GoogleAccount", timestamps: true, strict: false });

dataSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
      ret.id = ret._id;
      delete ret._id;
    }
});

const GoogleAccount = mongoose.model('GoogleAccount', dataSchema);

module.exports = GoogleAccount;
