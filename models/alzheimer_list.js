const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
    const alzheimer_list = sequelize.define('alzheimer_list',
        {
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            Date: {type: DataTypes.DATEONLY },
            score: {type: DataTypes.INTEGER },
        },{
            timestamps: false
        }
    );

    // alzheimer_test.prototype.dateFormat = (date) => {
    //     return moment(date).format('YYYY년 MM월 DD일');
    // };
    
    return alzheimer_list;
} 