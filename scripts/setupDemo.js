
/**
 * This script is used to initialize our MongoDB database
 * so that it includes a handful of patients, doctors and
 * medications for demo purposes.
 */

const mongoose = require('mongoose');
const DateOnly = require('mongoose-dateonly')(mongoose);

mongoose.connect('mongodb://heroku_b4dqpvhv:kd1cn5b4q6odbi7fan7t86sr7v@ds145405.mlab.com:45405/heroku_b4dqpvhv' || 'mongodb://localhost/pharmagree');
mongoose.connection.on('error', (err) => {
  if (err) {
    console.log(err);
  }
});

const User = require('../models/user');
const Medication = require('../models/medication');

function clearDatabase(cb) {
  // Clear the user database
  User.remove({}, (err) => {
    if (err) cb(err);
    else {
      console.log('Cleared User database...');
      Medication.remove({}, (err) => {
        if (err) cb(err);
        else {
          console.log('Cleared Medication database...');
          cb(null);
        }
      });
    }
  });
}

const medications = [
  new Medication({
    metadata: {
      name: 'Drug A',
      dailyAmount: '40',
      unit: 'mg'
    },
    data: [
      {
        day: new DateOnly(),
        video: 'https://google.com',
        status: 'nottaken'
      }
    ]
  })
];

const userbase = [
  new User({
    name: 'Doctor A',
    email: 'doctora@test.com',
    hash: 'doctora',
    type: 'doctor',
  }),
  new User({
    name: 'Doctor B',
    email: 'doctorB@test.com',
    hash: 'doctorb',
    type: 'doctor',
  }),
  new User({
    name: 'Hannah Voelker',
    email: 'hannahvoelker13@gmail.com',
    hash: 'hannah',
    type: 'patient',
  }),
  new User({
    name: 'Alice Shi',
    email: 'alice@umd.edu',
    hash: 'alice',
    type: 'patient',
  }),
  new User({
    name: 'Colin King',
    email: 'colin.king.96@gmail.com',
    hash: 'colin',
    type: 'patient',
    medications: [medications[0]]
  }),
  new User({
    name: 'Sean Bae',
    email: 's@seanbae.net',
    hash: 'sean',
    type: 'patient',
  }),
];

function saveAll(objects, done) {
  let count = objects.length;
  const handleSave = (err) => {
    if (err) {
      done(err);
    } else {
      count -= 1;

      if (count === 0) {
        done(null, objects);
      }
    }
  };

  for (let i = 0; i < objects.length; i += 1) {
    const object = objects[i];
    object.save(handleSave);
  }
}

clearDatabase((err) => {
  if (err) console.err(err);
  else {
    saveAll(medications, (err) => {
      if (err) console.err(err);
      saveAll(userbase, (err2) => {
        if (err2) console.err(err2);
        console.log('Demo setup complete.');
        mongoose.connection.close();
      });
    });
  }
});
