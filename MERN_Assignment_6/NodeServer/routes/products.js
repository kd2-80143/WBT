const mysql = require('mysql2');
const express = require('express');
app = express.Router();
const config = require('config');

var connectionDetails = {
    host : config.get("server"),
    database : config.get("database"),
    user : config.get("uname"),
    password : config.get("passwd") 
  }

app.get("/",(request,response)=>{
    var connection = mysql.createConnection(connectionDetails);
    var statement = 'select * from products';
    connection.query(statement,(error,result)=>{
        if(error==null)
        {
            var res = JSON.stringify(result);
            response.setHeader("Content-Type","application/json");
            connection.end();
            response.write(res);
            response.end();
        }
        else
        {
            var res1 = JSON.stringify(error);
            response.setHeader("Content-Type","application/json");
            connection.end();
            response.write(res1);
            response.end();
        }
    })
});

app.post('/',(request,response)=>{
    console.log(request.body)
    var connection = mysql.createConnection(connectionDetails);
    var statement = `insert into products values (${0},'${request.body.producttitle}',${parseInt(request.body.price)},${parseInt(request.body.stock)})`;
    connection.query(statement,(error,result)=>{
        if(error==null)
        {
            var res = JSON.stringify(result);
            response.setHeader("Content-Type","application/json");
            connection.end();
            response.write(res);
            response.end();
        }
        else
        {
            var res1 = JSON.stringify(error);
            response.setHeader("Content-Type","application/json");
            connection.end();
            response.write(res1);
            response.end();
        }
    });
});

app.put('/:productid',(request,response)=>{
    console.log(request.params.productid);
    console.log(request.body);
    var connection = mysql.createConnection(connectionDetails);
    var statement = `Update products set producttitle='${request.body.producttitle}', price=${parseInt(request.body.price)},stock=${parseInt(request.body.stock)} where productid=${request.params.productid}`;
    connection.query(statement,(error,result)=>{
        if(error==null)
        {
            var res = JSON.stringify(result);
            response.setHeader("Content-Type","application/json");
            connection.end();
            response.write(res);
            response.end();
        }
        else
        {
            var res1 = JSON.stringify(error);
            response.setHeader("Content-Type","application/json");
            connection.end();
            response.write(res1);
            response.end();
        }
    });
});

app.delete('/:productid',(request,response)=>{
    console.log(request.params.productid);
    var connection = mysql.createConnection(connectionDetails);
    var statement = `Delete from products where productid=${request.params.productid}`;
    connection.query(statement,(error,result)=>{
        if(error==null)
        {
            var res = JSON.stringify(result);
            response.setHeader("Content-Type","application/json");
            connection.end();
            response.write(res);
            response.end();
        }
        else
        {
            var res1 = JSON.stringify(error);
            response.setHeader("Content-Type","application/json");
            connection.end();
            response.write(res1);
            response.end();
        }
    })
});


module.exports = app;