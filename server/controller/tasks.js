import mongoose from "mongoose";

import Task from "../models/tasks.js";
import Column from "../models/columns.js";

export const getTask = async (req, resp) => {
    // console.group(id);
    // console.log(req.user);
    try {
        const todo = await Column.find({
            name: "To Do",
        });
        const completed = await Column.find({
            name: "Completed",
        });
        const inProgress = await Column.find({
            name: "In Progress",
        });

        resp.status(200).json({
            todo: {
                name: "To Do",
                items: todo[0].tasks,
            },
            inProgress: {
                name: "In Progress",
                items: inProgress[0].tasks,
            },
            completed: {
                name: "Completed",
                items: completed[0].tasks,
            },
        });
    } catch (error) {
        resp.status(404).json({ message: error.message });
    }
};

// update position
export const changeTaskPosition = async (req, resp) => {
    const { name, title, description, position, owner } = req.body;

    const col = await Column.find({ name: name });
    // console.log("length", col[0].tasks.length); // 2
    // console.log("position", position); // 1

    /*
    https://docs.mongodb.com/manual/reference/operator/update/position/
     $position modifier specifies the location in the array at which the $push operator inserts elements. Without the $position modifier, the $push operator inserts elements to the end of the array.  
    */
    const newTask = await Column.updateOne(
        { name: name },
        {
            $push: {
                tasks: {
                    $each: [
                        {
                            title: title,
                            description: description,
                            name: name,
                            owner: owner,
                        },
                    ],
                    $position: position,
                },
            },
        }
    );
    try {
        // await newTask.save();
        resp.status(201).json(newTask);
    } catch (error) {
        resp.status(409).json({ message: error.message });
    }
};

// delete task
export const deleteTaskPosition = async (req, resp) => {
    const { name, _id } = req.body;
    // console.log(req.body);

    /* 
    https://docs.mongodb.com/manual/reference/operator/update/pull/
    The $pull operator removes from an existing ARRAY all instances of a value or values that match a specified condition.
    */
    const updatedTask = await Column.updateOne(
        { name: name },
        {
            $pull: {
                tasks: {
                    _id: _id,
                },
            },
        }
    );
    try {
        // await newTask.save();
        resp.status(201).json(updatedTask);
    } catch (error) {
        resp.status(409).json({ message: error.message });
    }
};

export const updateTask = async (req, resp) => {
    const task = req.body;

    // will find the matched element
    // const col = await Column.find(
    //     { name: task.name },
    //     // tasks: { _id: task._id },
    //     { tasks: { $elemMatch: { _id: task._id } } }
    // );

    // will find with matched id and update the description
    /* 
   { $set: { "grades.$[elem].mean" : 100 } },
   { arrayFilters: [ { "elem.grade": { $gte: 85 } } ] }
    */
    const newTask = await Column.updateOne(
        { name: task.name },
        { $set: { "tasks.$[element].description": task.description } },
        { arrayFilters: [{ "element._id": task._id }] }
    );
    // console.log("col", newTask);
    try {
        // await newTask.save();
        resp.status(201).json(newTask);
    } catch (error) {
        resp.status(409).json({ message: error.message });
    }
};

export const createTask = async (req, resp) => {
    const task = req.body;
    // console.log(req.user.name);

    // const colname = await Column.find({ name: task.column });
    // console.log(colname[0].name);

    const newTask = await Column.updateOne(
        { name: task.column },
        {
            $push: {
                tasks: {
                    title: task.title,
                    description: task.description,
                    name: task.column,
                    // owner: req.user._id,
                    owner: req.user.name,
                },
            },
        }
        // new
    );
    // console.log(newTask);

    // const newTask = new Task({
    //     tasks: task,
    //     column: colname[0]._id,
    //     // name: colname[0].name,
    //     createdAt: new Date().toISOString(),
    // });

    try {
        // await newTask.save();
        resp.status(201).json(newTask);
    } catch (error) {
        resp.status(409).json({ message: error.message });
    }
};
//
// export const createTask = async (req, resp) => {
//     const task = req.body;
//     console.log(task);

//     const colname = await Column.find({ name: task.column });
//     console.log(colname[0].name);

//     const newTask = new Task({
//         description: task.description,
//         column: colname[0]._id,
//         name: colname[0].name,
//         createdAt: new Date().toISOString(),
//     });

//     try {
//         await newTask.save();
//         resp.status(201).json(newTask);
//     } catch (error) {
//         resp.status(409).json({ message: error.message });
//     }
// };
