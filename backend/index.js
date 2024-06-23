const express = require('express');
const cors=require("cors");

require('./db/config');
const User=require("./db/User");
const Product = require("./db/Product")
const app=express();

//middleman

app.use(express.json());
app.use(cors());

app.post("/register",async(req,resp)=>{
let user=new User(req.body);
let result=await user.save();
result = result.toObject();
delete result.password;
resp.send(result);
   })

app.post("/login",async(req,resp)=>{
    console.log(req.body)


if(req.body.password && req.body.email){
            let user = await User.findOne(req.body).select("-password");
            if(user)
            {
                resp.send(user);
            }else{
                resp.send({result:'No User Found'});
            }

 } else
    {
        resp.send({result:'Enter both email and password'})
    }
    
   

    })
    

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
app.listen(5000);
