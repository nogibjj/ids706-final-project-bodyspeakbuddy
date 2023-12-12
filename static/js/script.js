var widget = document.getElementById("widget");
var chatContainer = document.getElementById("chat-container");
var chatHeader = document.getElementById("chat-header");
var inputField = document.getElementById("user-message");
var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

function openChat() {
  widget.style.display = "none";
  chatContainer.style.display = "block";
}

function minimizeChat() {
  chatContainer.style.display = "none";
  widget.style.display = "block";
}

function closeChat() {
  chatContainer.style.display = "none";
}

function playNotificationSound() {
  var audio = new Audio('/static/sounds/notification.mp3');
  audio.play();
}


chatHeader.addEventListener("mousedown", dragMouseDown);

function dragMouseDown(e) {
  e = e || window.event;
  e.preventDefault();
  pos3 = e.clientX;
  pos4 = e.clientY;
  document.addEventListener("mouseup", closeDragElement);
  document.addEventListener("mousemove", elementDrag);
}

function elementDrag(e) {
  e = e || window.event;
  e.preventDefault();
  pos1 = pos3 - e.clientX;
  pos2 = pos4 - e.clientY;
  pos3 = e.clientX;
  pos4 = e.clientY;
  chatContainer.style.top = chatContainer.offsetTop - pos2 + "px";
  chatContainer.style.left = chatContainer.offsetLeft - pos1 + "px";
}

function closeDragElement() {
  document.removeEventListener("mouseup", closeDragElement);
  document.removeEventListener("mousemove", elementDrag);
}

document.addEventListener("DOMContentLoaded", function() {
  var chatHistory = document.getElementById("chat-history");
  var introductionElement = document.createElement("li");
  var messageContainer = document.createElement("div");
  messageContainer.className = "message";

  var profileContainer = document.createElement("div");
  profileContainer.className = "profile";

  var profileImage = document.createElement("img");
  profileImage.width = 30;
  profileImage.height = 30;
  profileImage.style.borderRadius = "50%";
  profileImage.src = "/static/pic/customer.png";

  var nameElement = document.createElement("div");
  nameElement.className = "name";
  nameElement.textContent = "BodySpeakBuddy";

  profileContainer.appendChild(profileImage);
  profileContainer.appendChild(nameElement); /* Append the name element to the profile container */

  var messageText = document.createElement("span");
  messageText.className = "bubble";
  messageText.textContent = "Welcome to BodySpeakBuddy! I am your personal guide to the world of non-verbal communication. Whether you're curious about facial expressions, gestures, or postures, I'm here to provide expert insights and answers. Let's decode body language together!";
  messageContainer.appendChild(profileContainer); /* Append the profile container to the message container */
  messageContainer.appendChild(messageText);
  introductionElement.appendChild(messageContainer);
  chatHistory.appendChild(introductionElement);
});

document.getElementById("chat-form").addEventListener("submit", function(event) {
  event.preventDefault();
  sendMessage();
});

document.getElementById("send-button").addEventListener("click", function(event) {
  event.preventDefault();
  sendMessage();
});

async function sendMessage() {
  var userMessage = document.getElementById("user-message").value;

  if (userMessage.trim() === "") {
    return;
  }

  var chatHistory = document.getElementById("chat-history");
  var userMessageElement = document.createElement("li");
  var userMessageContainer = document.createElement("div");
  userMessageContainer.className = "message user";
  var userMessageText = document.createElement("span");
  userMessageText.className = "bubble";
  userMessageText.textContent = userMessage;
  userMessageContainer.appendChild(userMessageText);
  userMessageElement.appendChild(userMessageContainer);
  chatHistory.appendChild(userMessageElement);

  document.getElementById("user-message").value = ""; // Clear the text input field
  document.getElementById("user-message").style.height = "auto"; // Reset the textarea height
  adjustTextAreaHeight(); // Adjust textarea height after sending message

  var thinkingElement = document.createElement("li");
  thinkingElement.textContent = "BodySpeakBuddy is typing...";
  thinkingElement.classList.add("thinking-message");
  chatHistory.appendChild(thinkingElement);

  try {
     // const response = await fetch("http://aiavatar.us-east-2.elasticbeanstalk.com/ask/", {
      const response = await fetch("http://192.168.1.138:8080/ask/", {
      
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ question: userMessage })
    });

    const data = await response.json();
    chatHistory.removeChild(thinkingElement);

    var adaMessage = data.chat_history[data.chat_history.length - 1];
    adaMessage.content = adaMessage.content.trimStart();
    adaMessage.content = adaMessage.content.replace(/^\s*[\r\n]/, '');

    var messageElement = document.createElement("li");
    var messageContainer = document.createElement("div");
    messageContainer.className = "message";

    var profileContainer = document.createElement("div");
    profileContainer.className = "profile";

    var profileImage = document.createElement("img");
    profileImage.width = 30;
    profileImage.height = 30;
    profileImage.style.borderRadius = "50%";
    profileImage.src = "/static/pic/customer.png";

    var nameElement = document.createElement("div");
    nameElement.className = "name";
    nameElement.textContent = "BodySpeakBuddy";

    profileContainer.appendChild(profileImage);
    profileContainer.appendChild(nameElement);

    var messageText = document.createElement("span");
    messageText.className = "bubble";
    messageText.innerHTML = adaMessage.content;

    playNotificationSound();
    chatHistory.appendChild(messageElement);

    messageContainer.appendChild(profileContainer);
    messageContainer.appendChild(messageText);
    messageElement.appendChild(messageContainer);
    chatHistory.appendChild(messageElement);

    chatHistory.scrollTop = chatHistory.scrollHeight;

    processMessageLinksAndImages(messageText);

  } catch (error) {
    console.error("Error:", error);
    chatHistory.removeChild(thinkingElement);
  }
}



function processMessageLinksAndImages(messageText) {
  var messageContainer = messageText.parentNode;

  // Regular expression to match URLs
  var urlRegex = /((http(s)?:\/\/)?(([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})|(\b(?:\d{1,3}\.){3}\d{1,3}\b))(\:\d+)?(\/\S*)?)/gi;

  // Regular expression to match numbered points
  var numberedPointRegex = /^\d+\./;

  // Replace URLs with anchor elements
  messageText.innerHTML = messageText.innerHTML.replace(urlRegex, function (url) {
    var href = (!/^https?:\/\//i.test(url)) ? 'http://' + url : url;

    // Decode any HTML entities (e.g., %3Cbr%3E -> <br>)
    href = decodeURIComponent(href);

    // Check if the URL is for an image
    var imageRegex = /\.(jpe?g|png|gif|bmp)$/i;
    if (imageRegex.test(href)) {
      return '<img src="' + href + '" class="message-image" alt="Image from BodySpeakBuddy" onclick="zoomImage(this.src)">';
    } else {
      // Remove the dot at the end of the link
      href = href.replace(/\.$/, '');

      return '<a href="' + href + '" target="_blank" class="link">' + url + '</a>';
    }
  });


  // Split message into lines
  var lines = messageText.innerHTML.split('\n');
  var output = [];
  if (lines.length > 0) {
    lines[0] = lines[0].trimStart();
  }

  lines.forEach(function (line, index) {
    if (line.trim() === "") {
      return; // Skip empty lines
    }

    if (numberedPointRegex.test(line) && !urlRegex.test(line)) {
      // Handle numbered points
      var numberedPoints = line.match(numberedPointRegex);
      var text = line.replace(numberedPointRegex, ''); // Remove numbered point from line
      output.push('<div class="numbered-point">' + numberedPoints[0] + '</div><div class="numbered-text">' + text + '</div>');
    } else {
      // Handle regular lines
      output.push('<div class="regular-text">' + line + '</div>');
    }
  });

  messageText.innerHTML = output.join('');
}


function zoomImage(src) {
  var overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
  overlay.style.display = "flex";
  overlay.style.justifyContent = "center";
  overlay.style.alignItems = "center";
  overlay.style.zIndex = "1000";

  var image = document.createElement("img");
  image.src = src;
  image.style.maxWidth = "80%";
  image.style.maxHeight = "80%";
  image.style.borderRadius = "10px";
  image.style.cursor = "zoom-out"; // Add zoom-out cursor style

  overlay.appendChild(image);

  overlay.addEventListener("click", function () {
    document.body.removeChild(overlay);
  });

  document.body.appendChild(overlay);
}



function handleKeyDown(event) {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    sendMessage();
  }
}

function adjustTextAreaHeight() {
  var textarea = document.getElementById("user-message");
  textarea.style.height = "auto"; // Reset the height
  textarea.style.height = textarea.scrollHeight + "px"; // Set the height to fit the content
}