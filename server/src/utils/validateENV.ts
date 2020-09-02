import { cleanEnv, port, str } from "envalid";

const validateENV = () => {
  return cleanEnv(process.env, {
    PORT: port(),
    DISCORD_CLIENT_ID: str(),
    DISCORD_CLIENT_SECRET: str(),
    MONGO_URI: str(),
    JWT_SECRET: str(),
  });
};

export default validateENV;
