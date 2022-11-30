'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Allcodes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    
    //định danh các mối quan hệ
    static associate(models) {
      // define association here
    }
  };
  Allcodes.init({
    key: DataTypes.STRING,
    type: DataTypes.STRING,
    value_En: DataTypes.STRING,
    value_Vi: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Allcodes',
  });
  return Allcodes;
};