const express=require("express");
const cors= require("cors");
const fileUpload=require("express-fileupload");
const bodyparser=require("body-parser");
const database=require("mysql");
const {application,request,response}=require("express");

const add=express();
add.use(cors());
add.use(fileUpload());
add.use(bodyparser.json());
add.use(express.json());
add.use(express.static('public'));

let a=database.createConnection({
    host:"localhost",
    user:"root",
    password:"Priya9700@",
    database:"sports"
});

a.connect(function(error){
    if(error){
        console.log(error);
    }else{
        console.log("db connected");
    }
})

add.post('/demo',(request,response)=>{
    try{
        console.log(JSON.stringify(request.body));
        let {email,password}=request.body;
        if(email!=null &&  password!=null ){
        let sql='insert into login (email,password,effective_from,effective_to,status,created_by,created_on,modified_by,modified_on) values(?,?,current_timestamp(),current_timestamp(),"A",current_user(),current_timestamp(),null,null)';
        a.query(sql,[id,sports_name,sports_code],(error,result)=>{
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

add.post('/Login',(request,response) =>{
    console.log(request);
    let{email,password}=request.body
    let sql='select * from user_details where email=? and password=? '
    a.query(sql,[email,password],(error,result) => {
        if(error){
            let s={"status":"error"};
            console.log(error);
        }else{
            let s={"status":"success"};
            response.send(result);
        }
    })
})


add.post('/sign')
add.listen(1260,()=>{
    console.log("server is running on 1260 port");
});