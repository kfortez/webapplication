const itemsModel = require('../models/itemsModel');

exports.getAllItems = async (req, res) => {
    const items = await itemsModel.getAll();
    res.json(items);
};

exports.addItem = async (req, res) => {
    const { name, description } = req.body;
    const newItem = await itemsModel.add({ name, description });
    res.status(201).json(newItem);
};

exports.updateItem = async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    const updatedItem = await itemsModel.update(id, { name, description });
    res.json(updatedItem);
};

exports.partialUpdateItem = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    const updatedItem = await itemsModel.partialUpdate(id, updates);
    res.json(updatedItem);
};

exports.deleteItem = async (req, res) => {
    const { id } = req.params;
    await itemsModel.delete(id);
    res.status(204).end();
};
