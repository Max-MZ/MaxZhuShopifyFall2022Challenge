import pg from "pg";
const { Pool } = pg;

export const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'backend',
    password: 'shopifypostgres',
    dialect: 'postgres',
    port: 5432
});

export const connectDatabase = async() =>{
        pool.connect((err, client, release) => {
        if (err) {
            return console.error(
                'Error acquiring client', err.stack)
        }
        client.query('SELECT NOW()', (err, result) => {
            release()
            if (err) {
                return console.error(
                    'Error executing query', err.stack)
            }
            console.log("Connected to Database !")
        })
    })

}