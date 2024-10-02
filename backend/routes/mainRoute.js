const express = require('express');
const Issue = require("../models/mainModel");
const router = express.Router();

router.post('/', async (req, res) => {
    const { id, title, description } = req.body;

    try {
        const newIssue = new Issue({ id, title, description });
        const savedIssue = await newIssue.save();
        res.status(201).json(savedIssue);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.get('/', async (req, res) => {
    try {
        const issue = await Issue.find();
        res.json(issue);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const issue = await Issue.findOne({ id: req.params.id });
        if (!issue) return res.status(404).json({ message: 'Issue not found' });
        res.status(200).json(issue);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { title, description } = req.body;
        const updatedIssue = await Issue.findOneAndUpdate(
            { id: req.params.id },
            { title, description },
            { new: true }
        );

        if (!updatedIssue) return res.status(404).json({ message: 'Issue not found' });
        res.status(200).json(updatedIssue);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const deletedIssue = await Issue.findOneAndDelete({ id: req.params.id });
        if (!deletedIssue) return res.status(404).json({ message: 'Issue not found' });
        res.status(200).json({ message: 'Issue deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
