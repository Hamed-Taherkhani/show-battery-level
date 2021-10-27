const levelDisplayTag = document.querySelector("#battery-level"),
  progressBarPanel = document.querySelector("#progress-bar"),
  chargingMode = document.querySelector("#charging-mode");

navigator
  .getBattery()
  .then((result) => {
    showBatteryLevel(result.level);
    result.onlevelchange = () => showBatteryLevel(result.level);
    setInterval(() => {
      if (result.charging) {
        chargeAnimation(
          "inline-block",
          "charging-animation 1500ms ease 0s infinite"
        );
      } else {
        chargeAnimation("none", "none");
      }
    }, 300);
  })
  .catch((err) => {});

function showBatteryLevel(batteryLevel) {
  batteryLevel *= 100;
  batteryLevel += "%";
  levelDisplayTag.textContent = batteryLevel;
  progressBarPanel.style.width = batteryLevel;
}

function chargeAnimation(display, animation) {
  chargingMode.style.display = display;
  chargingMode.style.animation = animation;
}
