import { Sequelize, DataTypes, ModelDefined } from "sequelize";

interface UserAttributes {
  id: string;
}

interface UserCreationAttributes {
  id: string;
}

/**
 * @param {Sequelize} sequelize - The Sequelize object
 * @return {ModelDefined} - The User model
 *
 * @example
 *
 * user(sequelize);
 */
export default (sequelize: Sequelize) =>
  sequelize.define(
    "user",
    {
      // The ID is their Discord User ID.
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
    },
    {
      tableName: "User",
    }
  ) as ModelDefined<UserAttributes, UserCreationAttributes>;
