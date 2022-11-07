//code written with help from hassan and ellie

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db, collection;
//URL from mongodb website cluster
const url = "mongodb+srv://geminimoonchild:1234@cluster0.o3h3upz.mongodb.net/coinflipProject?retryWrites=true&w=majority";
const dbName = "coinflipProject";

app.listen(8080, () => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(dbName);
        console.log("Connected to `" + dbName + "`!");
    });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  db.collection('messages').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {messages: result})
  })
})

app.post("/messages", (req, res) => {
  let coinResult = Math.ceil(Math.random() * 2);
  let botResult;
  let userInput = req.body.personChoice.toLowerCase()

  if (userInput == 'heads' || userInput == 'tails') {
    if (coinResult <= 1) {
      botResult = "heads";
    } else if (coinResult <= 2) {
      botResult = "tails";
    }
    let outcome;
    if (botResult === req.body.personChoice) {
      outcome = "You Win!";
    } else {
      outcome = "You Lose!";
    }
  
    db.collection("messages").insertOne(
      {
        personChoice: req.body.personChoice,
        flipResult: botResult,
        theFinalAnswer: outcome,
          
      },
      (err, result) => {
        if (err) return console.log(err);
        console.log("saved to database");
        res.redirect("/");
      }
    );

  }

  
});



app.delete('/messages', (req, res) => {
  db.collection('messages').findOneAndDelete({name: req.body.name, msg: req.body.msg}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})
