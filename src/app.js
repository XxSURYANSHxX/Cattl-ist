const BACKEND_URL = "http://localhost:5000";

const chatContainer = document.getElementById("chat-container");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
const langSelector = document.getElementById("language-selector");
const imageInput = document.getElementById("image-input");
const imageBtn = document.getElementById("image-btn");


function addMessage(text, sender = "bot", imageUrl = null) {
  const div = document.createElement("div");
  div.classList.add("message", sender);

  if (imageUrl) {
    const img = document.createElement("img");
    img.src = imageUrl;
    img.classList.add("rounded", "mb-2", "max-w-full");
    div.appendChild(img);
  }
  

  if (text.trim() !== "") {
    const p = document.createElement("p");
    p.textContent = text;
    div.appendChild(p);
  }

  chatContainer.appendChild(div);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

// --- Send Text Message ---
async function sendMessage(message) {
  addMessage(message, "user");
  userInput.value = "";

  try {
    const res = await fetch(`${BACKEND_URL}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, lang: langSelector.value }),
    });
    const data = await res.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, an error occurred.";
    addMessage(reply, "bot");
  } catch (err) {
    addMessage("Error: " + err.message, "bot");
  }
}


function sendImage(file) {
  addMessage("Sending image...", "user");
  const reader = new FileReader();

  reader.onload = async (e) => {
    const base64 = e.target.result.split(",")[1];
    addMessage("", "user", e.target.result); 

    
    imageInput.value = '';
    userInput.focus(); 

    try {
      const res = await fetch(`${BACKEND_URL}/image`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ base64, mimeType: file.type, lang: langSelector.value }),
      });
      const data = await res.json();
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Breed not recognized.";
      addMessage(reply, "bot");
    } catch (err) {
      addMessage("Error: " + err.message, "bot");
    }
  };
  reader.readAsDataURL(file);
}

// --- Event Listeners ---
sendBtn.addEventListener("click", () => {
  if (userInput.value.trim() !== "") sendMessage(userInput.value.trim());
});

userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && userInput.value.trim() !== "") sendMessage(userInput.value.trim());
});

imageBtn.addEventListener("click", () => imageInput.click());

imageInput.addEventListener("change", (e) => {
  if (e.target.files.length > 0) sendImage(e.target.files[0]);
});