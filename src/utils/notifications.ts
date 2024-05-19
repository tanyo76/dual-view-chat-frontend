export const showNotification = (message: string) => {
  const notificationPermission = Notification.permission;

  if (notificationPermission === "granted") {
    const notification = new Notification("You have a new message", {
      body: message,
      silent: false,
    });

    notification.addEventListener("click", () => {
      window.focus();
    });
  }
};

export const askForNotificationPermission = () => {
  if (!("Notification" in window)) {
    alert("This browser does not support browser notifications");
  } else {
    Notification.requestPermission();
  }
};
