import * as express from "express";
import * as Chirps from "../../filestore";

const router = express.Router();

router.get("/:id?", (req, res, next) => {
  let id = req.params.id;

  if (id) {
    res.send(Chirps.GetChirp(id));
  } else {
    res.send(Chirps.GetChirps());
  }
});

router.post("/", (req, res, next) => {
  let chirp = req.body;
  Chirps.CreateChirp(chirp);
  res.sendStatus(200);
});

router.put("/:id", (req, res, next) => {
  let id = req.params.id;
  let chirp = req.body;

  Chirps.UpdateChirp(id, chirp);
  res.sendStatus(200);
});

router.delete("/:id", (req, res, next) => {
  let id = req.params.id;

  Chirps.DeleteChirp(id);
  res.sendStatus(200);
});

export default router;
