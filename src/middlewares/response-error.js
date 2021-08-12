module.exports = (err, req, res, next) => {
  let status = err.status || 500;
  let payload = {
    message: err.message || "Server Error",
    error: err.errors || [],
  };

  res.status = status;
  res.json(payload);
};
