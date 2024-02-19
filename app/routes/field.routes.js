// const express = require("express");
// const fields = require("../controllers/field.controller");

// const router = express.Router();

// router.route("/")
//     .get(fields.findAll)
//     .post(fields.create);

// router.route("/:id")
//     .get(fields.findOne)
//     .patch(fields.update);
    

// module.exports = router;

const router = require("express").Router();
const fields = require("../controllers/field.controller");

router.route("/")
    .get(fields.getAllFields) //get all fields
    .post(fields.addField) //add a field
    .delete(fields.deleteAllField);

router.route("/:id")
    .get(fields.getAnField) // Lấy field bằng id
    .put(fields.updateField) //update field bằng id
    .delete(fields.deleteField);
//exports
module.exports = router;