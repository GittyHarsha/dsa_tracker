const mongoose=require('mongoose');

mongoose.connect("mongodb://127.0.0.1/dsa_tracker_db");

const db=mongoose.connection;

db.on('error', console.error.bind(console, 'error connecting to the database'));
db.once('open', function() {
    console.log('connected to the database');
}
);

