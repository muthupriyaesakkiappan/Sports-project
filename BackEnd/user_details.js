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
        let {email,password,status}=request.body;
        if(email!=null &&  password!=null && status!=null){
        let sql='insert into login (email,password,status) values(?,?,?)';
        a.query(sql,[email,password,status],(error,result)=>{
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

add.post('/signin',(req, res)=>{
    try{
        try{
            console.log(req.body);
            let{email,password} =req.body;
            console.log(email +"---"+ password);
            let sql_query ='select id, email, password, status from login where email =?  and password =? and status ="A"';
            a.query(sql_query,[email,password],(err,result)=>{
                if(err){
                   
                    let msg={
                        'message':"userdetails not mtched"
                    }
                    res.send(err);
                }else
                {
                    if(result.length >0){
                        let msg ={
                            "message":"login successfully",
                            "userId":result[0].id
                        }
                        res.send(msg);
                    }else{
                        let msg={
                            'message':"user details not matched"
                        }
                        res.send(msg)
                    }
                }
            })
        }catch(app_error){
            res.send(app_error)
        }
    }catch(system_error){
        res.send(system_error)
    }
})

// add.post('/sign')
add.listen(1260,()=>{
    console.log("server is running on 1260 port");
});