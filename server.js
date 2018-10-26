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
app.use(express.urlencoded({extended:false}));


const outfitsController = require('./controllers/outfits.js');
app.use('/outfits', outfitsController);

const userController = require('./controllers/users.js')
app.use('/users', userController);


const sessionsController = require('./controllers/sessions.js');
app.use('/sessions', sessionsController);


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



mongoose.connect('mongodb://localhost:27017/outfits', {useNewUrlParser:true});
mongoose.connection.once('open', ()=>{
    console.log('connected to mongo');
})

app.listen(3000, ()=>{
  console.log('listening....')
})
