const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
    const alarm = sequelize.define('alarm',
        {
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            morning : { type: DataTypes.STRING },
            lunch : { type: DataTypes.STRING },
            dinner : { type: DataTypes.STRING }
        }
    );

    alarm.prototype.dateFormat = (date) => {
        return moment(date).format('YYYY년 MM월 DD일');
    };
    
    return alarm;
} 