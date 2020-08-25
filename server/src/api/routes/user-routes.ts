import express from "express";
import {
  get_all_users,
  get_user,
  create_user,
} from "../controllers/user-controller";

const router = express.Router({ mergeParams: true });

router.route("/").get(get_all_users).post(create_user);
router.route("/:user_id").get(get_user);

export default router;
