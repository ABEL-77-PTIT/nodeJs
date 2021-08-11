module.exports = {
    //hàm xử lý cho một list khóa học
    multiMongooseToObject: function (mongooseArrays) {
        return mongooseArrays.map((mongoose) => mongoose.toObject());
    },
    //hàm xử lý cho môt khóa học
    mongooseToObject: function (mongoose) {
        return mongoose ? mongoose.toObject() : mongoose;
    },
};
