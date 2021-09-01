var express = require('express');
const path = require('path');
var artists = require('./artists/artists');
var generateId = require('./artists/artists');

var app = express();


//-------------------TEST CODE-Middleware----------------------
const getInfo = (req, res, next) => {
    console.log('OBS här hänt nån=> ' + `${req.protocol}://${req.get('host')}${req.originalUrl}`);
    next();
}

app.use(getInfo)
//------------------------------------------------------------



function generateId() {
    return Math.floor(Math.random() * 100)
};


var artists = [
    {
        id: 1,
        name: 'Metalica'
    },
    {
        id: 2,
        name: 'Evanescence'
    },
    {
        id: 3,
        name: 'Red Hot Chili Peppers'
    }
];

exports.artists = artists;


//Body parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

try{
    app.get('/artists', function (req, res) {
        res.send(artists)
    });
}catch{
    console.log('error')
}

// Här andra variant GET
try {
    app.get('/artists/:id', function (req, res) {
        //console.log(req.params);
        var artist = artists.find(function (artist) {
            return artist.id === req.params.id
        });
        res.send(artist);
    })
}
catch {
    console.log('error defined')
};






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
try {

    app.post('/artists', function (req, res) {
        var artist = {
            id: generateId(),
            name: req.body.name
        };
        artists.push(artist);
        //console.log(req.body);
        //res.json(artist + 'post data');
        res.send('added');
    });
}catch{
    console.error();
}

// Uppdatera befinglight namn
try{

    app.put('/artists/:id', function (req, res) {
        var artist = artists.find(function (artist) {
            return artist.id === Number(req.params.id) //här kan använda parseInt eller Number, för att ändra string till number
        });
        artist.name = req.body.name;
        //res.json(artist + 'artist name is updated');
        res.send('updated')
    })
}catch{
    console.error();
}


// Ta bort
try{
    app.delete('/artists/:id', function (req, res) {
        artists = artists.filter(function (artist) {
        return artist.id !== Number(req.params.id); //här kan använda parseInt eller Number, för att ändra string till number
    })
    //res.json(artist + 'artist name is deleted');
    res.send('deleted');
    res.json(true)
})
}catch{

}

