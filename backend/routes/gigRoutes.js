const express = require("express");
const Gig = require("../models/Gig");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", async (req, res) => {
  const gigs = await Gig.find({ status: "open" });
  res.json(gigs);
});

router.post("/", auth, async (req, res) => {
  const gig = await Gig.create({
    ...req.body,
    ownerId: req.user.userId
  });
  res.json(gig);
});

module.exports = router;
