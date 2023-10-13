import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"
import slug from "mongoose-slug-generator"

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    rate : {
        type: Number,
        required: true
    },
    time : {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    videoId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Video',
        required: true
    },
    categoryId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Category',
        required: true
    }
}, { collection: "Course", timestamps: true })

mongoose.plugin(slug)
courseSchema.plugin(mongoosePaginate)

const Course = mongoose.model('Course', courseSchema);

export default Course;