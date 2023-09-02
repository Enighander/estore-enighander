const pool = require("../config/db.js");

const findEmail = async (email) => {
  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    return result;
  } catch (error) {
    throw error;
  }
};

const create = async (data) => {
  const {id, username, email, passwordHash, role } = data;
  try {
    const result = await pool.query(
      "INSERT INTO users (id, username, email, password, role) VALUES($1, $2, $3, $4, $5)",
      [id, username, email, passwordHash, role]
    );
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  findEmail,
  create
};
