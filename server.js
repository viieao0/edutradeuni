const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const path = require('path');

const app = express();

// ====== Middleware ======
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ====== Connect to MongoDB ======
mongoose.connect('mongodb://localhost:27017/talentDB')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB error:', err));

// ====== Talent Model ======
const Talent = require('./models/talent');

// ====== CRUD Routes ======

// Show all talents
app.get('/talents', async (req, res) => {
  const talents = await Talent.find();
  res.render('talents/index', { talents });
});

// Show form to create new talent
// ⚠️ This route must come BEFORE /talents/:id to avoid conflict
app.get('/talents/new', (req, res) => {
  res.render('talents/new');
});

// Create new talent
app.post('/talents', async (req, res) => {
  const { course, description, hourlyRate } = req.body;
  await Talent.create({ course, description, hourlyRate });
  res.redirect('/talents');
});

// Show one talent
app.get('/talents/:id', async (req, res) => {
  const talent = await Talent.findById(req.params.id);
  res.render('talents/show', { talent });
});

// Show edit form
app.get('/talents/:id/edit', async (req, res) => {
  const talent = await Talent.findById(req.params.id);
  res.render('talents/edit', { talent });
});

// Update talent
app.put('/talents/:id', async (req, res) => {
  const { course, description, hourlyRate } = req.body;
  await Talent.findByIdAndUpdate(req.params.id, { course, description, hourlyRate });
  res.redirect(`/talents/${req.params.id}`);
});

// Delete talent
app.delete('/talents/:id', async (req, res) => {
  await Talent.findByIdAndDelete(req.params.id);
  res.redirect('/talents');
});

// ====== Start Server ======
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
