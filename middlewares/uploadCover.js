const multer = require ("multer");

const storage = multer.diskStorage(
    {
        destination: (req,file,callback) => {
            callback(null, 'public/images/covers');
        },
        filename: (req,file,callback) => {
            callback(null, file.originalname)
        }
    }
)

module.exports = multer ({storage});
