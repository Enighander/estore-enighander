const pool = require("../config/db.js");

const findEmail = async (email) => {
  try {
    const result = await pool.query("SELECT * FROM user WHERE email = $1", [
      email,
    ]);
    return result;
  } catch (error) {
    throw error;
  }
};

const create = async (data) => {
  const { username, email, passwordHash, role } = data;

  try {
    const result = await pool.query(
      "INSERT INTO product (username, email, passwordHash, role) VALUES($1, $2, $3, $4)",
      [username, email, passwordHash, role]
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
