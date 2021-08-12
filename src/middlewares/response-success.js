module.exports = (req, res, next) => {
  let status = res.locals.status || 200;
  let payload = {
    data: res.locals.data || {},
    message: res.locals.message || "Successful Operation",
  };

  res.status = status;
  res.json(payload);
};
