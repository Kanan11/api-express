var express = require('express');
const path = require('path');

var app = express();

const getInfo = (req, res, next) => {
    console.log('OBS här hänt nån=> ' + `${req.protocol}://${req.get('host')}${req.originalUrl}`);
    next();
}

app.use(getInfo) // DEMO



function generateId() {
    return Math.floor(Math.random() * 100).toString();

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
    },
    {
        id: generateId(),
        name: 'Nirvana'
    }
];

app.use(express.static("public")) // Klient mappen

// server
const PORT = process.env.PORT || 3012;

app.listen(PORT, function () {
    console.log(`server started at port ${PORT}`)
})

//Body parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Ta fram
try {
    app.get('/artists', function (req, res) {
        res.json(artists)
    });
} catch (err) {
    console.log('error')
}


// Lägga till 
app.post('/artists', function (req, res) {
    try {
        var artist = {
            id: generateId(),
            name: req.body.name
        };
        artists.push(artist);
        res.json('added');
    } catch {
        console.error();
    }
});

// Uppdatera befinglight namn
app.put('/artists/:id', function (req, res) {
    try {
        var artist = artists.find(function (artist) {
            return artist.id === req.params.id;
        });
        artist.name = req.body.name;
        res.json('updated')
    } catch (err) {
        console.error();
    }
})


// Ta bort
app.delete('/artists/:id', function (req, res) {
    try {
        artists = artists.filter(function (artist) {
            return artist.id !== req.params.id; 
        })
        res.json('deleted');
    } catch (err) {
        console.error();
    }
})