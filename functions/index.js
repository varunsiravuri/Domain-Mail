const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");

const app = express();

// Enable CORS for frontend to call APIs
app.use(cors());
app.use(express.json()); // Added comment

// Import your Controllers (APIs)
const domaincontroller = require("./src/api/domaincontroller");
const mailgunwebhookcontroller = require("./src/api/mailgunwebhookcontroller");


// Attach Routes
app.use("/api/domain", domaincontroller);
app.use("/api/mailgun", mailgunwebhookcontroller);

// Export as Firebase Cloud Function
exports.api = functions.https.onRequest(app);
