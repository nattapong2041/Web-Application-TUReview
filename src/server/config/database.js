let dbURI = 'mongodb://localhost:27017/tuData';
if (process.env.NODE_ENV === 'restaurant') {
   dbURI = process.env.MONGO_URI; 
}
const config = {
   database: dbURI,
   userMongoClient: true,
}

module.exports = config;

