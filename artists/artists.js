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

module.exports = artists;
module.exports = generateId;