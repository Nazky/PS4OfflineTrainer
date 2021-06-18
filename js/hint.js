const notificationTexts = [
  "For Days Gone cheat |Infinite Ammo and/or Infinite Bandages| please be aware it may cause issues with crafting Molotovs. However... if you cannot craft them, get caught in a trap and it will fix this."
];

const addButton = document.querySelector(".add");
const notificationPosition = document.body.querySelector("div");
const margin = 16;

const addNotification = () => {
  // Create notification
  const notification = document.createElement("div");
  // Add class "notification"
  notification.classList.add("notification");
  // Pick random content for notification
  const randomMessage =
    notificationTexts[Math.floor(Math.random() * notificationTexts.length)];
  // Insert random content and close button
  notification.innerHTML = `
                    <div class="content">
            <h4 class="title">New message!</h4>
            <p class="description">${randomMessage}</p>
          </div>
          <button class="close" aria-label="Dismiss notification">Close</button>
        `;
  // Get close button within notification
  const closeButton = notification.querySelector(".close");
  // Listen for the button and attach "removeNotification" function to it
  closeButton.addEventListener("click", removeNotification);
  // Position notification
  notification.style.top = `${margin}px`;
  // Add notification on the page
  notificationPosition.prepend(notification);
  // Move other notifications down
  // 1. Get height of the newly added notification
  const currentHeight = notification.offsetHeight;
  // 2. Get the rest of the notifications and turn them into an array
  const restNotifications = Array.from(
    document.querySelectorAll(".notification")
  ).slice(1);
  // 3. Add the currently added notification's height to the rest of the notifications
  restNotifications.forEach((item) => {
    item.style.top = `${parseInt(item.style.top) + currentHeight + margin}px`;
  });
};

const removeNotification = (event) => {
  // Get clicked close button
  const closeButton = event.currentTarget;
  // Get the notification
  const notification = closeButton.parentNode;
  // Get the height of the clicked notification
  const currentHeight = notification.offsetHeight;
  // Define rest of the notifications
  let restNotifications = [];
  let next = notification.nextElementSibling;
  // Loop always the next notification until none is found
  while (next) {
    // If the next element doesn't have 'notification' class, break the while loop
    if (!next.matches(".notification")) {
      break;
    }
    // Add the notification to the array
    restNotifications.push(next);
    // Set the next to be the next element
    next = next.nextElementSibling;
  }
  // Se the new height for each of the notifications below the removed one
  restNotifications.forEach((item) => {
    item.style.top = `${parseInt(item.style.top) - currentHeight - margin}px`;
  });
  // Animate removed notification
  notification.classList.add("animate-out");
  // Remove notification once animation has ended
  notification.addEventListener("animationend", () => {
    notification.parentNode.removeChild(notification);
  });
};

addButton.addEventListener("click", addNotification);
addNotification();
