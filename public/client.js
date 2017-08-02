document.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault();

  var xhr = new XMLHttpRequest();
  var url = "/upload";
  
  xhr.open("POST", url);
  
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status == 200) {
      var answer = JSON.parse(xhr.response);
      console.log(answer);
      
    }
  }
  var formData = new FormData(this);
  xhr.send(formData);
});
