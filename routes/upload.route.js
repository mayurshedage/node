const express = require('express');
const router = express.Router();

const crypto = require('crypto');

const AWS = require('aws-sdk');

const multer = require('multer');
const storage = multer.memoryStorage();
const multipleUpload = multer({ storage: storage }).array('file');

require('dotenv').config();

const s3client = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

const getExtension = (filename) => {
    return filename.split('.').pop();
}

router.post('/uploads', multipleUpload, (req, res) => {
    const files = req.files;
    let response = [];

    files.map(file => {
        const filename = crypto.createHash('md5')
            .update(file.originalname + Date.now())
            .digest('hex') + '.' + getExtension(file.originalname);

        const params = {
            Bucket: process.env.AWS_BUCKET_UPLOAD_PATH,
            Key: filename,
            Body: file.buffer,
            ContentType: file.mimetype,
        }
        s3client.upload(params, (err, data) => {
            if (err) {
                res.status(500).send(err);
            } else {
                response.push({
                    filename: filename,
                    location: data.Location
                });

                if (response.length === files.length) {
                    res.json({
                        data: response,
                        message: 'Ok'
                    });
                }
            }
        });
    });
});

module.exports = router;