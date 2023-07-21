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

// add.get('/getdata/', (request,response) => {
//         console.log(request.params);
//         a.query('select ,status from sports_list where status="A"',
//         (error, result) => {
//             if(error) {
//                 console.log(error)
//             }
//             else
//             {
//                 console.log(result)
//                 response.send(result)
//             }
//         })
//     })

add.post('/demo',(request,response)=>{
    try{
        console.log(JSON.stringify(request.body));
        let  {first_name,last_name ,gender,date_of_birth,email ,pho_no,password}=request.body;
        if(first_name !=null && last_name !=null && gender !=null && date_of_birth !=null && email !=null && pho_no !=null  && password !=null){
        let sql='insert into register(first_name,last_name ,gender,date_of_birth,email ,pho_no,password, effective_from, effective_on, created_by, created_on, status, modify_by, modify_on) values(?,?,?,?,?,?,?,current_timestamp(),current_timestamp(),current_user(),current_timestamp(),"A",null,null)';
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

// add.post('/register',(request,response) =>{
//     console.log(request.body);
//     let{email,password,status}=request.body
//     let sql='select * from register where email=? and password=? and status="A" ';
//     a.query(sql,[email,password,status],(error,result) => {
//         if(error){
//             let s={"status":"error"};
//             console.log(error);
//         }else{
//             let s={"status":"success"};
//             response.send(result);
//         }
//     })
// })

add.post('/register',(req, res)=>{
    try{
        try{
            console.log(req.body);
            let{email,password} =req.body;
            console.log(email +"---"+ password);
            let sql_query ='select id, email, password, status from register where email =?  and password =? and status ="A"';
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


add.listen(120,()=>{
    console.log("server is running on 120 port");
});