const titleEl = document.querySelector("#title");
const addressEl = document.querySelector("#address");
const descriptionEl = document.querySelector("#description");
const priceEl = document.querySelector("#price");
const ratingEl = document.querySelector("#rating");
const amenities = document.getElementById('amenities');
const optionsbox = document.querySelector('#bookingoptionsbox');
const token = localStorage.getItem('token');
const detailsBox = document.getElementById('detailsbox')


window.onload = async () => {
    const item_id = JSON.parse(localStorage.getItem("viewMore"));

    try {
        const res = await fetch("https://exodustravels.cyclic.app/search/view", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ _id: item_id })
        });
        const data = await res.json();
        document.title = `${data.name || data.airline} | Exodus Travels`;
        titleEl.textContent = data.name || data.airline || 'Failed to fetch';
        addressEl.textContent = data.address || `${data.departure.airport} to ${data.arrival.airport}`;
        ratingEl.textContent = data.rating ? `Ratings : ${data.rating}` : 'Most Popular';
        descriptionEl.textContent = data.description || 'No details available!';
        optionsbox.innerHTML = handlePricesOption(data.prices);
        detailsBox.innerHTML = handleDetailsBox(data);
        amenities.innerHTML = handleServices(data.services);
        if (data.images && data.images.length > 0) {
            imageLinks = data.images
        } else {
            imageLinks = ['https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png'];
        }
        // Initial image display
        showImage(currentIndex);

    } catch (error) {
        console.log(error);
    }
};

function handleServices(arr) {
    if (arr && arr.length > 0) {
        return arr.map((ele) => `<p>${ele}</p>`).join('');
    } else {
        return 'No details available!';
    }
}

function handlePricesOption(obj) {
    if (obj && Object.keys(obj).length > 0) {
        let str = '';
        let n = 1;
        for (let key in obj) {
            str += `<div class="option-card">
            <h4>${key}</h4>
            <p><strong>Price : </strong><span id="price2">${obj[key]}</span> Rs</p>
            <button id="BookBtn${n++}" class='BookBtn' onclick="handleBookBtn('${key}')">Reserve now</button>
          </div>`;
        }
        return str;
    } else {
        return 'No details available!';
    }
}

function handleDetailsBox(data) {

    // Format the date to a more friendly and readable format
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZoneName: 'short'
    };

    if (data.departure && data.arrival) {
        detailsBox.innerHTML = ''

        let str = `
    <p><strong>Departure: </strong>${data.departure.airport}</p>
    <p><strong>Terminal: </strong>${data.departure.terminal}</p>
    <p><strong>Date Time: </strong>${new Date(data.departure.datetime).toLocaleDateString('en-US', options)}</p>
    <p><strong>Arrival: </strong>${data.arrival.airport}</p>
    <p><strong>Terminal: </strong>${data.arrival.terminal}</p>
    <p><strong>Date Time: </strong>${new Date(data.arrival.datetime).toLocaleDateString('en-US', options)}</p>
    `

        return str
    } else {
        return 'No details available!'
    }
}

var imageLinks = []

const sliderImage = document.getElementById('sliderImage');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentIndex = 0;

function showImage(index) {
    sliderImage.src = imageLinks[index];
}

function nextImage() {
    currentIndex = (currentIndex + 1) % imageLinks.length;
    showImage(currentIndex);
}

function prevImage() {
    currentIndex = (currentIndex - 1 + imageLinks.length) % imageLinks.length;
    showImage(currentIndex);
}

nextBtn.addEventListener('click', nextImage);
prevBtn.addEventListener('click', prevImage);

function handleBookBtn(val) {
    if (token) {
        fetch('https://exodustravels.cyclic.app/user/validate-token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
            .then((res) => res.json())
            .then((data) => {
                localStorage.setItem('plan', val)
                window.location.href = `../Pages/payment.html`;
            })
            .catch((error) => {
                alert('Session Experied,Please login again!')
                window.location.href = './login.html'
            });
    } else {
        alert("Please login first!")
        window.location.href = './login.html'
    }
}
