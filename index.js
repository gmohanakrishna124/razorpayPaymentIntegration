const express = require('express');
const Razorpay = require('razorpay');
const app = express();

let order_id_variable;
const razorpay = new Razorpay({
    key_id: 'rzp_test_mm2kDQjmFOHWtF',
    key_secret: 'unhQ3fupVx4OxuT7nOtfHNhg',

})

app.use(express.static('public'));
app.use('/css',express.static(__dirname + 'public/css'));
app.use('/img', express.static(__dirname + 'public/img'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.set('views','./views');
app.set('view engine', 'ejs');
const PORT = process.env.PORT||5000;
app.get('/', (req,res)=>{
    res.render('razorpay.ejs');
})

app.post('/order',(req,res)=>{
    let options = {
        amount: 59999,
        currency:"INR",
    };
    razorpay.orders.create(options, function(err,order){
        order_id_variable = order.id;
        console.log(order);
        res.json(order);
    })
})

app.post('/payment-sucess',(req,res)=>{
    razorpay.payments.fetch(req.body.razorpay_payment_id).then((paymentDocument)=>{
        console.log(paymentDocument);
        if(paymentDocument.status=='captured'){
            res.render('success.ejs');
        }else{
            res.send('payment not successful');
        }
    })
})
app.listen(PORT,()=>{
    console.log('Server is running at prot 5000');
})