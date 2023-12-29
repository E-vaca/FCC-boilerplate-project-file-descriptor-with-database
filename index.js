var express = require('express');
var cors = require('cors');
const multer = require('multer');
const upload = multer()
const mongoose = require('mongoose')
const { Schema } = mongoose
require('dotenv').config()

mongoose.connect(process.env.DB_URL)

const FileDetailsSchema = new Schema({
  name: String,
  type: String,
  size: Number
})

const FileDetails = mongoose.model("File Details", FileDetailsSchema);

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), async (req, res) => {
  console.log(req)
  const fileObject = new FileDetails({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  })
  try {
    const file = await fileObject.save()
    console.log(file)
    res.json (fileObject)
  } catch (err) {
      console.log(err)
  }
})

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
