var userList=[];
    function display(){
    var f_name= document.getElementById("fname").value;
    var l_name= document.getElementById("lname").value;
    var email_id= document.getElementById("email").value;
    var phone= document.getElementById("pno").value;
    var pass_wd= document.getElementById("pwd").value;
    //alert(f_name+"..."+l_name+"..."+email_id+".."+pass_wd);
    
     if(f_name=="" || f_name==null)
    {
        alert("please enter the firstname");
    }
    
    else if(l_name=="" || l_name==null)
    {
        alert("please fill the lastname");
    }
   
    else if(phone=="" || phone==null)
    {
        alert("please enter the the phone number");
    }
    else{
        let userinfo={
            "firstname":f_name,
            "lastname":l_name ==" " ? '--' : l_name,
            "emailid":email_id,
            "phone":phone,
            "passward":pass_wd
        }
        var name= document.getElementById("email").value;     
        var input=new RegExp("[a-zA-Z]+[0-9]+[@][a-z]+[\.][a-z]{2,3}");
        var result=name.match(input);                          
          console.log(result);
          
          if(name.match(input))
          {
            alert("register successfully");
          }
          else{
            alert("please enter the valid email id")
          }
      
        userList.push(userinfo);
        console.log(userinfo);
        localStorage.setItem("userList",JSON.stringify(userList))
       
        setTimeout(()=>{
               
                document.getElementById("fname").value=null;
                document.getElementById("lname").value=null;
                document.getElementById("email").value=null;
                document.getElementById("pno").value=null;
                document.getElementById("pwd").value=null;
                userinfo={};
                console.log(userinfo);
            },3000)
    }
    
}

    


   