module.exports = function (app, db) {

    app.post('/api/login', (req, res) => {
        let data = req.body;
        let email = data.email;
        let password = data.password;

        let user = findUser(email);
        if (user !== undefined) {
            if (password === user.password) {
                delete user.password;
                req.session.user = user;
                res.json(user)
            } else
                res.status(401).json({ "status": "user not found" })
        } else
            res.status(401).json({ "status": "user not found" });
    });

    app.get('/api/login', (req, res) => {
        console.log(req.session.user)
        res.json(req.session.user || { _error: "Not logged in" });
    });

    app.post('/api/register', (req, res) => {
        let data = req.body;
        let email = data.email;
        let password = data.password;

        let user = findUser(email);
        if (user === undefined) {
            let stmt = db.prepare(`
                INSERT INTO User ('email', 'password', 'isAdmin')
                VALUES ('${email}', '${password}', false);
            `);
            let result = stmt.run();
            if (result.changes >= 1)
                res.status(200)
        } else {
            res.status(409).json({ "operation": "User already exists" })
        }
    });

    app.delete('/api/login', (req, res) => {
        delete req.session.user;
        res.json({ success: 'logged out' })
    })

    function findUser(email) {
        return db.prepare('SELECT * FROM USER WHERE email = ?').get(email);
    }
}
