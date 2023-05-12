class ManageAuth {
  constructor() {}
}

new GoogleManage();

let params = {};
let regex = /([^&=]+)=([^&]*)/g;
let decodedStr = null;

let button = document.getElementById("logout");

button.addEventListener("click", logout);

function logout() {
  fetch(`https://oauth2.googleapis.com/revoke?token=${info["access_token"]}`, {
    method: "POST",
    headers: {
      "Content-type": "application/x-www-form-urlencoded",
    },
  }).then(() => {
    location.href = "/";
  });
}

while ((decodedStr = regex.exec(location.href))) {
  console.log(decodedStr);
  params[decodeURIComponent(decodedStr[1])] = decodeURIComponent(decodedStr[2]);
}

if (Object.keys(params).length > 0) {
  localStorage.setItem("authGoogle", JSON.stringify(params));
}

// hide token from URI

window.history.pushState({}, document.title, "/" + "profile.html");

let info = JSON.parse(localStorage.getItem("authGoogle"));

fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
  headers: {
    Authorization: `Bearer ${info["access_token"]}`,
  },
})
  .then((data) => data.json())
  .then((info) => {
    document.getElementById("name").textContent = info.name;
    document.getElementById("image").setAttribute("src", info.picture);
  });
