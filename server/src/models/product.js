import mongoose from "mongoose";
// import mongoosePaginate from "mongoose-paginate-v2"
// const { Schema } = mongoose;
const productSchema = new mongoose.Schema({
    name: {
        type: String
    }
   
}, {
    timestamps: true,
    versionKey: false
})
// productSchema.plugin(mongoosePaginate)

export default mongoose.model('products', productSchema)