const chatDisplay = document.getElementById("chat-display");
const chatDisplayleft = document.getElementById("chat-display-left");
const chatDisplayright = document.getElementById("chat-display-right");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

// Function to add a message to the chat display
function addMessage(message, sender) {
  const messageElement = document.createElement("div");
  messageElement.classList.add("message");
  messageElement.classList.add(sender);
  messageElement.innerText = message;
  chatDisplayleft.appendChild(messageElement);

  // Scroll to the bottom of the chat display
  chatDisplay.scrollTop = chatDisplay.scrollHeight;
}

function addMessageright(message, sender) {
  const messageElement = document.createElement("div");
  messageElement.classList.add("message");
  messageElement.classList.add(sender);
  messageElement.innerText = message;
  chatDisplayright.appendChild(messageElement);

  // Scroll to the bottom of the chat display
  chatDisplay.scrollTop = chatDisplay.scrollHeight;
}

// Function to handle user input and bot responses
function handleUserInput() {
  const userMessage = userInput.value;
  addMessageright(userMessage, "user");

  // Simulate bot response (you can replace this with actual chat bot logic)
  if(userMessage.includes("hi")||userMessage.includes("hello")||userMessage.includes("help")){
    const botMessage = "Hello,I am Veronica,How can i help you?";
    setTimeout(function() {
        addMessage(botMessage, "bot");
    },1000);
  }else if(userMessage.includes("refund")){
    const botMessage = "Please,Provide me your booking number. \n follow after this 'refundno-'.";
    setTimeout(function() {
        addMessage(botMessage, "bot");
    },1000);
  }else if(userMessage.includes("contact")){
    const botMessage = "Dear customer,You can contact us here- \n email-exodus@contact.com \n Phone- +1800 4500 6500";
    setTimeout(function() {
        addMessage(botMessage, "bot");
    },1000);
  }else if(userMessage.includes("cancel")){
    const botMessage = "Please,Provide me your booking number. \n Which You want to cancel. \n follow this 'bookingno-'.";
    setTimeout(function() {
        addMessage(botMessage, "bot");
    },1000);
  }else if(userMessage.includes("bookings")){
    getbookings();
  }

  userInput.value = "";
}

// Event listener for the send button and Enter key
sendBtn.addEventListener("click", handleUserInput);


async function getbookings(){
    let token=localStorage.getItem("token")
        try {
            let res=await fetch("http://localhost:4500/trip/history",{
                    method:"GET",
                    headers:{
                        "Content-Type":"application/json",
                        "Authorization":`Bearer ${token}`
                    }
                })
            res=await res.json()
            // const botMessage =res;
            // addMessage(botMessage, "bot");
            console.log(res)
    } catch (error) {
        console.log(error)
    }
};


