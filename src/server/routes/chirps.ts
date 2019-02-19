import * as express from "express";
import * as chirpsStore from "../filestore";

let router = express.Router();

router.get("/:id?", (req, res) => {
  let id: number = req.params.id;
  if (id) {
    res.json(chirpsStore.GetChirp(id));
  } else {
    res.send(chirpsStore.GetChirps());
  }
});

router.put("/:id?", (req, res) => {
  let id: number = req.params.id;
  chirpsStore.UpdateChirp(id, req.body);
  res.sendStatus(200);
});

router.delete("/:id?", (req, res) => {
  let id: number = req.params.id;
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

export default router;
