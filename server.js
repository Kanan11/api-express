var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var artists = [
    {
        id: 1,
        name:'Metalica'
    },
    {
        id: 2,
        name:'Evanescence'
    },
    {
        id: 3,
        name:'Red Hot Chili Peppers'
    }
];

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/artists', function(req,res){
    res.send(artists)
});

app.get('/artists/:id', function (req, res){
    console.log(req.params);
    var artist = artists.find(function (artist){
        return artist.id === Number(req.params.id)
    });
    res.send(artist);
});

app.get('/', function(req,res){
    res.send('my API is in action')
})

app.listen(3012, function(){
    console.log('API is started')
})

// Lägga till 
app.post('/artists', function (req, res) {
    var artist ={
        id: Date.now(),
        name: req.body.name
    };
    artists.push(artist);
    //console.log(req.body);
    //res.json(artist + 'post data');
    res.send('added');
    res.sendStatus('200');
})

// Uppdatera befinglight namn
app.put('/artists/:id', function(req,res){
    var artist=artists.find(function(artist){
        return artist.id === Number(req.params.id)
    });
    artist.name=req.body.name;
    //res.json(artist + 'artist name is updated');
    res.send('updated')
})

app.delete('/artists/:id', function(req,res){
    artists=artists.filter(function(artist){
        return artist.id !== Number(req.params.id);
    })
    //res.json(artist + 'artist name is deleted');
    res.send('deleted')
    })