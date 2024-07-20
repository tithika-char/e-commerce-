const express = require('express');
const cors=require("cors");

require('./db/config');
const User=require("./db/User");
const Product = require("./db/Product")


const Jwt = require('jsonwebtoken');
const jwtKey='e-comm';

const app=express();

//middleman

app.use(express.json());
app.use(cors());

app.post("/register",async(req,resp)=>{
let user=new User(req.body);
let result=await user.save();
result = result.toObject();
delete result.password;

Jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
    if (err) {
        resp.send({ result: "Something went wrong, please try after some time" });
    } else {
        resp.send({ result, auth: token });
    }
})

   })




   app.post("/login", async (req, resp) => {
    // console.log(req.body);

    if (req.body.password && req.body.email) {
        try {
            let user = await User.findOne({ email: req.body.email, password: req.body.password }).select("-password");
            if (user) {
                Jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
                    if (err) {
                        resp.send({ result: "Something went wrong, please try after some time" });
                    } else {
                        resp.send({ user, auth: token });
                    }
                });
            } else {
                resp.send({ result: 'No User Found' });
            }
        } catch (error) {
            resp.send({ result: 'An error occurred', error: error.message });
        }
    } else {
        resp.send({ result: 'Enter both email and password' });
    }
});


app.post("/add-product",async (req,resp)=>{
    console.log(req.body)
    let product = new Product(req.body);
    let result = await product.save();
    resp.send(result)
})


app.get("/products",async(req,resp)=>{
    let products = await Product.find();
    if(products.length > 0){
        resp.send(products)
    }else{
        resp.send({result: "No Products found"}) //RESULT IS A key
    }
})

app.delete("/product/:id",async(req,resp)=>{
    const result = await Product.deleteOne({_id:req.params.id}) //DELETEONE IS A METHOD
  //  resp.send(req.params.id)
  resp.send(result);
})


app.get("/product/:id", async (req,res)=>{
    try{
        let result = await Product.findOne({_id:req.params.id});
        if (result){
            res.send(result)
        }
        else {
            res.send({result:"no record found"})
        }

    }
    catch (error) {
        res.status(500).send({ error: "An error occurred while fetching the product" });
      }

})

app.put("/product/:id", async(req,resp)=>{
    let result = await Product.updateOne(
        {_id: req.params.id},
        {
            $set : req.body
        }
    )
    resp.send(result);
})


app.get("/search/:key",verifyToken ,async(req,resp)=>{
    let result= await Product.find({
        "$or":[
            { name: { $regex: req.params.key, $options: 'i' } },
            { name: { $regex: req.params.key, $options: 'i' } },
            { category: { $regex: req.params.key, $options: 'i' } }
        ]
    });
    resp.send(result)
})

function verifyToken(req, resp, next){
    let token = req.headers['authorization'];
    if(token){
        token=token.split('');
    }
    else{

    }
    console.warn("middleware called",token)
    next();
}

app.listen(5000);
