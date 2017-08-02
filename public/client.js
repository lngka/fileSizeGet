const mainNode = document.querySelector("main");
const formNode = document.querySelector("form");
const waitNotification = document.createTextNode("Processing your file...");


formNode.addEventListener("submit", function (event) {
  event.preventDefault();
  pleaseWait();
  
  
  // init request to server
  var xhr = new XMLHttpRequest();
  var url = "/upload";
  xhr.open("POST", url);
  
  // collect form data
  var formData = new FormData(this);
  
  // send request
  xhr.send(formData);
  
  // callback when server sent response
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status == 200) {
      
      // convert response to string and show
      var jsonAnswer = JSON.parse(xhr.response);
      showResult(JSON.stringify(jsonAnswer)); // this prevents display of escaped characters
    }
  }
});

function pleaseWait() {
  mainNode.innerHTML = " ";
  mainNode.appendChild(waitNotification);
}

function showResult(string) {
  mainNode.innerHTML = " ";
  mainNode.appendChild(document.createTextNode(string));
  mainNode.appendChild(document.createElement("br"));
  mainNode.appendChild(document.createElement("br"));
  mainNode.appendChild(document.createTextNode("Send me another one?"));
  mainNode.appendChild(formNode);
}