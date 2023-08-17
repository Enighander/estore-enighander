const commonHelper = require("../helper/common.js");
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
    }
  },
  getProduct: async (req, res) => {
    const id = Number(req.params.id);
    try {
      const result = await select(id);
      if (result.rows.length === 0) {
        return commonHelper.response(res, null, 404, "Product not found");
      }
      commonHelper.response(
        res,
        result.rows,
        200,
        "get data success from database"
      );
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  },
  insertProduct: async (req, res) => {
    const { name, description, image, price, color, category } = req.body;
    const {
      rows: [count],
    } = await countData();
    const id = Number(count.count) + 1;

    const data = {
      id,
      name,
      description,
      image,
      price,
      color,
      category,
    };
    insert(data)
      .then((result) =>
        commonHelper.response(res, result.rows, 201, "Product created")
      )
      .catch((err) => res.send(err));
  },
  updateProduct: async (req, res) => {
    const id = Number(req.params.id);
    const { name, description, image, price, color, category } = req.body;

    try {
      const { rowCount } = await findId(id);

      if (!rowCount) {
        return commonHelper.response(res, null, 404, "Product not found");
      }

      const data = {
        name,
        description,
        image,
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
      res.status(500).send("Internal Server Error");
    }
  },
  deleteProduct: async (req, res) => {
    const id = Number(req.params.id);
    try {
      const deleteResult = await deleteData(id);
  
      if (deleteResult.rowCount === 0) {
        return commonHelper.response(res, null, 404, "Product not found");
      }
  
      commonHelper.response(res, null, 200, "Product deleted successfully");
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  }
};

module.exports = productController;
