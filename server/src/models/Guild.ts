import { Sequelize, DataTypes, ModelDefined } from "sequelize";

interface GuildAttributes {
  id: string;
}

interface GuildCreationAttributes {
  id: string;
}

/**
 * @param {Sequelize} sequelize - The Sequelize object
 * @return {ModelDefined} - The Guild model
 *
 * @example
 *
 * guild(sequelize);
 */
export default (sequelize: Sequelize) =>
  sequelize.define(
    "guild",
    {
      // The ID is the Discord Guild ID.
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
    },
    {
      tableName: "Guild",
    }
  ) as ModelDefined<GuildAttributes, GuildCreationAttributes>;
