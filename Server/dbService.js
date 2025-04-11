const mysql = require('mysql');
const dotenv = require('dotenv');
let instance = null;
dotenv.config();

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
});

connection.connect((err) => {
    if (err) {
        console.log(err.message);
    }
});

class DbService {
    static getDbServiceInstance() {
        return instance ? instance : new DbService();
    }

    async loadForkInfo(ID) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM forklifts Where ID = ?;"

                connection.query(query, [ID], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            })

            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async insertForklift(id) {
        try {
            const stationName = await new Promise((resolve, reject) => {
                const query = "INSERT INTO forklifts (ID) VALUES (?);";

                connection.query(query, [id], (err, result) => {
                    if (err) reject(new Error(err.message))
                    else {
                        //resolve(result.insertId);
                        resolve(result);
                    }
                })
            })
            return {
                ID: id,
            }
        } catch (error) {
            console.log(error);
        }
    }

    async updateID(idNew, idOld) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE forklifts SET ID = ? WHERE ID = ?;";

                connection.query(query, [idNew, idOld], (err, result) => {
                    if (err) reject(new Error(err.message))
                    else {
                        resolve(result.affectedRows);
                    }
                })
            })

            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async updateName(newName, ID) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE forklifts SET Name = ? WHERE ID = ?;";

                connection.query(query, [newName, ID], (err, result) => {
                    if (err) reject(new Error(err.message))
                    else {
                        resolve(result.affectedRows);
                    }
                })
            })

            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async updateStatus(status, forkName) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE forklifts SET Status = ? WHERE ID = ?;";

                connection.query(query, [status, forkName], (err, result) => {
                    if (err) reject(new Error(err.message))
                    else {
                        resolve(result.affectedRows);
                    }
                })
            })

            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async updateLat(newLat, ID) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE forklifts SET lat = ? WHERE ID = ?;";

                connection.query(query, [newLat, ID], (err, result) => {
                    if (err) reject(new Error(err.message))
                    else {
                        resolve(result.affectedRows);
                    }
                })
            })

            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async updateLng(newLng, ID) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE forklifts SET lng = ? WHERE ID = ?;";

                connection.query(query, [newLng, ID], (err, result) => {
                    if (err) reject(new Error(err.message))
                    else {
                        resolve(result.affectedRows);
                    }
                })
            })

            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async deleteForklift(id) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "DELETE FROM forklifts WHERE ID = ?;";

                connection.query(query, [id], (err, result) => {
                    if (err) reject(new Error(err.message))
                    else {
                        resolve(result.affectedRows);
                    }
                })
            })

            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async loadAllData() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM forklifts;"

                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            })

            return response;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = DbService;