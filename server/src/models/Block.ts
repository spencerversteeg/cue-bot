import { Sequelize, DataTypes, ModelDefined } from "sequelize";

// TODO Define block model and create types based on user choice.
// Each type will have it's own attributes that need to be saved.
// Some blocks will hold nests that contain more blocks.

interface BlockAttributes {
  id: string;
  type: string;
}

interface BlockCreationAttributes {
  type: string;
}

/**
 * @param {Sequelize} sequelize - The Sequelize object
 * @return {ModelDefined} - The Block model
 *
 * @example
 *
 * block(sequelize);
 */
export default (sequelize: Sequelize) =>
  sequelize.define(
    "block",
    {
      // The ID is their Discord User ID.
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
    },
    {
      tableName: "Block",
    }
  ) as ModelDefined<BlockAttributes, BlockCreationAttributes>;
