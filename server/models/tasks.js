import mongoose from "mongoose";

// const taskSchema = mongoose.Schema({
//     column: {
//         type: mongoose.Schema.Types.ObjectId,
//         required: true,
//         ref: "Column",
//     },
//     name: {
//         type: String,
//         required: true,
//     },
//     description: {
//         type: String,
//         required: true,
//     },
//     createdAt: {
//         type: Date,
//         default: new Date(),
//     },
// });

// const Task = mongoose.model("Task", taskSchema);
// export default Task;

const taskSchema = mongoose.Schema({
    // user: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     ref: "User",
    // },
    column: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Column",
    },
    tasks: [
        {
            description: { type: String, required: true },
        },
    ],
    // description: {
    //     type: String,
    //     required: true,
    // },
    createdAt: {
        type: Date,
        default: new Date(),
    },
});

const Task = mongoose.model("Task", taskSchema);

export default Task;
