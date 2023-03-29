const popupSignIn = document.querySelector("#popup-signin");
const popupSignUp = document.querySelector("#popup-signup");
const btnSignIn = document.querySelector("#btn-signin");
const btnSignUp = document.querySelector("#btn-signup");

btnSignIn.addEventListener("click", () => {
  popupSignIn.style.display = "block";
  popupSignUp.style.display = "none";
});

btnSignUp.addEventListener("click", () => {
    popupSignUp.style.display = "block";
    popupSignIn.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target === popupSignIn) {
    popupSignIn.style.display = "none";
    popupSignUp.style.display = "none";
  }
});

window.addEventListener("click", (event) => {
  if (event.target === popupSignUp) {
    popupSignUp.style.display = "none";
    popupSignIn.style.display = "none";
  }
});

// search===============================================
let lookingforEl=document.getElementById("type")
let LeavingfromEl=document.getElementById("leavingfrom")
let GoingtoEl=document.getElementById("goingto")
let checkinEl=document.getElementById("checkin")
let checkoutEl=document.getElementById("checkout")
let TravellersEl=document.getElementById("travellers")
let searchbtn =document.getElementById("searchPlans")

searchbtn.addEventListener("click",(e)=>{
    e.preventDefault()
    let plan={
        lookingfor:lookingforEl.value,
        from:LeavingfromEl.value,
        to:GoingtoEl.value,
        checkIn:checkinEl.value,
        checkOut:checkoutEl.value,
        travellers:TravellersEl.value
    }
    
})

//signin================================================
let emailEl=document.getElementById("email-signin")
let passEl=document.getElementById("password-signin")
let signInbtn=document.getElementById("submit-signin")
let namebox=document.querySelector(".dropdown p")

signInbtn.addEventListener("click",async(e)=>{
    e.preventDefault()
    let user={
        email:emailEl.value,
        pass:passEl.value
    }
    try {
        let res=await fetch("http://localhost:4500/users/login",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(user)
            })
        res=await res.json()
        localStorage.setItem("token",res.token)
        localStorage.setItem("name",res.name)
        alert(res.msg)
        popupSignIn.style.display = "none";
        namebox.innerText=`${localStorage.getItem("name")||"Profile"}`
    } catch (error) {
        alert(res.msg)
    }
})



//signup================================================
// let typeEl=document.getElementById("type")
let nameEl=document.getElementById("name-signup")
let signupemailEl=document.getElementById("email-signup")
let signuppassEl=document.getElementById("password-signup")
let signUpbtn=document.getElementById("submit-signup")

signUpbtn.addEventListener("click",(e)=>{
    e.preventDefault()
    let user={
        name:nameEl.value,
        email:signupemailEl.value,
        pass:signuppassEl.value
    }
    fetch("http://localhost:4500/users/signup",{
        method:"POST",
        headers:{
            // "Authorization":`Bearer ${token}`,
            "Content-Type":"application/json"
        },
        body:JSON.stringify(user)
    })
    .then((res)=>{return res.json()})
    .then(res=>{alert("Signup successful!"),window.location.reload()})
    .catch(console.error("something went wrong!"))
})