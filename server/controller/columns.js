import mongoose from "mongoose";

import Column from "../models/columns.js";

export const getColumn = async (req, resp) => {
    try {
        const columns = await Column.find({});
        resp.status(200).json(columns);
    } catch (error) {
        resp.status(404).json({ message: error.message });
    }
};

export const createColumn = async (req, resp) => {
    const column = req.body;
    // console.log(column);

    const newColumn = new Column({
        name: column.name,
        owner: req.user._id, // new
        createdAt: new Date().toISOString(),
    });

    try {
        await newColumn.save();
        resp.status(201).json(newColumn);
    } catch (error) {
        resp.status(409).json({ message: error.message });
    }
};
