import sequelize from "sequelize";
import { Sequelize, DataTypes, ModelDefined } from "sequelize";

interface CommandAttributes {
  id: string;
  trigger: string;
  description: string;
}

interface CommandCreationAttributes {
  trigger: string;
  description: string;
}

/**
 * @param {Sequelize} sequelize - The Sequelize object
 * @return {ModelDefined} - The Command model
 *
 * @example
 *
 * command(sequelize);
 */
export default (sequelize: Sequelize) =>
  sequelize.define(
    "command",
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      trigger: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "User",
    }
  ) as ModelDefined<CommandAttributes, CommandCreationAttributes>;
