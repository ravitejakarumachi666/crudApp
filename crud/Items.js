const mongoose=require('mongoose');
const Product=require('./models/product');

mongoose.connect('mongodb://localhost:27017/farmStand',{useNewUrlParser:true,useUnifiedTopology: true})
.then(()=>{
    console.log('Mongo connection open!!');
})
.catch(err=>{
    console.log('oh no mongo connection error');
})

// const p=new Product ({
//     name:'Ruby Grapefruit',
//     price:1.99,
//     category:'fruit'
// })

// p.save().then(p=>{
//     console.log(p);
// })
// .catch(e=>{
//     console.log(e);
// })

const seedProducts=[
    {
        name:'Fairy EggPlant',
        price:1.00,
        category:'vegetable'
    },
    {
        name:'Organic Goddess Melon',
        price:4.99,
        category:'fruit'
    },
    {
        name:'Organic Mini Seedless Watermelon',
        price:3.89,
        category:'fruit'
    },
    {
        name:'Orgaic celery',
        price:1.50,
        category:'fruit'
    }
];

Product.insertMany(seedProducts)
.then(res=>{
    console.log(res);
})
.catch(e=>{
    console.log(e);
})