function login() {

    document.querySelector('.loginPage').innerHTML = `
      <h2>Login</h2>
      <div class="loginPage">
        <h3 style="color: white">Email</h3>
        <input type="text" id="email" class="inputBox" placeholder="name@email.com">
        <h3 style="color: white">Password</h3>
        <input type="text" id="password" class="inputBox" placeholder="Enter your Password"><br>
        <a href="/forgotPassword" style="text-decoration: none; color: white; margin-left: 60%">forgot password?</a><br>
        <a href="/#" class="buttonLink">Login</a>
        <a href="/register" class="buttonLink">Register</a>
      </div>
    `;
}

function forgotPassword() {

    document.querySelector('.forgotPassword').innerHTML = `
      <h2>Forgot Password</h2>
      <div class="loginPage">
        <h3 style="color: white">Enter Email</h3>
        <input type="text" id="email" class="inputBox" placeholder="name@email.com">
        <a href="/register" class="buttonLink">Send Reset Email</a>
      </div>
    `;
}


function registerPage() {

    document.querySelector('.register').innerHTML = `
      <h2>Register new Account</h2>
      <div class="loginPage">
        <h3 style="color: white">Email</h3>
        <input type="text" id="email" class="inputBox" placeholder="name@email.com">
        <h3 style="color: white">Password</h3>
        <input type="text" id="password" class="inputBox" placeholder="Enter your Password"><br>
        <h3 style="color: white">Confirm Password</h3>
        <input type="text" id="confirmPassword" class="inputBox" placeholder="Confirm Password"><br>
        <a href="/register" id="registerNewAccountBtn" class="buttonLink">Register</a>
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