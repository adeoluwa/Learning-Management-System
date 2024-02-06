const mongoose = require('mongoose');

const validateMongodbId = (id) => {
    const isvalid = mongoose.Types.ObjectId(id);
    if(!isvalid) throw new Error("This Id is not valid or Not found.")
};

module.exports = validateMongodbId;