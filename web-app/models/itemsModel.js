const sqlite3 = require('../../modules/sqlite3/lib/sqlite3').verbose();
const db = new sqlite3.Database('./db/database.db');

// Get all items
exports.getAll = () => {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM items', [], (err, rows) => {
            if (err) reject(err);
            resolve(rows);
        });
    });
};

// Add an item
exports.add = ({ name, description }) => {
    return new Promise((resolve, reject) => {
        db.run(
            'INSERT INTO items (name, description) VALUES (?, ?)',
            [name, description],
            function (err) {
                if (err) reject(err);
                resolve({ id: this.lastID, name, description });
            }
        );
    });
};

// Update an item
exports.update = (id, { name, description }) => {
    return new Promise((resolve, reject) => {
        db.run(
            'UPDATE items SET name = ?, description = ? WHERE id = ?',
            [name, description, id],
            function (err) {
                if (err) reject(err);
                resolve({ id, name, description });
            }
        );
    });
};

// Partially update an item
exports.partialUpdate = (id, updates) => {
    const fields = Object.keys(updates).map(key => `${key} = ?`).join(', ');
    const values = [...Object.values(updates), id];
    return new Promise((resolve, reject) => {
        db.run(`UPDATE items SET ${fields} WHERE id = ?`, values, function (err) {
            if (err) reject(err);
            resolve({ id, ...updates });
        });
    });
};

// Delete an item
exports.delete = (id) => {
    return new Promise((resolve, reject) => {
        db.run('DELETE FROM items WHERE id = ?', [id], (err) => {
            if (err) reject(err);
            resolve();
        });
    });
};
