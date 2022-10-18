const db = require("../models");
const config = require("../config/auth.config");

const User = db.user;
var jwt = require("jsonwebtoken");

exports.fetchUser = (req, res) => {
    User.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(user => {
        var token = jwt.sign({ id: user.id }, config.secret, {
          expiresIn: 86400 // 24 hours
        });
    
        var authorities = [];
        user.getRoles().then(roles => {
          for (let i = 0; i < roles.length; i++) {
            authorities.push("ROLE_" + roles[i].name.toUpperCase());
          }
          res.status(200).send({
            id: user.id,
            username: user.username,
            email: user.email,
            balance: user.balance,
            roles: authorities,
            accessToken: token
          });
        });
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };