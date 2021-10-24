const {
    createUser,
    login,
    profile
  } = require("./register.controller");
  const{checkToken}=require("../../auth/token_vaildation");
const router=require("express").Router();
router.post("/",  createUser);
router.post("/login", login);
router.post("/profilepage", checkToken, profile);

module.exports=router; 