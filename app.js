const express = require("express");
const path = require("path");
const app = express();
const mongoose = require('mongoose');
const port = 8000;

// connecting to the mongodb database
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/contactDance');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

//Define mongo schema
const contactSchema = new mongoose.Schema({
    name  :String,
    phone :String,
    email : String,
    address : String,
    age : String,
    gender :String
})

// Converting the schema into model 
const Contact  = mongoose.model("Contact",contactSchema);


// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory from which you want to read
 

// ENDPOINTS
app.get('/', (req, res)=>{
    const params = {}
    res.status(200).render('home.pug', params);
})
app.get('/about', (req, res)=>{
    const params = {}
    res.status(200).render('about.pug', params);
})
app.get('/contact', (req, res)=>{
    const params = {}
    res.status(200).render('contact.pug', params);
})
app.get('/services', (req, res)=>{
    const params = {}
    res.status(200).render('services.pug', params);
})

app.post('/contact',(req,res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database")
    })
})

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});