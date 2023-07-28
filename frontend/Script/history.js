let historyinfobox = document.getElementById("historyinfo");
let InfoDivOuter = document.getElementById("InfoDivOuter");
let infoDiv = document.getElementById("infoDiv");

window.onload = async () => {
    let token = localStorage.getItem("token");
    try {
        let res = await fetch("https://exodustravels.cyclic.app/order/bookings", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        res = await res.json();
        console.log(res);
        DisplayCards(res);
    } catch (error) {
        alert("Session is expired,Please login again!");
        window.location.href = "./login.html";
    }
};

function DisplayCards(data) {
    historyinfobox.innerHTML = "";

    if (data.length > 0) {
        let str = data
            .map((ele, index) => {
                return `<div>

  <p>${index + 1}</p>
  <p>Booking id: ${ele._id}</p>
  <p>${ele.booking}</p>
  <p>${ele.name}</p>
  <p>${ele.amount} &#8377;</p>
  <p>${ele.dates}</p>
  <button class="Btns" onclick="showInformation('${ele.item_id
                    }')">Info</button>
</div>`;
            })
            .join("");
        historyinfobox.innerHTML = str;
    } else {
        historyinfobox.textContent = "Oops!Nothing to show here!";
    }
}

async function showInformation(item_id) {
    InfoDivOuter.style.display = "flex";

    try {
        const res = await fetch("https://exodustravels.cyclic.app/search/view", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ _id: item_id }),
        });
        const data = await res.json();
        DisplayInfo(data);
    } catch (error) {
        console.log(error);
    }
}

function DisplayInfo(data) {
    infoDiv.innerHTML = "";

    if (data) {
        infoDiv.innerHTML = "";
        infoDiv.innerHTML = `<div>
        <h1>Infomation</h1>
<p>${data.name}</p>
<p>${data.address}</p>
<p>${data.city}</p>
<button onclick="closewindow()">X</button>
</div>`;
    } else {
        infoDiv.textContent = "Oops!Nothing to show here!";
    }
}

window.onclick = function (event) {
    if (event.target == InfoDivOuter) {
        InfoDivOuter.style.display = "none";
    }
};

function closewindow() {
    InfoDivOuter.style.display = "none";
}