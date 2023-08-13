let namebox = document.querySelector(".dropdown>p")
let optionEl = document.getElementById("type")
let formforstays = document.getElementById("formforstays")
let formforflights = document.getElementById("formforflights")
let formforcars = document.getElementById("formforcars")
let User_profile = document.getElementById('User_profile')
let loginbtn = document.getElementById('login-option')
let datesInp = document.querySelectorAll("input[type='date']")

window.onload = async () => {
    let name = localStorage.getItem("name")
    let token = localStorage.getItem('token')
    datesInp.forEach((ele) => {
        ele.setAttribute.min = getTodayDate()
    })
    if (token) {
        if (validateUser(token)) {
            User_profile.classList.remove('d-none')
            loginbtn.classList.add('d-none')
            User_profile.textContent = `Hello,${name.split(" ")[0]}`
        } else {
            alert("Session is expired,Please login again!");
            localStorage.removeItem('token')
            localStorage.removeItem('name')
            window.location.href = "./login.html";
        }
    }
}


async function validateUser(token) {
    try {
        let res = await fetch("https://exodustravels.onrender.com/order/bookings", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        res = await res.json();
        return true
    } catch (error) {
        return false
    }
}

// search===============================================
// for hotels
let locationEl = document.getElementById("location")
let checkinEl = document.getElementById("checkin")
let checkoutEl = document.getElementById("checkout")
// for flights
let LeavingfromEl = document.getElementById("leavingfrom")
let GoingtoEl = document.getElementById("goingto")
let DepartureDateEl = document.getElementById("departuredate")
let ReturnDateEl = document.getElementById("returndate")
// for cars
let pickupLocationEl = document.getElementById("pickup")
let dropoffLocationEl = document.getElementById("dropoff")
let pickuptimeEl = document.getElementById("pickuptime")
let dropofftimeEl = document.getElementById("dropofftime")

let searchbtn = document.getElementById("searchPlans")


searchbtn.addEventListener("click", async (e) => {
    e.preventDefault()
    let plan;
    localStorage.setItem("Searching for", JSON.stringify(optionEl.value))

    if (optionEl.value == "Stays") {
        plan = {
            city: locationEl.value,
            checkin: checkinEl.value,
            checkout: checkoutEl.value
        }
    } else if (optionEl.value == "Flights") {
        plan = {
            from: LeavingfromEl.value,
            to: GoingtoEl.value,
            depaturedate: DepartureDateEl.value,
            returndate: ReturnDateEl.value
        }
    } else if (optionEl.value == "Cars") {
        plan = {
            pickuplocation: pickupLocationEl.value,
            dropofflocation: dropoffLocationEl.value,
            pickuptime: pickuptimeEl.value
        }
    }

    localStorage.setItem("searchPlan", JSON.stringify(plan))
    window.location.href = "./Pages/searchPage.html"
})

//return today 
function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}


//for scrolling==============================================
let button3 = document.getElementById("leftclick")
button3.addEventListener("click", () => {
    let container = document.getElementById("maintrips")
    sideScroll(container, "left", 10, 300, 10)
})

let button4 = document.getElementById("rightclick")
button4.addEventListener("click", () => {
    let container = document.getElementById("maintrips")
    sideScroll(container, "right", 10, 300, 10)
})


function sideScroll(element, direction, speed, distance, step) {
    scrollAmount = 0;
    let slideTimer = setInterval(function () {
        if (direction == "left") {
            element.scrollLeft -= step;
        } else {
            element.scrollLeft += step;
        }
        scrollAmount += step;
        if (scrollAmount >= distance) {
            window.clearInterval(slideTimer);
        }
    }, speed)
}

// change form=============================
optionEl.addEventListener("change", () => {
    if (optionEl.value == "Stays") {
        formforstays.style.display = "flex";
        formforflights.style.display = "none";
        formforcars.style.display = "none";
    } else if (optionEl.value == "Flights") {
        formforstays.style.display = "none";
        formforflights.style.display = "flex";
        formforcars.style.display = "none";
    } else if (optionEl.value == "Cars") {
        formforstays.style.display = "none";
        formforflights.style.display = "none";
        formforcars.style.display = "flex";
    }
})