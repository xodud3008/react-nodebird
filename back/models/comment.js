module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', { // Mysql에는 users 테이블 생성
        // id가 기본적으로 들어있다
        content: {
            type: DataTypes.TEXT,
            allowNull: false, // 필수
        },
    }, {
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci', // 한글 저장
    });
    Comment.associate = (db) => {
        db.Comment.belongsTo(db.User);
        db.Comment.belongsTo(db.Post);
    };
    return Comment;
}