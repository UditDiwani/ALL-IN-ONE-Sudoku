const API_URL =
  location.hostname === "localhost"
    ? "http://127.0.0.1:3000/api"
    : "https://sudoku-backend.onrender.com/api";
let token = null;

document.getElementById("registerBtn").addEventListener("click", async () => {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    alert("Please enter both email and password.");
    return;
  }
  if (!email.includes("@")) {
    alert("Please enter a valid email address.");
    return;
  }
  if (password.length < 6) {
    alert("Password must be at least 6 characters.");
    return;
  }

  try {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (res.ok && data.token) {
      token = data.token;
      localStorage.setItem("token", token);
      localStorage.setItem("userId",data._id);
      window.location.href = "./index.html";
    } else {
      alert(data.error || "Registration failed. Please try again.");
    }
  } catch (error) {
    console.error("Registration error:", error);
    alert("Network error during registration. Please check your connection.");
  }
});

document.getElementById("loginBtn").addEventListener("click", async () => {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    alert("Please enter both email and password.");
    return;
  }

  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    console.log(data);
    if (res.ok && data.token) {
      token = data.token;
      localStorage.setItem("token", token);
      localStorage.setItem("userId",data._id);
      window.location.href = "./index.html";
    } else {
      alert(data.error || "Login failed. Please check your credentials.");
    }
  } catch (error) {
    console.error("Login error:", error);
    alert("Network error during login. Please check your connection.");
  }
});
