const express = require("express");
const Lead = require("../models/Lead");
const router = express.Router();
router.get("/", async (req, res) => {
    try {
        const leads = await Lead.find();
        res.json(leads);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.post("/", async (req, res) => {
    try {
        const lead = new Lead(req.body);
        const savedLead = await lead.save();

        res.status(201).json(savedLead);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
router.put("/:id", async (req, res) => {
    try {
        const updatedLead = await Lead.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(updatedLead);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
router.delete("/:id", async (req, res) => {
    try {
        await Lead.findByIdAndDelete(req.params.id);

        res.json({
            message: "Lead deleted successfully"
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
module.exports = router;