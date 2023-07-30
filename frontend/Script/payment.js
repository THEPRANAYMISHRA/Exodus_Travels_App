// Retrieving letiables from the HTML
let firstNameInput = document.getElementById('first-name');
let lastNameInput = document.getElementById('last-name');
let mobileNumberInput = document.getElementById('mobile-number');
let cardNumberInput = document.getElementById('card-number');
let cardholderNameInput = document.getElementById('cardholder-name');
let expirationDateInput = document.getElementById('expiration-date');
let cvvInput = document.getElementById('cvv');
let amountInput = document.getElementById('amount');
let checkinform = document.getElementById('checkin-form');
let paymentform = document.getElementById('payment-form');
let token = localStorage.getItem('token')
let showImg = document.getElementById('showImg')
let bookingloaction = document.getElementById('bookingloaction')
let BasePriceEl = document.getElementById('BasePrice')
let ToatlPriceEl = document.getElementById('TotalPrice')
let dates = document.getElementById('selectdate')
let BookingTimes = document.getElementById('BookingTimes')
let Bookingdates = document.getElementById('Bookingdates')
let dynamicInputs = document.getElementsByClassName('dynamicInputs')


flatpickr("#selectdate", { mode: "range", minDate: "today" });

const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZoneName: 'short'
};

let item_id = JSON.parse(localStorage.getItem("viewMore"))

window.onload = async () => {
    try {
        let res = await fetch("https://exodustravels.onrender.com/search/view", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ _id: item_id })
        })
        res = await res.json()
        showImg.style.backgroundImage = 'url(https://cdn.dribbble.com/users/523866/screenshots/4044272/ezgif-4-21c63605ef.gif)';
        if (res.departure) {
            bookingloaction.textContent = res.departure.airport;
            BookingTimes.innerHTML = new Date(res.departure.datetime).toLocaleDateString('en-US', options)
            dynamicInputs.style.display = 'none'
        } else {
            bookingloaction.textContent = res.city;
            BookingTimes.innerHTML = '11:00 AM';
        }
        const price = res.prices[localStorage.getItem('plan')]
        BasePriceEl.textContent = `${price}`
        ToatlPriceEl.textContent = `${price + 150}`
    } catch (error) {
        alert('Failed to fetch!,Try again!')
    }
}

// Event listener for the submit button for payments;
paymentform.addEventListener('submit', function (event) {
    event.preventDefault();

    let firstName = firstNameInput.value;
    let lastName = lastNameInput.value;
    let mobileNumber = mobileNumberInput.value;
    let cardNumber = cardNumberInput.value;
    let cardholderName = cardholderNameInput.value;
    let selecteddates = dates.value;

    let payload = {
        item_id: item_id,
        name: firstName + " " + lastName,
        mobileNumber: mobileNumber,
        cardNumber: cardNumber,
        cardholderName: cardholderName,
        dates: selecteddates,
        booking: JSON.parse(localStorage.getItem('Searching for')),
        amount: ToatlPriceEl.innerText,
    };

    // uploading data to server
    fetch('https://exodustravels.onrender.com/order/booknow', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(payload)
    })
        .then((res) => res.json())
        .then((data) => {
            alert(data.msg)
            window.location.href = '../index.html'
        })
        .catch((error) => {
            alert('Session Experied,Please login again!')
            localStorage.removeItem('token');
            window.location.href = './login.html'
        });
});


dates.addEventListener('change', () => {
    let date = dates.value.split(" ")

    Bookingdates.textContent = dates.value

    if (date[0], date[2]) {
        ToatlPriceEl.textContent = Number(BasePriceEl.innerText) * calculateDaysBetweenDates(date[0], date[2]) + 150
    } else {
        ToatlPriceEl.textContent = Number(BasePriceEl.innerText)
    }
})

function calculateDaysBetweenDates(startDate, endDate) {
    const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    const timeDifference = endDateObj - startDateObj;

    const numberOfDays = Math.round(timeDifference / oneDayInMilliseconds);

    return numberOfDays + 1;
}






