const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");

const app = express();

// Enable CORS for frontend to call APIs
app.use(cors());
app.use(express.json()); // Added comment

// Import your Controllers (APIs)
const domainController = require("./src/api/domainController");
const mailgunWebhookController = require("./src/api/mailGunWebhookController");

// Attach Routes
app.use("/api/domain", domainController);
app.use("/api/mailgun", mailgunWebhookController);

// Export as Firebase Cloud Function
exports.api = functions.https.onRequest(app);
