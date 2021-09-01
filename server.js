var express = require('express');
const path = require('path');

var app = express();

function generateId() {
    return Math.floor(Math.random() * 100)
};

var artists = [
    {
        id: generateId(),
        name: 'Metalica'
    },
    {
        id: generateId(),
        name: 'Evanescence'
    },
    {
        id: generateId(),
        name: 'Red Hot Chili Peppers'
    }
];



//Body parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/artists', function (req, res) {
    res.send(artists)
});


app.get('/artists/:id', function (req, res) {
    //console.log(req.params);
    var artist = artists.find(function (artist) {
        return artist.id === req.params.id
    });
    res.send(artist);
});


/* app.get('/test', function (req, res) {
    //res.render('', { title: 'member' })
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
    //res.send('<h1>my API is in action</h1>')
}); */

/* app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
}); */



app.use(express.static("public"))

app.listen(3012, function () {
    console.log('API is started')
})

// Lägga till 
app.post('/artists', function (req, res) {
    var artist = {
        id: generateId(),
        name: req.body.name
    };
    artists.push(artist);
    //console.log(req.body);
    //res.json(artist + 'post data');
    res.send('added');
})

// Uppdatera befinglight namn
app.put('/artists/:id', function (req, res) {
    var artist = artists.find(function (artist) {
        return artist.id === Number(req.params.id) //här kan använda parseInt eller Number, för att ändra string till number
    });
    artist.name = req.body.name;
    //res.json(artist + 'artist name is updated');
    res.send('updated')
})

app.delete('/artists/:id', function (req, res) {
    artists = artists.filter(function (artist) {
        return artist.id !== Number(req.params.id); //här kan använda parseInt eller Number, för att ändra string till number
    })
    //res.json(artist + 'artist name is deleted');
    res.send('deleted');
    res.json(true)
})