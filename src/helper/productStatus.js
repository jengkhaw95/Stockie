const productStatus = (s) =>
  s === "oos" ? "Out of Stock" : s === "promotion" ? "Promotion" : "Available";

module.exports = productStatus;
