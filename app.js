const express = require('express')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 3000;
//const port = 3000;
const bodyParser = require('body-parser')
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGO_URI;
// cpmmented out on 2 6 2025
//console.log(uri);

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
// run().catch(console.dir);



async function getData() {
  await client.connect();
  let collection = await client.db("janet-app-database").collection( "janet-app-data");

  // let collection = await db.collection("posts");

  let results = await collection.find({}).toArray();

  console.log(results);
  return results;
}

app.get('/insert', async(req, res) => {
  console.log('in /insert');

  let newData = req.query.myName;
  // connect to db
  await client.connect();
  // point to the collection
  await client
  .db("janet-app-database")
  .collection("janet-app-data")
  .insertOne({song : newData})

  res.redirect('/read')
})

app.get('/read', async function(req, res) {
  let getDataResults = await getData();
  console.log(getDataResults);
  // res.send(getDataResults);
  res.render('data',
    {newData : getDataResults}
  );
})


// endpoint, ? middleware(s)
app.get('/', function (req, res) {
    res.sendFile('index.html')
})

app.post('/saveMyName', (req, res)=>{
    console.log('did we hit the endpoint?');
    console.log(req.body);
   // res.redirect('/ejs');
    res.render('words', 
    {pageTitle : req.body.myName});
    // the following line does not work w my code ? =>
    //{pageTitle: reqName});
})

app.get('/saveMyNameGet', (req, res)=>{
    console.log('did we hit the endpoint?');
    console.log('req.query: ', req.query);
    let reqName = req.query.myNameGet;
    //res.redirect('/ejs');
    res.render('words', 
      {pageTitle: reqName}
    );
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
