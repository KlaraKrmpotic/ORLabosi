const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Index',
        linkActive: 'index'
    });
});

// POKUSAJ DOWNLOADAS INDEX STRANICE - NE RADI!!!!
router.get('/download', function(req, res){
    console.log("U download dijelu sam");
    var file = __dirname + '/hoteliHrv.json';
    res.download(file);
});


module.exports = router;
