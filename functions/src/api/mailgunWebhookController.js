const express = require("express");
const router = new express.Router();
const admin = require("firebase-admin");

// Initialize Firestore
if (!admin.apps.length) {
  admin.initializeApp();
}

const db = admin.firestore();

router.post("/incoming", async (req, res) => {
  const {From, To, Subject, "body-plain": text, "body-html": html} = req.body;

  console.log("Incoming Email:", {From, To, Subject});

  try {
    const domain = To.split("@")[1];


    const domainSnap = await db.collection("emailDomains")
        .where("domain", "==", domain)
        .limit(1)
        .get();

    if (domainSnap.empty) {
      console.log("Domain not found:", domain);
      return res.status(404).send("Domain not registered");
    }

    const domainData = domainSnap.docs[0].data();
    const userId = domainData.userId;


    await db.collection("users").doc(userId)
        .collection("inbox").add({
          from: From,
          to: To,
          subject: Subject,
          text: text || "",
          html: html || "",
          domain: domain,
          receivedAt: admin.firestore.FieldValue.serverTimestamp(),
        });

    res.status(200).send("Email stored successfully");
  } catch (error) {
    console.error("Error storing incoming email:", error);
    res.status(500).send("Error storing email");
  }
});

module.exports = router;
