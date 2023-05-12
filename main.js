import "./style.css";

class Auth {
  constructor(data) {
    this.endpoint = data.google.endpoint;
    this.params = data.google.params;
    this.signInId = data.google.buttonId;

    this.form = null;
    this.button = document
      .getElementById(this.signInId)
      .addEventListener("click", this.signIn.bind(this));

    this.facebookInit();
    console.log(FB);
  }

  facebookInit() {
    FB.init({
      appId: "190302513947119",
      cookie: true,
      xfbml: true,
      version: "v16.0",
    });

    FB.AppEvents.logPageView();
  }

  createForm() {
    this.form = document.createElement("form");
    this.form.setAttribute("method", "GET");
    this.form.setAttribute("action", this.endpoint);
  }

  fillForm() {
    for (let param in this.params) {
      let input = document.createElement("input");
      input.setAttribute("type", "hidden");
      input.setAttribute("name", param);
      input.setAttribute("value", this.params[param]);
      this.form.appendChild(input);
    }
  }

  signIn() {
    this.createForm();
    this.fillForm();
    document.body.appendChild(this.form);
    this.form.submit();
  }
}

new Auth({
  google: {
    endpint: "https://accounts.google.com/o/oauth2/v2/auth",

    client_id:
      "724532599525-tlq05ljj3nku6e8oh7r6ktcudnq4pins.apps.googleusercontent.com",
    redirect_uri: "http://localhost:5173/profile.html",
    response_type: "token",
    scope: "https://www.googleapis.com/auth/userinfo.profile", // allowed to change or add more scopes, just pass another scope after space
    include_granted_scopes: "true",
    state: "pass-through-value",

    buttonId: "google",
  },
  facebook: {},
});
