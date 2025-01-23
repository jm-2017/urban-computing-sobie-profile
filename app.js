const express = require('express')
const app = express()
const port = 3000;
const bodyParser = require('body-parser')


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static(__dirname + '/public'))

// endpoint, middleware(s)
app.get('/', function (req, res) {
    res.sendFile('index.html')
})

app.post('/saveMyName', (req, res)=>{
    console.log('did we hit the endpoint?');
    console.log(req.body);
   // res.redirect('/ejs');
    res.render('words', 
    {pageTitle : req.body.Myname});
})

app.get('/saveMyNameGet', (req, res)=>{
    console.log('did we hit the endpoint?');
    console.log(req.query);
    res.redirect('/ejs');
})

app.get('/ejs', function (req, res) {
    res.render(' words', {pageTitle : 'my cool ejs page'});
})

app.get('/nodemon', function (req, res) {
    res.send('no kill');
})


app.get('/helloRender', function (req, res) {
    res.send('Hello Express from Real World<br><a href="/">back to home</a>')
  })

app.listen(port, ()=> console.log(`server is running on... ${port}`
));
