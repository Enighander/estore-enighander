const pool = require("../config/db.js");

const selectAll = async ({ limit, offset, sort, sortby }) => {
  const validColumns = [
    "id",
    "user_id",
    "order_color",
    "quantity",
    "total_price",
    "product_id",
    "address_id",
  ];

  if (!validColumns.includes(sortby)) {
    throw new Error(`Invalid column name: ${sortby}`);
  }

  const queryString = `
      SELECT o.*, p.name, p.image, p.price
      FROM "orders" AS o
      LEFT JOIN product AS p ON o.product_id = p.name
      ORDER BY ${sortby} ${sort} LIMIT $1 OFFSET $2
    `;

  try {
    const result = await pool.query(queryString, [limit, offset]);
    return result;
  } catch (error) {
    throw error;
  }
};

const selectOrderById = async (user_id) => {
  try {
    const result = await pool.query(
      `SELECT o.*, p.name AS product_name, p.image AS product_image, p.price AS product_price,
      a.recipient_name, a.phone, a.address_as, a.address, a.city, a.postal_code 
      FROM "orders" AS o
      LEFT JOIN "product" AS p ON o.product_id = p.name
      LEFT JOIN "address" AS a ON o.address_id = a.address
      WHERE o.user_id = $1`,
      [user_id]
    );
    return result;
  } catch (error) {
    throw error;
  }
};

const selectOrderUser = async (user_id, status_order) => {
  try {
    const result = await pool.query(
      `SELECT o.*, p.name AS product_name, p.image AS product_image, p.price AS product_price
      FROM "orders" AS o
      LEFT JOIN "product" AS p ON o.product_id = p.name
      WHERE o.user_id = $1 AND o.status_orders = $2`,
      [user_id, status_order]
    );
    return result;
  } catch (error) {
    throw error;
  }
};

const insertOrder = async (data) => {
  const { id, user_id, order_color, product_id, quantity } = data;
  try {
    const result = await pool.query(
      "INSERT INTO orders (id, user_id, order_color, product_id, quantity) VALUES($1, $2, $3, $4, $5)",
      [id, user_id, order_color, product_id, quantity]
    );
    return result;
  } catch (error) {
    throw error;
  }
};

const updateOrder = async (data) => {
  const newStatus = "get paid";
  const { id, address_id } = data;
  try {
    const result = await pool.query(
      "UPDATE orders SET address_id = $1, status_orders = $2 WHERE id = $3",
      [address_id, newStatus, id]
    );
    return result;
  } catch (error) {
    throw error;
  }
};

const updateGetPaidStatus = async (data) => {
  const newStatus = "get paid";
  const { id } = data;
  try {
    const result = await pool.query(
      "UPDATE orders SET status_orders = $1 WHERE id = $2",
      [newStatus, id]
    );
    return result;
  } catch (error) {
    throw error;
  }
};

const updateProceedStatus = async (data) => {
  const newStatus = "Processed";
  const { id } = data;
  try {
    const result = await pool.query(
      "UPDATE orders SET status_orders = $1 WHERE id =$2",
      [newStatus, id]
    );
    return result;
  } catch (error) {
    throw error;
  }
};

const updateSendingStatus = async (data) => {
  const newStatus = "Sent";
  const { id } = data;
  try {
    const result = await pool.query(
      "UPDATE orders SET status_orders = $1 WHERE id =$2",
      [newStatus, id]
    );
    return result;
  } catch (error) {
    throw error;
  }
};

const updateCompletedStatus = async (data) => {
  const newStatus = "Complete";
  const { id } = data;
  try {
    const result = await pool.query(
      "UPDATE orders SET status_orders = $1 WHERE id =$2",
      [newStatus, id]
    );
    return result;
  } catch (error) {
    throw error;
  }
};

const updateCanceledStatus = async (data) => {
  const newStatus = "Cancel";
  const { id } = data;
  try {
    const result = await pool.query(
      "UPDATE orders SET status_orders = $1 WHERE id =$2",
      [newStatus, id]
    );
    return result;
  } catch (error) {
    throw error;
  }
};

const countData = async () => {
  try {
    const result = await pool.query("SELECT COUNT(*) FROM orders");
    return result;
  } catch (error) {
    throw error;
  }
};

const findUUID = async (id) => {
  try {
    const result = await pool.query("SELECT * FROM orders WHERE id = $1", [id]);
    return result;
  } catch (error) {
    throw error;
  }
};

const findUserId = async (user_id) => {
  try {
    const result = await pool.query("SELECT * FROM orders WHERE user_id = $1", [
      user_id,
    ]);
    return result;
  } catch (error) {
    throw error;
  }
};

const deleteOrder = async (id) => {
  try {
    const result = await pool.query("DELETE FROM orders WHERE id = $1", [id]);
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  selectAll,
  selectOrderById,
  selectOrderUser,
  insertOrder,
  updateOrder,
  updateGetPaidStatus,
  updateProceedStatus,
  updateSendingStatus,
  updateCompletedStatus,
  updateCanceledStatus,
  countData,
  findUUID,
  findUserId,
  deleteOrder,
};
