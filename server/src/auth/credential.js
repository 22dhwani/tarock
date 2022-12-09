const checkAuthenticated = (req, res, next) => {
  if (process.env['ENV'] === 'DEV') {
    return next();
  }
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({
    message: "Unauthorized"
  });
}

export { checkAuthenticated };
