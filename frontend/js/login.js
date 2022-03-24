function login() {

    document.querySelector('.loginPage').innerHTML = `
      <h2>Login</h2>
      <div class="loginPage">
        <h3 style="color: white">Email</h3>
        <div class="input-container">
            <i class="fa fa-envelope icon"></i>
            <input class="input-field" type="text" id="email" placeholder="name@email.com">
        </div>
        <h3 style="color: white">Password<br></h3>
        <div class="input-container">
            <i class="fa fa-key icon"></i>
            <input class="input-field" id="password" type="password" placeholder="Enter your password">
        </div>
        <div class="passwordForgot">
            <a href="/forgotPassword" id="forgotPassword">Forgot password?</a>
        </div>

        <a class="buttonLink" style="cursor:pointer;" id="loginBtn">Sign In</a>
        <a href="/register" class="buttonLink">Register</a>
      </div>
    `;
    document.querySelector("#loginBtn").addEventListener("click", function () {
        let email = document.querySelector("#email").value;
        let password = document.querySelector("#password").value;
        let user = {
            "email": email,
            "password": password
        }
        sendLogin(user)
    });
}

function forgotPassword() {

    document.querySelector('.forgotPassword').innerHTML = `
      <h2>Forgot Password</h2>
      <div class="loginPage">
        <div class="input-container">
            <i class="fa fa-envelope icon"></i>
            <input class="input-field" type="text" id="email" placeholder="name@email.com">
        </div>
        <a href="/register" class="buttonLink">Send Email</a>
      </div>
    `;
}


function registerPage() {

    document.querySelector('.register').innerHTML = `
      <h2>Register new Account</h2>
      <div class="loginPage">
        <h3 style="color: white">Email</h3>
        <div class="input-container">
            <i class="fa fa-envelope icon"></i>
            <input type="text" id="email" class="input-field" placeholder="name@email.com">
        </div>
        <h3 style="color: white">Password<br></h3>
        <div class="input-container">
            <i class="fa fa-key icon"></i>
            <input type="text" id="password" class="input-field" placeholder="Enter your Password"><br>
        </div>
        <div class="input-container">
            <i class="fa fa-key icon"></i>
            <input type="text" id="confirmPassword" class="input-field" placeholder="Confirm Password"><br>
        </div>
        <a class="buttonLink" id="registerNewAccountBtn" style="cursor: pointer">Register</a>
      </div>
    `;

    document.querySelector("#registerNewAccountBtn").addEventListener("click", registerNewAccount);
}

function registerNewAccount() {
    let email = document.querySelector("#email").value;
    let password = document.querySelector("#password").value;

    let query = {
        "email": email,
        "password": password
    }
    registerUser(query)
}

function sendLogin(data) {
    fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(res => {
        if (res.status === 409) {
            document.querySelector("#email").value = "Account already exists"
        } else {
            history.pushState(null, null, '/');
            router();
            let loginLink = document.getElementById('loginLink');
            loginLink.hidden = true;
            let accountLink = document.getElementById('accountLink');
            accountLink.hidden = false;
        }
    });

}

function registerUser(data) {
    fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(async res => {
        if (res.status === 409) {
            document.querySelector("#email").value = "Account already exists"
        } else {

            // Redirect user to main page
        }
    });

}
