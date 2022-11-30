'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Schedule extends Model {
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
  Schedule.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    currentNumber: DataTypes.INTEGER,
    maxNumber: DataTypes.INTEGER,
    date: DataTypes.DATE,
    timeType: DataTypes.STRING,
    doctorId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Schedule',
  });
  return Schedule;
};