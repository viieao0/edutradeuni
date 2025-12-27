const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const path = require('path');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

mongoose.connect('mongodb://localhost:27017/talentDB')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB error:', err));

const Talent = require('./models/talent');


app.get('/talents', async (req, res) => {
  const talents = await Talent.find();
  res.render('talents/index', { talents });
});

// Show form to make the new talent 
app.get('/talents/new', (req, res) => {
  res.render('talents/new');
});

app.post('/talents', async (req, res) => {
  const { course, description, hourlyRate } = req.body;
  await Talent.create({ course, description, hourlyRate });
  res.redirect('/talents');
});

app.get('/talents/:id', async (req, res) => {
  const talent = await Talent.findById(req.params.id);
  res.render('talents/show', { talent });
});

// Show edit for the talent
app.get('/talents/:id/edit', async (req, res) => {
  const talent = await Talent.findById(req.params.id);
  res.render('talents/edit', { talent });
});

// Update
app.put('/talents/:id', async (req, res) => {
  const { course, description, hourlyRate } = req.body;
  await Talent.findByIdAndUpdate(req.params.id, { course, description, hourlyRate });
  res.redirect(`/talents/${req.params.id}`);
});

// Deletee
app.delete('/talents/:id', async (req, res) => {
  await Talent.findByIdAndDelete(req.params.id);
  res.redirect('/talents');
});


app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
