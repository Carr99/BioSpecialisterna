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

        <a href="/#" class="buttonLink">Sign In</a>
        <a href="/register" class="buttonLink">Register</a>
      </div>
    `;
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
        <a href="/register" class="buttonLink" id="registerNewAccountBtn">Register</a>
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
    sendToDb(query)
}

function sendToDb(data) {
    fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }).then(res => {
        // Do something with response from server
    });
}