const express = require("express");
const cors = require("cors");
const fileupload = require("express-fileupload");
const bodyparse = require("body-parser");
const database = require("mysql");
const {application, request, response} = require('express');

const add = express();
add.use(cors());
add.use(fileupload());
add.use(bodyparse.json());
add.use(express.json());
add.use(express.static('public'));

let a = database.createConnection({
    host: "localhost",
    user: "root",
    password: "Royal@2022",
    database: "sports"
});

a.connect(function(error)
{
    if(error)
    {
        console.log(error);
    } else {
        console.log("db connected")
    }
});

add.get('/list/', (request,response) => {
    console.log(request.params);
    a.query('select sports_type, status from sports_type where status="A"',
    (error, result) => {
        if(error) {
            console.log(error)
        }
        else
        {
            console.log(result)
            response.send(result)
        }
    })
})

add.post('/demo',(request,response)=>{
    try{
        console.log(JSON.stringify(request.body));
        let {id,sports_type}=request.body;
        if( sports_type!=null){
        let sql='insert into sports_type(id,sports_type,effective_from,effective_to,status,created_by,created_on,modified_by,modified_on) values(?,?,current_timestamp(),current_timestamp(),"A",current_user(),current_timestamp(),null,null)';
        a.query(sql,[id,sports_type],(error,result)=>{
            if(error){
                let s={"status":"error"};
                response.send(s);
                console.log(error);
            }else{
                let s={"status":"success"};
                response.send(s);
            }
        })}else{
            let s={"status":"InvalidData"};
            response.send(s);
        }
    }catch(e){
        response.send(e);
    }
})


add.listen(121, () => {
    console.log("server is running on 121 port")
})

