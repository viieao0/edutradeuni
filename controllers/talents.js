const Talent = require('../models/talent');

//  all talents
exports.getAllTalents = async (req, res) => {
  const talents = await Talent.find().populate('student').lean();
  res.render('talents/index', { talents });
};

//  form to create new talent
exports.getNewTalentForm = (req, res) => {
  res.render('talents/new');
};

// Create 
exports.createTalent = async (req, res) => {
  const { course, description, hourlyRate } = req.body;
  await Talent.create({
    course,
    description,
    hourlyRate,
    student: req.session.userId
  });
  res.redirect('/talents');
};

// editt
exports.getEditTalentForm = async (req, res) => {
  const talent = await Talent.findById(req.params.id).lean();
  res.render('talents/edit', { talent });
};

// Update
exports.updateTalent = async (req, res) => {
  const { course, description, hourlyRate } = req.body;
  await Talent.findByIdAndUpdate(req.params.id, {
    course,
    description,
    hourlyRate
  });
  res.redirect('/talents');
};

// Deletee
exports.deleteTalent = async (req, res) => {
  await Talent.findByIdAndDelete(req.params.id);
  res.redirect('/talents');
};
