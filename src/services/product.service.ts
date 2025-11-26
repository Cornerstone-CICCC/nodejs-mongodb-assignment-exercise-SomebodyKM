import { IProduct, Product } from "../models/product.model"

// Get all products
const getAll = async () => {
    return await Product.find()
}

// Get product by id
const getById = async (id: string) => {
    return await Product.findById(id)
}

// Add new product
const add = async (newProduct: Partial<IProduct>) => {
    return await Product.create(newProduct)
}

// Update product
const update = async (id: string, data: Partial<IProduct>) => {
    return await Product.findByIdAndUpdate(id, data, {
        new: true
    })
}

// Delete product
const remove = async (id: string) => {
    return await Product.findByIdAndDelete(id)
}

export default {
    getAll,
    getById,
    add,
    update,
    remove
}