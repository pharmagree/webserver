const express = require('express');

const router = express.Router();

router.index = (req, res) => {
  res.redirect((req.user.type === 'patient' ? '/medications' : '/patients'));
};

router.login = (req, res) => {
  let sub = {};
  if (req.session.submission) {
    sub = req.session.submission;
    req.session.submission = null;
  }

  res.render('login', {
    title: 'Login',
    messages: req.flash('loginFlash'),
    hideNav: true,
    submission: sub,
  });
};

router.patients = (req, res) => {
  res.render('patients', {
    title: 'Patients',
    messages: req.flash('patientsFlash'),
    hideNav: false,
  });
};

router.medications = (req, res) => {
  res.render('medications', {
    title: 'Medications',
    messages: req.flash('medicationsFlash'),
    hideNav: false,
  });
};

module.exports = router;
