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
        let res = await fetch("http://localhost:4500/search/view", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ _id: item_id })
        })
        res = await res.json()
        showImg.style.backgroundImage = 'url(https://cdn.dribbble.com/users/523866/screenshots/4044272/ezgif-4-21c63605ef.gif)';
        bookingloaction.textContent = res.departure.airport
        const price = res.prices[localStorage.getItem('plan')]
        BookingTimes.innerHTML = new Date(res.departure.datetime).toLocaleDateString('en-US', options) || '11:00 AM'
        BasePriceEl.textContent = `${price}`
        ToatlPriceEl.textContent = `${price + 150}`
    } catch (error) {
        console.log(error)
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
    fetch('http://localhost:4500/order/booknow', {
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





