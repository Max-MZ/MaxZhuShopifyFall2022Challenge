import pg from "pg";
const { Pool } = pg;


export const pool = new Pool({
    connectionString : 'postgres://akjdwqbv:dFE0q1wupIlUNaAQUKWcqw_JihcaIyfB@drona.db.elephantsql.com/akjdwqbv'
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