if (Notification.permission !== "granted") {
  Notification.requestPermission();
}

let reminders = JSON.parse(localStorage.getItem("reminders")) || [];

const messageInput = document.getElementById("message");
const timeInput = document.getElementById("time");
const list = document.getElementById("reminderList");

document.getElementById("addBtn").addEventListener("click", () => {
  const message = messageInput.value.trim();
  const time = timeInput.value;

  if (!message || !time) {
    alert("Hey! Don’t forget to fill both fields 😊");
    return;
  }

  reminders.push({ message, time });
  localStorage.setItem("reminders", JSON.stringify(reminders));

  messageInput.value = "";
  timeInput.value = "";

  renderReminders();
});

function renderReminders() {
  list.innerHTML = "";

  reminders.forEach((r) => {
    const li = document.createElement("li");
    li.className = "reminder-item";

    li.innerHTML = `
      <div>
        <div class="reminder-msg">${r.message}</div>
        <div class="reminder-time">⏰ ${r.time}</div>
      </div>
    `;

    list.appendChild(li);
  });
}

function checkReminders() {
  const now = new Date();
  const currentTime = now.toTimeString().slice(0, 5);

  reminders.forEach((r) => {
    if (r.time === currentTime) {
      new Notification("🌙 Late Night Reminder", {
        body: r.message
      });
    }
  });
}

setInterval(checkReminders, 60000);
renderReminders();
