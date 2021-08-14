module.exports = (err, req, res, next) => {
  let status = err.status || 500;
  let payload = {
    success: false,
    errors: err.errors || [],
  };

  res.status(status);
  res.json(payload);
};
