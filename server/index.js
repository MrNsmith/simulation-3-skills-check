require('dotenv').config();

const express = require('express'),
      massive = require('massive'),
      session = require('express-session'),
      ctrl = require('./controller'),
      mainCtrl = require('./mainController'),
      {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env,
      port = SERVER_PORT,
      app = express();
      
app.use(express.json());  

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 7}

}));


massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
}).then(db => {
    app.set('db', db);
    console.log('db connected')
});
//Register endpoints
app.post('/api/register', ctrl.register);
app.post('/api/login', ctrl.login);
app.get('/api/logout', ctrl.logout)
app.get('/api/session',mainCtrl.logMeIn);



app.get('/api/posts', mainCtrl.getUserPosts);
app.get('/api/post/:title', mainCtrl.searchPostByTitle);
app.get('/api/posts/:id',mainCtrl.myPost);
app.post('/api/create', mainCtrl.addPost)
app.delete('/api/posts/:id', mainCtrl.deletePost);
//User endpoints      



app.listen(port, ()=> console.log(`Listening on ${port}`));
