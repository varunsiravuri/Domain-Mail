const express = require('express');
const router = express.Router();
const mailgunService = require('../utils/mailgunService');

// POST /api/domain/add
router.post('/add', async (req, res) => {
  const { domain, userId } = req.body;

  if (!domain || !userId) {
    return res.status(400).json({ error: 'domain and userId are required' });
  }

  try {
    const result = await mailgunService.addDomain(domain);

    // TODO: Save domain data in Firestore (we will do this in next step)

    res.status(200).json(result);
  } catch (err) {
    console.error('Error adding domain:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
