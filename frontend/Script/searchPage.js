let showDatabox = document.getElementById("showdata")
let plan = JSON.parse(localStorage.getItem("searchPlan"))
let searchingfor = JSON.parse(localStorage.getItem("Searching for"))

window.onload = async () => {
    try {
        let res = await fetch(`http://localhost:4500/search/available/${searchingfor}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(plan)
        })
        res = await res.json()
        if (searchingfor == 'Flights') {
            DisplayFlights(res)
        } else if (searchingfor == 'Stays') {
            DisplayStays(res)
        } else {
            DisplayCars(res)
        }
    } catch (error) {
        alert("error")
        console.log(error)
    }
}

//showData==========================================================

function DisplayFlights(data) {
    showDatabox.innerHTML = ''

    data.forEach((e) => {
        let div = document.createElement("div")

        let dataDiv = document.createElement("div")

        let img = document.createElement("img")
        img.src = e.image || "https://www.ctexpress.in/no-image.png"

        let company = document.createElement("h5")
        company.textContent = `${e.company}`

        let from = document.createElement("h5")
        from.textContent = `From: ${e.from} `

        let arrow = document.createElement("img")
        arrow.src = "https://cdn-icons-png.flaticon.com/128/724/724954.png"

        let to = document.createElement("h5")
        to.textContent = `To: ${e.to} `

        let book = document.createElement("button")
        book.textContent = "View More"
        book.setAttribute('class', 'bookBtn');

        book.addEventListener("click", async () => {
            localStorage.setItem("viewMore", JSON.stringify(e._id))
            window.location.href = "./viewPage.html";
        })

        dataDiv.append(company, from, to)

        div.append(img, dataDiv, book)
        showDatabox.append(div)
    })

}

function DisplayStays(data) {
    showDatabox.innerHTML = ''

    data.forEach((e) => {
        let div = document.createElement("div")

        let dataDiv = document.createElement("div")

        let img = document.createElement("img")
        img.src = e.image || "https://www.ctexpress.in/no-image.png"

        let name = document.createElement("h5")
        name.textContent = `${e.name}`

        let address = document.createElement("h6")
        address.textContent = `${e.address} `

        let city = document.createElement("h5")
        city.textContent = `${e.city} `

        let rating = document.createElement("h5")
        rating.textContent = `Ratings:${e.rating} `

        let book = document.createElement("button")
        book.textContent = "View More"
        book.setAttribute('class', 'bookBtn');

        book.addEventListener("click", async () => {
            localStorage.setItem("viewMore", JSON.stringify(e._id))
            window.location.href = "./viewPage.html";
        })

        dataDiv.append(name, address, city, rating)

        div.append(img, dataDiv, book)
        showDatabox.append(div)
    })
}

function DisplayCars(data) {
    showDatabox.innerHTML = ''

    data.forEach((e) => {
        let div = document.createElement("div")

        let dataDiv = document.createElement("div")

        let img = document.createElement("img")
        img.src = e.image || "https://www.ctexpress.in/no-image.png"

        let name = document.createElement("h5")
        name.textContent = `${e.name}`

        let city = document.createElement("h5")
        city.textContent = `From: ${e.city} `

        let book = document.createElement("button")
        book.textContent = "View More"
        book.setAttribute('class', 'bookBtn');

        book.addEventListener("click", async () => {
            localStorage.setItem("viewMore", JSON.stringify(e._id))
            window.location.href = "./viewPage.html";
        })

        dataDiv.append(name, city)

        div.append(img, dataDiv, book)
        showDatabox.append(div)
    })
}

