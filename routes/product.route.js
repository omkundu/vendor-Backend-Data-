const express = require("express");

const { ProductModel } = require("../models/Product.model");

const productRouter = express.Router();

productRouter.get("/", async (req, res) => {
  const shoes = await ProductModel.find();
  res.send(shoes);
});

productRouter.post("/create", async (req, res) => {
  const payload = req.body;
  console.log(payload);
  //get token from header
  //verify token using jwt
  try {
    const new_note = new ProductModel(payload);
    await new_note.save();
    res.send({ msg: "Shoes Added successfully" });
  } catch (err) {
    console.log(err);
    res.send({ err: "Something went wrong" });
  }
});

module.exports = { productRouter };
