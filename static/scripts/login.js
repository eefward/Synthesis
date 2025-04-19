document.addEventListener("DOMContentLoaded", () => {
    const toggleLink = document.getElementById("toggle-form");
    const loginForm = document.getElementById("login-form");
    const signupForm = document.getElementById("signup-form");
    const formSubtitle = document.getElementById("form-subtitle");
  
    let isLogin = true;
  
    toggleLink.addEventListener("click", (e) => {
      e.preventDefault();
      isLogin = !isLogin;
  
      loginForm.classList.toggle("hidden");
      signupForm.classList.toggle("hidden");
  
      if (isLogin) {
        formSubtitle.textContent = "Log in now";
        toggleLink.textContent = "Sign up";
      } else {
        formSubtitle.textContent = "Register now";
        toggleLink.textContent = "Back to login";
      }
    });
  
    signupForm.addEventListener("submit", async (e) => {
      e.preventDefault();
  
      const username = document.getElementById("signup-username").value;
      const password = document.getElementById("signup-password").value;
  
      try {
        const response = await fetch("/signup", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({ username, password }),
        });
  
        if (response.ok) {
          alert("Signup successful! Go back to login.");
          signupForm.reset();
          toggleLink.click();
        } 
      } catch (err) {
        console.error("Signup failed:", err);
        alert("Something went wrong. Please try again.");
      }
    });
  });
  