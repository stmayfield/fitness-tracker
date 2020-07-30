const express = require('express');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 8080;
const db = require("./models");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('/public/'));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/populatedb", { useNewUrlParser: true });

require('./routes/html-routes.js')(app)

// API routes needed

/*
"/api/workouts/range" {GET}
*/


app.get('/api/workouts', (req, res) => {
    db.Exercise.find({}, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.json(data);
        }
    })
})

app.post('/api/workouts', ({ body }, res) => {
    console.log(body);
    db.Exercise.create(body, (err, add) => {
        if (err) {
            console.log(err);
        } else {
            res.send(add);
        }
    })
})


app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);

})