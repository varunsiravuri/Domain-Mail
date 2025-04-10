const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");

const app = express();

// Enable CORS
app.use(cors());
app.use(express.json());

// Import routes
const domainController = require("./src/api/domainController");
const mailgunWebhookController = require("./src/api/mailgunWebhookController");

// Use routes
app.use("/api/domain", domainController);
app.use("/api/mailgun", mailgunWebhookController);

// Export as Firebase Function
exports.api = functions.https.onRequest(app);
