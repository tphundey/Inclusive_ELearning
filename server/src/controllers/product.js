import Joi from "joi"
import products from "../models/product"
const productSchema = Joi.object({
    name: Joi.string().required()
   
})

export const create = async (req, res) => {

    try {
        const { error } = productSchema.validate(req.body)
        if (error) {
            res.status({
                message: error.details.map((err) => err.message)
            })
        }
        const product = await products.create(req.body)
        return res.status(201).json({
            message: "them san pham thanh cong",
            product
        })
    } catch (error) {
        return res.status(404).json({
            message: error
        })

    }

}
//get All
export const getAll = async (req, res) => {
    // const { _limit = 10, _sort = "createAt", _order = "asc", _page = 1 } = req.query
    // const options = {
    //     limit: _limit,
    //     page: _page,
    //     sort: {
    //         [_sort]: _order === "desc" ? -1 : 1,
    //     }
    // }

    try {
        const product = await products.find()
        // const data = await product.paginate({}, options)
        return res.status(201).json({
            product
        })
    } catch (error) {
        return res.status(404).json({
            message: error
        })

    }

}
//get
export const get = async (req, res) => {

    try {
        const product = await products.findById(req.params.id).populate("categoryId")
        return res.status(201).json({
            product
        })
    } catch (error) {
        return res.status(404).json({
            message: error
        })

    }

}
export const update = async (req, res) => {
    try {
        const product = await products.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
        return res.status(201).json({
            message: "cap nhat thanh cong",
            product
        })
    } catch (error) {
        return res.status(404).json({
            message: error
        })

    }

}
export const remove = async (req, res) => {
    try {
        const product = await products.findByIdAndDelete(req.params.id)
        return res.status(201).json({
            message: "xoa thanh cong",
            product
        })
    } catch (error) {
        return res.status(404).json({
            message: error
        })

    }
}