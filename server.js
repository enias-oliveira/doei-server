var cors = require('cors');
const jsonServer = require("json-server");
const auth = require("json-server-auth");

const app = jsonServer.create();
const router = jsonServer.router("db.json");
const port = process.env.PORT || 3001;

app.db = router.db;

const rules = auth.rewriter({
  "/users*": "/644/users$1",
  "/campaigns*" : "/644/campaigns$1",
    "/donations*" : "/640/donations$1",
  "/ngos" : "/644/users?ngo=true",
  "/ngos/:id" : "/644/users?ngo=true&id=:id"
});

app.use(cors());
app.use(rules);
app.use(auth);
app.use(router);
app.listen(port);

console.log("Server is running on port:", port);
