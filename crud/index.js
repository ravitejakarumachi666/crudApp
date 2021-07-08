const express=require('express');
const app=express();
const path=require('path');
const mongoose=require('mongoose');
const methodOverride=require('method-override');
app.use(methodOverride('_method'))

const Product = require('./models/product');

mongoose.connect('mongodb://localhost:27017/farmStand',{useNewUrlParser:true,useUnifiedTopology: true})
.then(()=>{
    console.log('Mongo connection open!!');
})
.catch(err=>{
    console.log('oh no mongo connection error');
})


app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}));

app.get('/products',async (req,res)=>{
    const products= await Product.find({})
    res.render('products/index',{products});
})

app.get('/products/new',(req,res)=>{
    res.render('products/new');
})

app.post('/products',async (req,res)=>{
   const newProduct=await new Product(req.body);
   await newProduct.save();
   res.redirect('products/');
})

app.get('/products/:id',async (req,res)=>{
    const {id} = req.params;
    const product =await Product.findById(id)
    res.render('products/show',{product});
})

app.get('/products/:id/edit',async (req,res)=>{
    const {id} = req.params;
    const product=await Product.findById(id);
    res.render('products/edit',{product});
})

app.put('/products/:id',async (req,res)=>{
    const {id} =req.params;
    const product=await Product.findByIdAndUpdate(id,req.body,{runValidators:true,new :true});
    res.redirect(`/products/${product._id}`);
})

app.delete('/products/:id',async (req,res)=>{
    const {id} =req.params;
    const deleteedProduct = await Product.findByIdAndDelete(id);
    res.redirect('/products');
})

app.listen(3000,()=>{
    console.log("app is listeneing");
})