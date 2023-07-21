const express = require("express");
const cors = require("cors");
const fileupload = require("express-fileupload");
const bodyparse = require("body-parser");
const database = require("mysql");
const schedule = require("node-schedule");
const nodemailer = require("nodemailer");
const util = require("util");
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
})

a.connect(function(error)
{
    if(error)
    {
        console.log(error);
    } else {
        console.log("db connected")
    }
})

// add.get('/stu_list/:id', (request,response) => {
//     console.log(request.params);
//     a.query('select id, name, age from demo', // add where retrive the data by id
//     (error, result) => {
//         if(error) {
//             console.log(error)
//         }
//         else
//         {
//             response.send(result)
//         }
//     })
// })

add.post('/signUp',(request,response)=>{
    try{
        console.log(JSON.stringify(request.body));
        let {first_name,last_name ,gender,date_of_birth,email ,pho_no,password}=request.body;
        if(first_name !=null && last_name !=null && gender !=null && date_of_birth !=null && email !=null,pno_no !=null  && password !=null){
        let sql='first_name,last_name ,gender,date_of_birth,email ,pho_no,password, effective_from, effective_on, created_by, created_on, status, modify_by, modify_on) values(?,?,?,?,?,?,?,current_timestamp(),current_timestamp(),current_user(),current_timestamp(),"A",null,null)';
        a.query(sql,[first_name,last_name ,gender,date_of_birth,email ,pho_no,password],(error,result)=>{
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

add.get('/spo_list/', (request,response) => {
    console.log(request.params);
    a.query('select  first_name,last_name ,gender,date_of_birth,email ,pho_no,password, effective_from, effective_on, created_by, created_on, status, modify_by, modify_on,from register', // add where retrive the data by id
    (error, result) => {
        if(error) {
            console.log(error)
        }
        else
        {
            response.send(result)
        }
    })
})


add.listen(118,()=>{
    console.log("server is running on 118 port");
});