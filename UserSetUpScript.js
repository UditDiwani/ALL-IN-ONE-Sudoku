const API_URL = "http://127.0.0.1:3000/api";
let token = null;

document.getElementById("registerBtn").addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();
  if (data.token) {
    token = data.token;
    localStorage.setItem("token", token);
    localStorage.setItem("userId",data._id);

    window.location.href = "./index.html";
  } else {
    alert(data.error);
  }
});

document.getElementById("loginBtn").addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();
  console.log(data);
  if (data.token) {
    token = data.token;
    localStorage.setItem("token", token);
    localStorage.setItem("userId",data._id);
    window.location.href = "./index.html";

  } else {
    alert(data.error);
  }
});
