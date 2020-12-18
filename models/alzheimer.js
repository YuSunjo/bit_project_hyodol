const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
    const alzheimer_test = sequelize.define('alzheimer_test',
        {
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            Date: {type: DataTypes.DATEONLY },
            questionnumber : { type: DataTypes.INTEGER },
            question : { type: DataTypes.STRING },
            reply : { type: DataTypes.STRING },
            ScoreCheck: { type: DataTypes.INTEGER },
            answer : { type: DataTypes.STRING },
        },{
            timestamps: false
        }
    );

    // alzheimer_test.prototype.dateFormat = (date) => {
    //     return moment(date).format('YYYY년 MM월 DD일');
    // };
    
    return alzheimer_test;
} 