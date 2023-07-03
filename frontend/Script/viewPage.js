let titleEl = document.querySelector("#title")
let addressEl = document.querySelector("#address")
let descriptionEl = document.querySelector("#description")
let priceEl = document.querySelector("#price")


window.onload = async () => {
    let item_id = JSON.parse(localStorage.getItem("viewMore"))

    try {
        let res = await fetch("http://localhost:4500/search/view", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ _id: item_id })
        })
        res = await res.json()
        console.log(res)
        titleEl.innerHTML = res.name
        addressEl.innerHTML = res.address
        // descriptionEl.innerHTML=res.from
        priceEl.innerHTML = res.city
    } catch (error) {
        console.log(error)
    }
}


const imageLinks = [
    'https://www.usatoday.com/gcdn/-mm-/05b227ad5b8ad4e9dcb53af4f31d7fbdb7fa901b/c=0-64-2119-1259/local/-/media/USATODAY/USATODAY/2014/08/13/1407953244000-177513283.jpg',
    'https://files01.pna.gov.ph/ograph/2021/05/18/mmm.jpg',
    'https://img1.10bestmedia.com/Images/Photos/378649/Park-Hyatt-New-York-Manhattan-Sky-Suite-Master-Bedroom-low-res_55_660x440.jpg',
];

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

// Initial image display
showImage(currentIndex);
