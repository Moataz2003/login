// DOM Elements
const app = document.getElementById("app");

// Utils
const navigateTo = (page) => {
  switch (page) {
    case "register":
      renderRegister();
      break;
    case "login":
      renderLogin();
      break;
    case "home":
      renderHome();
      break;
  }
};

// Check if user is logged in
const checkAuth = () => {
  const loggedInUser = localStorage.getItem("loggedInUser");
  return loggedInUser ? JSON.parse(loggedInUser) : null;
};

// Render Register Page
const renderRegister = () => {
  app.innerHTML = `
    <form id="registerForm">
      <h2>Register</h2>
      <input type="text" id="name" placeholder="Name" required />
      <input type="email" id="email" placeholder="Email" required />
      <input type="password" id="password" placeholder="Password" required />
      <button type="submit">Register</button>
      <p class="error" id="error"></p>
      <p>Already have an account? <a href="#" id="loginLink">Login</a></p>
    </form>
  `;

  document.getElementById("registerForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.find((user) => user.email === email)) {
      document.getElementById("error").innerText = "Email already exists!";
      return;
    }

    users.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(users));
    navigateTo("login");
  });

  document.getElementById("loginLink").addEventListener("click", () => {
    navigateTo("login");
  });
};

// Render Login Page
const renderLogin = () => {
  app.innerHTML = `
    <form id="loginForm">
      <h2>Login</h2>
      <input type="email" id="email" placeholder="Email" required />
      <input type="password" id="password" placeholder="Password" required />
      <button type="submit">Login</button>
      <p class="error" id="error"></p>
      <p>Don't have an account? <a href="#" id="registerLink">Register</a></p>
    </form>
  `;

  document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((user) => user.email === email);

    if (!user || user.password !== password) {
      document.getElementById("error").innerText = "Invalid email or password!";
      return;
    }

    localStorage.setItem("loggedInUser", JSON.stringify(user));
    navigateTo("home");
  });

  document.getElementById("registerLink").addEventListener("click", () => {
    navigateTo("register");
  });
};

// Render Home Page
const renderHome = () => {
  const user = checkAuth();
  if (!user) {
    navigateTo("login");
    return;
  }

  app.innerHTML = `
    <div>
      <h2>Welcome, ${user.name}!</h2>
      <button id="logout">Logout</button>
    </div>
  `;

  document.getElementById("logout").addEventListener("click", () => {
    localStorage.removeItem("loggedInUser");
    navigateTo("login");
  });
};

// Initial Render
const init = () => {
  const user = checkAuth();
  navigateTo(user ? "home" : "login");
};

init();
