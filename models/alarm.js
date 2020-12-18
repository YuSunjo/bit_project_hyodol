const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
    const medicinecheck = sequelize.define('medicinecheck',
        {
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            Date: {type: DataTypes.DATEONLY },
            morning : { type: DataTypes.STRING },
            lunch : { type: DataTypes.STRING },
            dinner : { type: DataTypes.STRING }
        },{
            timestamps: false
        }
    );

    medicinecheck.prototype.dateFormat = (date) => {
        return moment(date).format('YYYY년 MM월 DD일');
    };
    
    return medicinecheck;
}