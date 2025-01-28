const express = require('express')
require('dotenv').config()
const app = express()
// const port = process.env.PORT || 3000;
const port = 3000;
const bodyParser = require('body-parser')
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MOGNGO_URI;

// console.log(uri);

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static(__dirname + '/public'))

// begin all my middlewares
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

// endpoint, middleware(s)
app.get('/', function (req, res) {
    res.sendFile('index.html')
})

app.post('/saveMyName', (req, res)=>{
    console.log('did we hit the endpoint?');
    console.log(req.query);
   // res.redirect('/ejs');
   // console.log('req.params: ', req.params);
    let reqName = req.query.myNameGet;
    res.render('words', 
    {pageTitle : req.body.myName});
    // the following line does not work w my code ? =>
    //{pageTitle: reqName});
})

app.get('/saveMyNameGet', (req, res)=>{
    console.log('did we hit the endpoint?');
    console.log(req.query);
    res.redirect('/ejs');
})

app.get('/ejs', function (req, res) {
    res.render('words', {pageTitle : 'my cool ejs page'});
})

app.get('/nodemon', function (req, res) {
    res.send('no kill');
})


app.get('/helloRender', function (req, res) {
    res.send('Hello Express from Real World<br><a href="/">back to home</a>')
  })

app.listen(port, ()=> console.log(`server is running on... ${port}`
));
