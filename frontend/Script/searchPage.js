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
        alert("Failed to fetch data!")
        console.log(error)
    }
}

//showData==========================================================

function DisplayFlights(data) {
    showDatabox.innerHTML = ''

    data.forEach((e) => {
        let div = document.createElement("div")

        let dataDiv = document.createElement("div")

        let imgDiv = document.createElement("div")

        imgDiv.style.backgroundImage = `URL("https://i.gifer.com/747o.gif")`

        let company = document.createElement("h5")
        company.textContent = `${e.airline}`

        let from = document.createElement("h6")
        from.textContent = `From: ${e.departure.airport} `

        let arrow = document.createElement("img")
        arrow.src = "https://cdn-icons-png.flaticon.com/128/724/724954.png"

        let to = document.createElement("h6")
        to.textContent = `To: ${e.arrival.airport} `

        let book = document.createElement("button")
        book.textContent = "View More"
        book.setAttribute('class', 'bookBtn');

        book.addEventListener("click", async () => {
            localStorage.setItem("viewMore", JSON.stringify(e._id))
            window.location.href = "./viewPage.html";
        })

        dataDiv.append(company, from, to)

        div.append(imgDiv, dataDiv, book)
        showDatabox.append(div)
    })

}

function DisplayStays(data) {
    showDatabox.innerHTML = ''

    data.forEach((e) => {
        let div = document.createElement("div")

        let dataDiv = document.createElement("div")

        let imgDiv = document.createElement("div")

        imgDiv.style.backgroundImage = `URL('${e.image || "https://static.leonardo-hotels.com/image/executive-room-with-king-bed_35ba711c8e3052877659372a86e4bb3a_2048x1365_desktop_2.jpeg"}')`

        let name = document.createElement("h5")
        name.textContent = `${e.name}`

        let address = document.createElement("h6")
        address.textContent = `${e.address} `

        let city = document.createElement("h6")
        city.textContent = `${e.city} `

        let rating = document.createElement("h6")
        rating.textContent = `Ratings:${e.rating} `

        let book = document.createElement("button")
        book.textContent = "View More"
        book.setAttribute('class', 'bookBtn');

        book.addEventListener("click", async () => {
            localStorage.setItem("viewMore", JSON.stringify(e._id))
            window.location.href = "./viewPage.html";
        })

        dataDiv.append(name, address, city, rating)
        div.append(imgDiv, dataDiv, book)
        showDatabox.append(div)
    })
}

function DisplayCars(data) {
    showDatabox.innerHTML = ''

    data.forEach((e) => {
        let div = document.createElement("div")

        let dataDiv = document.createElement("div")

        let imgDiv = document.createElement("div")

        imgDiv.style.backgroundImage = `URL('${e.image || "https://www.ctexpress.in/no-image.png"}')`

        let name = document.createElement("h5")
        name.textContent = `${e.name}`

        let city = document.createElement("h6")
        city.textContent = `From: ${e.city} `

        let book = document.createElement("button")
        book.textContent = "View More"
        book.setAttribute('class', 'bookBtn');

        book.addEventListener("click", async () => {
            localStorage.setItem("viewMore", JSON.stringify(e._id))
            window.location.href = "./viewPage.html";
        })

        dataDiv.append(name, city)

        div.append(imgDiv, dataDiv, book)
        showDatabox.append(div)
    })
}

