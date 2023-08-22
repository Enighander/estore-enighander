const pool = require('../config/db.js');
// --------------------------------------------------------------------------------------//
// The error you're encountering is likely due to the fact that you're using placeholders 
// for column names ($1 and $2) in the ORDER BY clause of your SQL query.

// const selectAll = ({ limit, offset, sort, sortby }) => {
//   return pool.query(
//     "SELECT * FROM product ORDER BY $1, $2 LIMIT $3 OFFSET $4",
//     [limit, offset, sort, sortby]
//   );
// };

// --------------------------------------------------------------------------------------//
// const selectAll = ({ limit, offset, sort, sortby }) => {
//   return pool.query(
//     `SELECT * FROM product ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`
//   );
// };
// --------------------------------------------------------------------------------------//

const selectAll = ({ limit, offset, sort, sortby }) => {
  const validColumns = ['name', 'description', 'image', 'price', 'color', 'category'];
  if (!validColumns.includes(sortby)) {
    throw new Error(`Invalid column name: ${sortby}`);
  }
  const queryString = `SELECT * FROM product ORDER BY ${sortby} ${sort} LIMIT $1 OFFSET $2`;
  return pool.query(queryString, [limit, offset]);
};

const select = (id) => {
  return pool.query("SELECT * FROM product WHERE id = $1", [id]);
};

const insert = (data) => {
  const { name, description, image, price, color, category } = data;
  return pool.query(
    "INSERT INTO product (name, description, image, price, color, category) VALUES($1, $2, $3, $4, $5, $6)",
    [name, description, image, price, color, category]
  );
};

const update = (data, id) => {
  const { name, description, image, price, color, category } = data;
  return pool.query(
    "UPDATE product SET name = $1, description = $2, image = $3, price = $4, color = $5, category = $6 WHERE id = $7",
    [name, description, image, price, color, category, id]
  );
};

const countData = () => {
  return pool.query("SELECT COUNT(*) FROM product");
};

const findId = (id) => {
  return new Promise((resolve, reject) =>
    pool.query("SELECT id FROM product WHERE id = $1", [id], (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    })
  );
};

const deleteData = (id) => {
  return pool.query("DELETE FROM product WHERE id = $1", [id]);
};

module.exports = {
  selectAll,
  select,
  insert,
  update,
  deleteData,
  countData,
  findId,
};
