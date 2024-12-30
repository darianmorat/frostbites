import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
   user: 'darianmorat',
   password: '2004',
   database: 'frostbites',
   host: 'localhost',
   port: 5432,
});

export default pool
