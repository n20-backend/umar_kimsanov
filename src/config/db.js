import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "todo",
    password: "1005",
    port: 5432, 
});

pool.connect((err) => {
    if (err) {
        console.error("Database:", err.message);
    } else {
        console.log("Connected");
    }
})

export default pool;