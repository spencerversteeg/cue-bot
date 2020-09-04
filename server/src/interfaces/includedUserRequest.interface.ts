import { Request } from "express";
import User from "../users/users.interface";

interface includedUserRequest extends Request {
  user: User;
}

export default includedUserRequest;
