const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

module.exports = (db) => {

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
                        let user_name = response.rows[0].name;
                        let user_id = response.rows[0].id;
                        let user_email = response.rows[0].email;
                        req.session["user_name"] = user_name;
                        req.session["user_id"] = user_id;
                        req.session["user_email"] = user_email;
                        console.log(req.session)
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
