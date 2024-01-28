import mongoose from "mongoose";

const columnSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    tasks: [
        {
            title: { type: String },
            description: { type: String },
            name: { type: String },
            owner: {
                // type: mongoose.Schema.Types.ObjectId,
                type: String,
                requried: true,
                ref: "User",
            },
        },
    ],
    createdAt: {
        type: Date,
        default: new Date(),
    },
});

const Column = mongoose.model("Column", columnSchema);
export default Column;
