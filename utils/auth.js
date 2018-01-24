function requireLogin (req, res, next) {
    if (!req.user) {
      res.redirect('/auth');
    } else {
      next();
    }
  };

  
  module.exports = {
      requireLogin
  }