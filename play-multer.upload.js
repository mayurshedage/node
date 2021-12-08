const express = require('express');
const multer = require('multer');
// const storage = multer.memoryStorage();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        let extArray = file.mimetype.split("/");
        let extension = extArray[extArray.length - 1];
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + "." + extension)
    }
});

const upload = multer({ storage: storage })

const app = express();

app.post('/upload/avatar', upload.single('avatar'), (req, res) => {
    res.send({
        avatar: req.file
    });
});

app.post('/upload/photos', upload.array('photos', 2), (req, res) => {
    res.send({
        photos: req.files
    });
});

app.listen(8080, () => {
    console.log('Listing on port: ', 8080)
});