const express = require('express')
const app = express()
const port = 3000;

app.use(express.static(__dirname + '/public'))

// endpoint, middleware(s)
app.get('/', function (req, res) {
    res.sendFile('index.html')
})

// endpoint, middleware(s)
app.get('/helloRender', function (req, res) {
    res.send('Hello Express from real world')
})


app.listen(port, ()=> console.log(`server is running on... ${port}`
        )
    )
