import express from "express";
import {
  get_guild,
  get_all_guilds,
  create_guild,
  delete_guild,
} from "../controllers/guild-controller";

const router = express.Router({ mergeParams: true });

router.route("/").get(get_all_guilds).post(create_guild);
router.route("/:guild_id").get(get_guild).delete(delete_guild);

export default router;
