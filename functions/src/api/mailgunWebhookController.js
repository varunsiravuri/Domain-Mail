const express = require('express');
const router = express.Router();

// This is your Mailgun Webhook endpoint
router.post('/incoming', async (req, res) => {
  const { From, To, Subject, 'body-plain': text, 'body-html': html } = req.body;

  console.log('Incoming Email:', { From, To, Subject });

  // TODO: In next step:
  // - Find user based on domain (To email)
  // - Store this email in Firestore under /users/{userId}/inbox/

  res.status(200).send('Email received');
});

module.exports = router;
