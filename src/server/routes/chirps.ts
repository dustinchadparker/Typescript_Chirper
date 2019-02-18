const express = require("express");
const chirpsStore = require("../filestore");
let router = express.Router();


router.get("/:id?", (req, res) => {
  let id:number = req.params.id;
  if (id) {
    res.json(chirpsStore.getChirp(id));
  } else {
    res.send(chirpsStore.GetChirps());
  }
});

router.put("/:id?", (req, res) => {
  let id:number = req.params.id;
  chirpsStore.updateChirp(id, req.body);
  res.sendStatus(200);
});

router.delete("/:id?", (req, res) => {
  let id:number = req.params.id;
  if (id) {
    res.json(chirpsStore.DeleteChirp(id));
  } else {
    res.send(chirpsStore.GetChirps());
  }
});

router.post("/", (req, res) => {
  chirpsStore.CreateChirp(req.body);
  res.sendStatus(200);
});

module.exports = router;
