const Feedback = require("../models/Feedback");

// १. नवीन फीडबॅक ॲड करणे (युझरसाठी)
exports.addFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.create(req.body);
    res.json({ msg: "Feedback Sent!", feedback });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// २. सर्व फीडबॅक बघणे (ॲडमिनसाठी)
exports.getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.findAll({ order: [['createdAt', 'DESC']] });
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ३. फीडबॅक Accept करणे (ॲडमिनसाठी)
exports.acceptFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const feedback = await Feedback.findOne({ where: { id } });

    if (!feedback) {
      return res.status(404).json({ msg: "Feedback not found" });
    }

    feedback.status = "accepted"; // स्टेटस बदलून accepted करणे
    await feedback.save();

    res.json({ msg: "Feedback Accepted Successfully! ✅" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};