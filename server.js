const express = require('express')
const app = express();
const mongoose = require('mongoose')
const session = require('express-session')

app.use(express.json());
app.use(express.static("public"));
app.use(session({
    secret:'feedmeseymour',
    resave: false,
    saveUninitialized: false
}));
app.use(function(req, res, next) {
  res.locals.currentUser = req.session.currentUser;
  next();
});
app.use(express.urlencoded({extended:false}));


const outfitsController = require('./controllers/outfits.js');
app.use('/outfits', outfitsController);

const userController = require('./controllers/users.js')
app.use('/users', userController);


const sessionsController = require('./controllers/sessions.js');
app.use('/sessions', sessionsController);

const db = mongoose.connection;

const PORT = process.env.PORT || 3000;

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/' + 'Clueless_Closet';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true
});

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

// open the connection to mongo
db.on('open', () => {});




app.get('/app', (req, res)=>{
    if(req.session.currentUser){
      res.json(req.session.currentUser);
    } else {
        res.status(401).json({ //status 401 is specifically for when the user needs to log in
            status:401,
            message:'not logged in'
        });
    }
});



// mongoose.connect('mongodb://localhost:27017/outfits', {useNewUrlParser:true});
// mongoose.connection.once('open', ()=>{
//     console.log('connected to mongo');
// })

app.listen(3000, ()=>{
  console.log('listening....')
})
