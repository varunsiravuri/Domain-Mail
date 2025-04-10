const express = require("express");
const router = new express.Router();
const mailgunService = require("../utils/mailgunService");
const admin = require("firebase-admin");

// Initialize Firestore
if (!admin.apps.length) {
  admin.initializeApp();
}

const db = admin.firestore();

// POST /api/domain/add
router.post("/add", async (req, res) => {
  const {domain, userId} = req.body;

  if (!domain || !userId) {
    return res.status(400).json({error: "domain and userId are required"});
  }

  try {
    // Step 1: Call Mailgun API to Add Domain
    const result = await mailgunService.addDomain(domain);

    // Step 2: Save Domain Info in Firestore
    await db.collection("emailDomains").add({
      userId: userId,
      domain: domain,
      status: "pending", // until verified
      dnsRecords: result.domain.receiving_dns_records, // SPF, DKIM, MX Records
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.status(200).json(result);
  } catch (err) {
    console.error("Error adding domain:", err);
    res.status(500).json({error: err.message});
  }
});

module.exports = router;
