const mongoclient = require('mongodb').MongoClient
const express = require('express')
const app = express()
const bodyparser = require('body-parser')
app.use(bodyparser.urlencoded({extended:true}))

mongoclient.connect('mongodb+srv://ShivanshGupta:india@2006@blogdb.xowev.mongodb.net/test?retryWrites=true&w=majority', {
    useUnifiedTopology:true})

        
 .then(client=>{
     console.log('Connected to database')
     const db = client.db('PollDB')
     const resultsCollection = db.collection('Results')
     app.set('view engine','ejs')
     app.listen(2000,function(req,res){
        console.log('The server is running')
    })
    app.get('/', function(req,res){
        res.sendFile(__dirname+'/index.html')
    })
    app.set('views', __dirname + '/views');
    app.get('/results',function(req,res){
        resultsCollection.find().toArray()
        .then(result=>{
            console.log(result)
            res.render('results.ejs', {Results:result})
        })
        .catch(error=>{
            console.error(error)
        })
     })
    
    app.post('/results',function(req,res){

        resultsCollection.insertOne(req.body)
        .then(result=>{ 
            res.redirect('/results')
        })


        .catch(error=>{
            console.error(error)
        })
    })
 })





