const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

module.exports = (db) => {

    router.get('/', (req, res) => {
        res.render("login-form");
     });

    router.post("/", (req, res) => {
        let email = req.body.email;
        let password = req.body.password;
        return db.query(`
      SELECT id, name, email, password
      FROM users
      WHERE email = $1
    `, [email])
            .then(response => {
                console.log(response.rows)
                if (response.rows[0]) {
                    console.log("abc");
                    if (bcrypt.compareSync(password, response.rows[0].password)) {
                        console.log("def");
                        let userName = response.rows[0].name;
                        let userID = response.rows[0].id;
                        let userEmail = response.rows[0].email;
                        req.session["userName"] = userName;
                        req.session["userID"] = userID;
                        req.session["userEmail"] = userEmail;
                        return res.redirect("/");
                    } else {
                      return res.redirect("/login");
                    }
                } else {
                 return res.redirect("/login");
                }
            })
            .catch(e => {
            res.send(e);
         });
    });
    return router;
};
