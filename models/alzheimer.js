const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
    const alzheimer = sequelize.define('alzheimer',
        {
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            number : { type: DataTypes.INTEGER },
            question : { type: DataTypes.STRING },
            answer : { type: DataTypes.STRING },
            reply : { type: DataTypes.STRING },
            score : { type: DataTypes.INTEGER }
        }
    );

    alzheimer.prototype.dateFormat = (date) => {
        return moment(date).format('YYYY년 MM월 DD일');
    };
    
    return alzheimer;
} 