const { v4: uuidv4 } = require("uuid");
const commonHelper = require("../helper/common.js");
const client = require("../config/redis.js");
const cloudinary = require("../middlewares/claudinary.js");
const {
  selectAll,
  select,
  countData,
  insert,
  update,
  deleteData,
  findId,
} = require("../models/product.js");

const productController = {
  getAllProducts: async (req, res) => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 5;
      const offset = (page - 1) * limit;
      const sortby = req.query.sortby || "name";
      const sort = req.query.sort ? req.query.sort.toUpperCase() : "ASC";
      const result = await selectAll({ limit, offset, sort, sortby });
      const {
        rows: [count],
      } = await countData();
      const totalData = parseInt(count.count);
      const totalPage = Math.ceil(totalData / limit);
      const pagination = {
        currentPage: page,
        limit: limit,
        totalData: totalData,
        totalPage: totalPage,
      };
      commonHelper.response(
        res,
        result.rows,
        200,
        "succeed get all products data ",
        pagination
      );
    } catch (error) {
      console.log(error);
      res.status(500).send("An error occurred while get all the products.");
    }
  },
  getProduct: async (req, res) => {
    try {
      const id = String(req.params.id);
      const cachedData = await client.get(`products/${id}`);
      if (cachedData) {
        return response(
          res,
          JSON.parse(cachedData),
          200,
          "Data retrieved from Redis cache"
        );
      }
      const result = await select(id);
      if (result.rows.length === 0) {
        return response(res, null, 404, "Product not found");
      }
      await client.set(`products/${id}`, JSON.stringify(result.rows));
      commonHelper.response(res, result.rows, 200, "Data retrieved from the database");
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send("An error occurred while fetching the specific product.");
    }
  },
  insertProduct: async (req, res) => {
    try {
      const { name, description, price, color, category } = req.body;
      const image = req.file.filename;
      // const { file } = req;
      // if (file && file.path) {
      //   const result = await cloudinary.uploader.upload(file.path);
      //   image = result.secure_url;
      // }
      const data = {
        id: uuidv4(),
        name,
        description,
        image: `http://localhost:8000/img/${image}`,
        price,
        color,
        category,
      };
      const result = await insert(data);
      commonHelper.response(res, result.rows, 201, "Product created");
    } catch (error) {
      console.log(error);
      res.status(500).send("An error occurred while create the product.");
    }
  },
  updateProduct: async (req, res) => {
    const id = String(req.params.id);
    const PORT = process.env.PORT || 8000;
    const DB_HOST = process.env.DB_HOST || "localhost";
    const image = req.body.filename;
    const { name, description, price, color, category } = req.body;
    try {
      const { rowCount } = await findId(id);
      if (!rowCount) {
        return commonHelper.response(res, null, 404, "Product not found");
      }

      const data = {
        name,
        description,
        image: `http://${DB_HOST}:${PORT}/img/${image}`,
        price,
        color,
        category,
      };
      
      const result = await update(data, id);
      commonHelper.response(
        res,
        result.rows,
        200,
        "Product updated successfully"
      );
    } catch (error) {
      console.log(error);
      res.status(500).send("An error occurred while update the product.");
    }
  },
  deleteProduct: async (req, res) => {
    const id = String(req.params.id);
    try {
      const deleteResult = await deleteData(id);

      if (deleteResult.rowCount === 0) {
        return commonHelper.response(res, null, 404, "Product not found");
      }

      commonHelper.response(res, null, 200, "Product deleted successfully");
    } catch (error) {
      console.log(error);
      res.status(500).send("An error occurred while get deleted the products.");
    }
  }
};

module.exports = productController;
