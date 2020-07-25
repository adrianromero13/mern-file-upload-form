const express = require('express');
const path = require('path');
const multer = require('multer');
const mongoose = require('mongoose');

const File = require('./model');

const PORT = 5000;

const app = express();
const router = express.Router();

const storage = multer.diskStorage({
    destination: './public',
    filname: function(req, file, cb){
        cb(null, 'IMAGE-' + Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({
    storage: storage,
    limits:{fileSize: 1000000},
}).single('myfile');

const obj =(req,res) => {
    upload(req, res, () => {
        console.log('request ---', req.body);
        console.log('request file ---', req.file); // where file is
        const file = new File();
        file.meta_data = req.file;
        file.save().then(() => {
            res.send({ message: 'upload successfully' })
        })
    })
}

router.post('upload', obj);

app.use(router);
app.get('/', (req,res) => {
    return res.send('<h3>Hello World!</h3>')
});

// set up mongoose connection

mongoose.connect('mongodb://localhost/file-upload', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
}).then(() => {console.log('db is connected') });

app.listen(PORT, () => {
    console.log(`app listening on PORT: ${PORT}`)
});

