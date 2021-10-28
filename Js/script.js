const levelDisplayTag = document.querySelector("#battery-level"),
  progressBarPanel = document.querySelector("#progress-bar"),
  chargingMode = document.querySelector("#charging-mode"),
  attentionColor = "#f2cc44",
  warningColor = "#f24444",
  normalColor = "#10cc42";

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
  .catch((err) => {
    alert("Some thing wrong happened !!!");
  });

function showBatteryLevel(batteryLevel) {
  batteryLevel *= 100;
  batteryLevel = parseInt(batteryLevel);
  if (batteryLevel <= 10) progressBarPanel.style.backgroundColor = warningColor;
  else if (batteryLevel < 25)
    progressBarPanel.style.backgroundColor = attentionColor;
  else progressBarPanel.style.backgroundColor = normalColor;
  batteryLevel += "%";
  levelDisplayTag.textContent = batteryLevel;
  progressBarPanel.style.width = batteryLevel;
}

function chargeAnimation(display, animation) {
  chargingMode.style.display = display;
  chargingMode.style.animation = animation;
}
