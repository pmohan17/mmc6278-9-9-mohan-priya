// admin login/logout
const router = require("express").Router();
const controllers = require("../controllers");
const checkAuth = require("../middleware/auth");

// admin login/logout
router.post("/login", controllers.auth.login);
router.get("/logout", controllers.auth.logout);
router.post("/signup", controllers.user.create);
router.post("/post", controllers.post.create);
router
.route('/post/:id')
.put(controllers.post.update)
.delete(controllers.post.remove)

module.exports = router;
