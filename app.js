const express = require('express');
const path = require('path');
const app = express();
const bodyparser = require('body-parser')
const mongoose = require('mongoose');
// var db = mongoose.connection;
// main().catch(err => console.log(err));
mongoose.connect('mongodb://127.0.0.1:27017/contactDance', {useNewUrlParser:true});
const port = 8000;

var db = mongoose.connection;;
db.on("error", console.error.bind(console, 'connection error:'));
db.once('open', function(){
    // we are connected
    console.log("we are connected")
})

// Define mongoose schema
var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    concern: String
  });
  var contact = mongoose.model('contact', contactSchema);
  contact.find();



// app.use(express.static('public', options))
app.use("/static", express.static('static'))     // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug')    // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) 

app.get('/', (req, res)=>{
    const params = { }
    res.status(200).render('home.pug', params)
})
app.get('/contact', (req, res)=>{
    const params = { }
    res.status(200).render('contact.pug', params)
})
app.post('/contact', (req, res)=>{
    var myData = new contact(req.body);
    myData.save().then(()=>{
      res.send("This item has been saved to the database")
    }).catch(()=>{
      res.status(400).send("Item was not saved to the database")
    });
})
//  START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`)
})