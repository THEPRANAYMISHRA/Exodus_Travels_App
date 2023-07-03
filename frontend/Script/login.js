const email=document.getElementById("email");
const password=document.getElementById("password");
const loginBtn=document.getElementById("loginBtn")
const nameEl=document.getElementById("name");
const heading=document.querySelector(".login-bg h1");
const signupBtn=document.getElementById("signupBtn");

loginBtn.addEventListener("click",async(e)=>{
    e.preventDefault();

    let payload={
        email:email.value,
        password:password.value
    }

    fetch("http://localhost:4500/user/login",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(payload)
    })
    .then((res)=>res.json())
    .then((data)=>{
        console.log(data)
        localStorage.setItem("admin_access_token",data.AdminAccessToken)
        localStorage.setItem("refresh_access_token",data.AdminAccessToken)
        alert(data.msg)
        window.location.href="admin.html"
    })
    .catch((err)=>alert("Login failed"))
});

signupBtn.addEventListener("click",async(e)=>{
    e.preventDefault();

    let obj={
        email:email.value,
        password:password.value,
        name:nameEl.value
    }

    fetch("http://localhost:4500/user/signup",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(obj)
    })
    .then((res)=>res.json())
    .then((data)=>{
        console.log(data)
        alert(data.msg)
    })
    .catch((err)=>alert("Login failed"))
})


//to handel switch forms
function switchForm(){

    if(keyEl.style.display=="block"){
        keyEl.style.display="none";
        heading.innerHTML="Login";
        signupBtn.style.display="none";
        loginBtn.style.display="block";
    }else{
        keyEl.style.display="block";
        heading.innerHTML="Sign Up";
        loginBtn.style.display="none";
        signupBtn.style.display="block";
    }
}