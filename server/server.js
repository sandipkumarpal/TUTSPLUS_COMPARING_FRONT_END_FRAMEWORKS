var express = require('express');
var bodyParser = require('body-parser');

var app = express();

let id = 7;

const data = {
    1: {id: 1, firstName: "Sandip", lastName: "pal", email: "sandip.pal@gmail.com"},
    2: {id: 2, firstName: "Rayel", lastName: "jason", email: "rayel.jason@gmail.com"},
    3: {id: 3, firstName: "Gopal", lastName: "Motheree", email: "gopal.mot@gmail.com"},
    4: {id: 4, firstName: "Sanjoy", lastName: "Porel", email: "sanjoy.porel@gmail.com"},
    5: {id: 5, firstName: "Rajesh", lastName: "Goggi", email: "rajesh.goggi@gmail.com"},
    6: {id: 6, firstName: "Amitava", lastName: "Das", email: "amithava.das@gmail.com"},
    7: {id: 7, firstName: "Tapas", lastName: "Kormokar", email: "tapas.kormakar@gmail.com"}
};

app.use(bodyParser.json());

app.use(express.static('./public'));

app.route('/api/contacts')
    .get(function (req, res) {
        const jsonData = Object.keys(data).map( key => data[key]);
        res.json(jsonData);
    })
    .post(function (req, res) {
        let record = req.body;
        record.id = ++id;
        data[record.id] = record;
        res.json(record);
    });

app.route('/api/contacts/:id')
    .get(function(req, res) {
        res.json(data[req.params.id]);
    })
    .put(function(req, res) {
        data[req.params.id] = req.body;
        res.json(req.body);
    })
    .delete(function(req, res) {
        delete data[req.params.id];
        res.json(null);
    });

app.get('*', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(4000);
