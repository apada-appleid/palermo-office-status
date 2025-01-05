let inOffice = false;

document.addEventListener("DOMContentLoaded", () => {
  fetch("/status")
    .then((response) => response.json())
    .then((data) => {
      updateStatus(data.inOffice);
    });

  document
    .getElementById("toggleButton")
    .addEventListener("click", function () {
      const confirmMessage = inOffice 
        ? "آیا مطمئن هستید که کسی در دفتر نیست؟" 
        : "آیا مطمئن هستید که کسی در دفتر است؟";
      
      if (confirm(confirmMessage)) {
        fetch("/toggle", { method: "POST" })
          .then((response) => response.json())
          .then((data) => {
            updateStatus(data.inOffice);
          });
      }
    });
});

function updateStatus(isInOffice) {
  inOffice = isInOffice;
  const indicator = document.getElementById("statusIndicator");
  const statusText = document.getElementById("statusText");
  const toggleButton = document.getElementById("toggleButton");

  indicator.style.width = "200px";
  indicator.style.height = "200px";
  indicator.style.borderRadius = "50%";
  
  statusText.style.fontSize = "48px";
  statusText.style.fontWeight = "bold";
  statusText.style.margin = "20px 0";

  if (isInOffice) {
    indicator.style.backgroundColor = "green";
    statusText.textContent = "Palermo is Open";
    toggleButton.textContent = "Nobody is in the office";
  } else {
    indicator.style.backgroundColor = "red";
    statusText.textContent = "Palermo is Closed";
    toggleButton.textContent = "Someone is in the office";
  }
}
