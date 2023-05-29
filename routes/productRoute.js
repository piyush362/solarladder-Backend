import { Router } from "express";
import Product from '../model/productModel.js'

import cloudinary from '../utils/cloudinary.js'
import upload from '../utils/multer.js'


const router = Router();


//uploading image files
// here "image" is the key value of file upload *** important to consider
router.post('/uploadimage', upload.single('image'), async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path)
        // res.json(result)
        console.log(result)

        res.json(result)

    } catch (error) {
        console.log(error)
    }
})

// add item
router.post('/product', upload.single('image'), async (req, res) => {

    const newProduct = new Product(req.body)

    if (req.file) {
        try {
            const uploadImage = await cloudinary.uploader.upload(req.file.path)
            newProduct.image = uploadImage.url;
        } catch (error) {
            console.log(error)
        }
    }

    try {
        const result = await newProduct.save();
        res.status(200).json(result)

    } catch (error) {
        res.status(500).json(error)
    }

})

// get list of item 
router.get('/products', async (req, res) => {

    try {
        const productList = await Product.find();
        res.status(200).json(productList);

    } catch (error) {
        res.status(500).json(error)
    }


})


// get single product
router.get('/product/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const productbyId = await Product.findById(id);
        res.status(200).json(productbyId);

    } catch (error) {
        res.status(500).json(error)
    }


})


// update product 
router.put('/product/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedProduct)

    } catch (error) {
        res.status(500).json(error);
    }

})

// delete product
router.delete('/product/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        res.status(200).json({ "deletedProduct": deletedProduct })
    } catch (error) {
        res.status(500).json(error)
    }


})


export default router;