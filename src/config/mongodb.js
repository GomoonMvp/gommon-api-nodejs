var port = process.env.MONGO_PORT || 27017;
var uri = process.env.MONGO_HOST || 'mongodb://localhost:' + port + '/yourdb';

const options = {
    useMongoClient: true
};

module.exports = mode => {
    return {
        connection: uri,
        options
    };
};
