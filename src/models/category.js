const pool = require('../config/db.js')

const selectAll = ({ limit, offset, sort, sortby }) => {
  const validColumns = ["id", "name"];
  if (!validColumns.includes(sortby)) {
    throw new Error(`Invalid column name: ${sortby}`);
  }
  const queryString = `SELECT * FROM category ORDER BY ${sortby} ${sort} LIMIT $1 OFFSET $2`;
  return pool.query(queryString, [limit, offset]);
};

const select = (id) => {
  return pool.query("SELECT * FROM category WHERE id = $1", [id]);
};

const insert = (data) => {
  const { id, name, image } = data;
  return pool.query(
    "INSERT INTO category (id, name, image) VALUES ($1, $2, $3)",
    [id, name, image]
  );
};

const update = (data, id) => {
  const { name, image } = data;
  return pool.query(
    "UPDATE category SET name = $1, image = $2 WHERE id = $3",
    [name, image, id]
  );
};

const countData = () => {
  return pool.query("SELECT COUNT(*) FROM category");
};

const findId = (id) => {
  return new Promise((resolve, reject) =>
    pool.query("SELECT id FROM category WHERE id = $1", [id], (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    })
  );
};

const deleteData = (id) => {
  return pool.query("DELETE FROM category WHERE id = $1", [id]);
};

module.exports = {
  selectAll,
  select,
  countData,
  insert,
  update,
  findId,
  deleteData
};
