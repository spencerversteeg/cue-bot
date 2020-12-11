import { Sequelize } from "sequelize";

// Import all models from their respected files.
import user from "./User";
import guild from "./Guild";
import command from "./Command";
import block from "./Block";

// Create a new sequelize instance.
const sequelize = new Sequelize(
  process.env.DB_DATABSE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    // Disabled due to console spam for the time being.
    logging: false,
  }
);

// Models / Tables
export const User = user(sequelize);
export const Guild = guild(sequelize);
export const Command = command(sequelize);
export const Block = block(sequelize);

// Relationships between entities.

// User -> Guild
User.hasMany(Guild);
Guild.belongsTo(User);

// Guild -> Command
Guild.hasMany(Command);
Command.belongsTo(Guild);

// Block -> Command
Command.hasMany(Block);
Block.belongsTo(Command);

export default sequelize;
