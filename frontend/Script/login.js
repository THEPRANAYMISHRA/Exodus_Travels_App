const email = document.getElementById("email");
const password = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn")
const nameEl = document.getElementById("name");
const heading = document.querySelector(".login-bg h1");
const SendotpBtn = document.getElementById("SendotpBtn");
const verifyBtn = document.getElementById('verifyBtn')
const otpEl = document.getElementById('otp')

loginBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    let payload = {
        email: email.value,
        pass: password.value
    }

    fetch("https://exodustravels.cyclic.app/user/login", {
        method: "POST",
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
        .then((res) => res.json())
        .then((data) => {
            localStorage.setItem('token', data.token)
            localStorage.setItem('name', data.name)
            alert(data.msg)
            window.location.href = "../index.html"
        })
        .catch((err) => alert("Login failed"))
});

SendotpBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    otpEl.style.display = "block";
    SendotpBtn.style.display = 'none';
    verifyBtn.style.display = 'block';
    email.style.display = 'none'
    nameEl.style.display = 'none'
    password.style.display = 'none'


    let obj = {
        email: email.value,
        pass: password.value,
        name: nameEl.value
    }

    fetch("https://exodustravels.cyclic.app/user/otp", {
        method: "POST",
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            alert(data.msg)
        })
        .catch((err) => alert("Login failed"))
})

verifyBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    let obj = {
        email: email.value,
        pass: password.value,
        name: nameEl.value,
        otp: otpEl.value
    }

    fetch("https://exodustravels.cyclic.app/user/verify", {
        method: "POST",
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            alert(data.msg)
            window.location.reload()
        })
        .catch((err) => alert("failed"))
})


//to handel switch forms
function switchForm() {

    if (nameEl.style.display == "block") {
        nameEl.style.display = "none";
        heading.innerHTML = "Login";
        SendotpBtn.style.display = "none";
        loginBtn.style.display = "block";
        verifyBtn.style.display = 'none'
        otpEl.style.display = 'none'
    } else {
        nameEl.style.display = "block";
        heading.innerHTML = "Sign Up";
        loginBtn.style.display = "none";
        SendotpBtn.style.display = "block";
    }
}