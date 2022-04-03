/** @format */

const authorize = (permittedRoles) => {
  return (req, res, next) => {
    //permittedRoles = [admin, editor]
    let isAllowed = false;
    if (req.user) {
      const user = req.user.user;

      for (let i = 0; i < user.roles.length; i++) {
        if (permittedRoles.includes(user.roles[i])) {
          isAllowed = true;
          break;
        }
      }
    } else {
      return res.status(401).send({ message: "Not Found" });
    }

    if (isAllowed == true) {
      return next();
    } else {
      return res.status(401).send({ message: "Not Authorized" });
    }
  };
};

module.exports = authorize;
