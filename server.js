'use strict';

var express = require('express');
var cors = require('cors');
var multer = require('multer');
var bodyParser = require('body-parser');

var upload = multer({ dest: './public' });

var app = express();

app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});

app.post('/api/fileanalyse', upload.single('upfile'), function(req, res, next){
  const file = req.file;
  
  if (!file) {
    const error = new Error('Need a proper file');
    error.httpStatusCode = 400;
    return next(error);
  }
  
  console.log('Analyzing file ...');
  res.json({
    filename: file.originalname,
    filesize: file.size
  });
});