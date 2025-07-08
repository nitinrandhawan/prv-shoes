const multer = require("multer");
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const destinationPath = 'Public/images';
        fs.mkdir(destinationPath, { recursive: true }, function(err) {
            if (err) {
                console.error('Error creating directory:', err);
            }
            cb(null, destinationPath);
        });
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname); 
    }
});

const upload = multer({ storage: storage })
module.exports = upload;
