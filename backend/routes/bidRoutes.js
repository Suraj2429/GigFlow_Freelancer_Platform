const express = require("express");
const Bid = require("../models/Bid");
const Gig = require("../models/Gig");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", auth, async (req, res) => {
  const bid = await Bid.create({
    ...req.body,
    freelancerId: req.user.userId
  });
  res.json(bid);
});

router.get("/:gigId", auth, async (req, res) => {
  const bids = await Bid.find({ gigId: req.params.gigId });
  res.json(bids);
});

router.patch("/:bidId/hire", auth, async (req, res) => {
  const bid = await Bid.findById(req.params.bidId);
  await Gig.findByIdAndUpdate(bid.gigId, { status: "assigned" });
  await Bid.updateMany({ gigId: bid.gigId }, { status: "rejected" });
  bid.status = "hired";
  await bid.save();
  res.json({ message: "Freelancer hired" });
});

module.exports = router;
