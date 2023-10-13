import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"
import slug from "mongoose-slug-generator"

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    course : [
        {
            type : mongoose.Types.ObjectId,
            ref: "Course",
        },
    ],
}, 
    { collection: "Category", timestamps: true }
)
mongoose.plugin(slug)
categorySchema.plugin(mongoosePaginate)

const Category = mongoose.model('Category', categorySchema);

export default Category;
