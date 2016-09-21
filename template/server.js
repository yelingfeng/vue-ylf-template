/**
 * Created by yelingfeng on 2016/9/9.
 */
var path = require('path');
var express = require('express');

var app = new express();
var port = process.env.PORT || 8400;

app.get("/", function(req, res) {
    return res.send("<html><head></head><body><h1>test ApiServer</h1></body></html>")
})

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8100");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});



app.get("/getPieData",(req,res)=>{
    res.send({
        "result":[
            {"name":"vue","value":"99"},
            {"name":"react","value":"50"},
            {"name":"angular2","value":"40"}
        ]
    })
});



app.listen(port, function(err) {
    if (err) {
        console.error(err)
    } else {
        console.info("==>  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
    }
})
