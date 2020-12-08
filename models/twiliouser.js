const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
    const twiliouser = sequelize.define('twiliouser',
        {
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            name : { type: DataTypes.STRING },
            phone : { type: DataTypes.STRING },
        }
    );

    twiliouser.prototype.dateFormat = (date) => {
        return moment(date).format('YYYY년 MM월 DD일');
    };
    
    return twiliouser;
} 