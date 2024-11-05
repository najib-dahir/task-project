const { IncomingForm } = require('formidable');
const { readTasksFromFile, writeTasksToFile } = require("../utils/fileHandler");
const { copyFileSync } = require('fs');
const path = require('path');

// Get all tasks
exports.getTasks = (req, res) => {
    const tasks = readTasksFromFile();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(tasks));
};

// Create a new task
exports.createTask = (req, res) => {
    const form = new IncomingForm();
    form.parse(req, (err, fields, files) => {
        if (err) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Error parsing form' }));
            return;
        }

        const tasks = readTasksFromFile();
        const image = files.image ? files.image : null;

        const newTask = {
            id: Date.now(),
            title: fields.title,
            description: fields.description || '',
            status: fields.status || 'pending',
            image: image ? `/uploads/${image.originalFilename}` : null,
        };

        tasks.push(newTask);
        writeTasksToFile(tasks);

        if (image) {
            const uploadPath = path.join(__dirname, '../uploads', image.originalFilename);
            copyFileSync(image.filepath, uploadPath);
        }

        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(newTask));
    });
};

// Update an existing task
exports.updateTask = (req, res) => {
    res.writeHead(501, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'UpdateTask not implemented yet' }));
};

// Delete a task
exports.deleteTask = (req, res) => {
    res.writeHead(501, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'DeleteTask not implemented yet' }));
};
