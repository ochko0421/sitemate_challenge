const { default: mongoose, Schema } = require("mongoose");

const issueSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            required: true,
            unique: true,
        },
        title: {
            type: String,
            required: true,

        },
        description: {
            type: String,
            required: true,
        },
    },
    { collection: "sitemate" }
);

const Issue = mongoose.model("user", issueSchema);

module.exports = Issue;