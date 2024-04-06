// Require SQLite3 verbose module
const sqlite3 = require("sqlite3").verbose();

// Connect to SQLite database, and if it doesn't exist, create it
const db = new sqlite3.Database(
    "./substitutions.db",
    sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
    (err) => {
        // Error handling for connection
        if (err) {
            return console.error(err.message);
        } else {
            // Success message for successful connection
            console.log("Connected to the SQLite database.");
        }
    }
);

// Serialize runs to ensure sequential execution
db.serialize(() => {
    // Run SQL command to create table if it doesn't exist
    db.run(
        `CREATE TABLE IF NOT EXISTS substitutions (
            id INTEGER PRIMARY KEY,
            date TEXT,
            hour TEXT,
            missing TEXT,
            squad TEXT,
            subject TEXT,
            room TEXT,
            substitute TEXT
        )`,
        (err) => {
            // Error handling for table creation
            if (err) {
                return console.error(err.message);
            }
            console.log("Created substitutions table");

            // Run SQL command to delete items in substitutions table
            db.run(`DELETE FROM substitutions`, (err) => {
                // Error handling for deletion
                if (err) {
                    return console.error(err.message);
                }
                console.log("Deleted items in substitutions table");

                // // Sample values for insertion
                // const value1 = ["Buy groceries"];
                // const value2 = ["Walk Sam"];
                // const value3 = ["Fold laundry"];
                // const value4 = ["Workout"];

                // // SQL command for insertion
                // const insertSql = `INSERT INTO todo (task) VALUES (?)`;

                // Execute insert commands for each value
                // db.run(insertSql, value1, (err) => {
                //     if (err) {
                //         return console.error(err.message);
                //     }
                //     const id = this.lastID;
                //     console.log(`Added todo item with id ${id}`);
                // });

                // db.run(insertSql, value2, (err) => {
                //     if (err) {
                //         return console.error(err.message);
                //     }
                //     const id = this.lastID;
                //     console.log(`Added todo item with id ${id}`);
                // });
                // db.run(insertSql, value3, (err) => {
                //     if (err) {
                //         return console.error(err.message);
                //     }
                //     const id = this.lastID;
                //     console.log(`Added todo item with id ${id}`);
                // });
                // db.run(insertSql, value4, (err) => {
                //     if (err) {
                //         return console.error(err.message);
                //     }
                //     const id = this.lastID;
                //     console.log(`Added todo item with id ${id}`);
                // });

                // Close the database connection
                db.close((err) => {
                    if (err) {
                        return console.error(err.message);
                    }
                    console.log("Closed the database connection.");
                });
            });
        }
    );
});