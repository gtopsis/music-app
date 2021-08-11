module.exports = (err, req, res, next) => {
  let status = err.status || 500;
  let payload = {
    message: err.message || "Server Error",
  };

  res.status = status;
  res.json({
    error: payload,
  });
};
