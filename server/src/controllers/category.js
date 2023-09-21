import Joi from "joi"
import category from "../models/category"
import products from "../models/product"
const categorySchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required()
})

export const create = async (req, res) => {

    try {
        const { error } = categorySchema.validate(req.body)
        if (error) {
            res.status({
                message: error.details[0].message
            })
        }
        const category_1 = await category.create(req.body)
        return res.status(201).json({
            message: "them san pham thanh cong",
            category_1
        })
    } catch (error) {
        return res.status(404).json({
            message: error.message
        })

    }

}
//get All
export const getAll = async (req, res) => {

    try {
        const category_1 = await category.find()
        return res.status(201).json({
            category_1
        })
    } catch (error) {
        return res.status(404).json({
            message: error.message
        })

    }

}
//get
export const get = async (req, res) => {

    try {
        const category_1 = await category.findById(req.params.id)
        const product = await products.find({ categoryId: req.params.id })
        return res.status(201).json({
            ...category_1.toObject(),
            product
        })
    } catch (error) {
        return res.status(404).json({
            message: error.message
        })

    }

}
export const update = async (req, res) => {
    try {
        const category_1 = await category.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
        return res.status(201).json({
            message: "cap nhat thanh cong",
            category_1
        })
    } catch (error) {
        return res.status(404).json({
            message: error.message
        })

    }

}
export const remove = async (req, res) => {
    try {
        const category_1 = await category.findByIdAndDelete(req.params.id)
        return res.status(201).json({
            message: "xoa thanh cong",
            category_1
        })
    } catch (error) {
        return res.status(404).json({
            message: error.message
        })

    }
}