//this is filehander
const fs = require('fs');
const path = require('path');


const filePath = path.join(__dirname, '../data/tasks.json');


exports.writeTasksToFile = (data) => {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2)); 
        return data;
    } catch (error) {
        console.error('Error writing to file:', error);
        throw error; 
    }
};


exports.readTasksFromFile = () => {
   
    if (!fs.existsSync(filePath)) {
        exports.writeTasksToFile([]);  
    }
    
    try {
        const data = fs.readFileSync(filePath, 'utf8');  
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading from file:', error);
        throw error;  
    }
};