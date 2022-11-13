function check(req, res) {
    if (req.user) {
      res.json({ message: 'User Authenticated', user: req.user });
    } else {
      res.status(401).json({
        message: "User Not Authenticated",
        user: null
      });
    }
};

export default { check };
