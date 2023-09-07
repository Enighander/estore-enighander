const client = require("../config/redis.js");
const { response } = require("../helper/common.js");

const hitCacheProductDetail = async (req, res, next) => {
  try {
    const idProduct = req.params.id;
    const product = await client.get(`products/${idProduct}`);
    if (product) {
      return response(
        res,
        JSON.parse(product),
        200,
        "Data retrieved from Redis cache"
      );
    }

    next();
  } catch (error) {
    console.error("Error fetching data from Redis:", error);
    next(error);
  }
};

const clearCacheProductDetail = (req, res, next) => {
  const idProduct = req.params.id;
  client.del(`products/${idProduct}`);
  next();
};

module.exports = {
  hitCacheProductDetail,
  clearCacheProductDetail,
};
