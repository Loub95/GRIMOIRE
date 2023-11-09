const express = require('express'); 
const bodyParser = require('body-parser');
const mongoose = require('mongoose'); 
const booksRoutes = require("./routes/books");
const userRoutes = require('./routes/user');
const path = require('path');




mongoose.connect('mongodb+srv://Loub95:Graziani95@cluster0.k28u5si.mongodb.net/?retryWrites=true&w=majority',
{ useNewUrlParser: true,
  useUnifiedTopology: true })
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));



const app = express();


 /* On intercepte toutes les requetes qui continennent du json et nous met a disposition le reste */ 


app.use((req, res, next) => {
   res.setHeader('Access-Control-Allow-Origin', '*'); /* *= tout le monde*/
   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
   next();
 });


app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/books', booksRoutes);
app.use('/api/auth', userRoutes);

 
 
 module.exports = app; 

