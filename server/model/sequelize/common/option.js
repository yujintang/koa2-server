/**
 * Created by yujintang on 2017/7/17.
 */
'use strict';

const opt =  () => {
    return {
        // don't add the timestamp attributes (updatedAt, createdAt)
        timestamps: true,

        // don't use camelcase for automatically added attributes but underscore style
        // so updatedAt will be updated_at
        underscored: false,

        // disable the modification of table names; By default, sequelize will automatically
        // transform all passed model names (first parameter of define) into plural.
        // if you don't want that, set the following
        freezeTableName: true,
    }
};

module.exports = opt();