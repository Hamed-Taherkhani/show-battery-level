const levelDisplayTag = document.querySelector("#battery-level"),
  progressBarPanel = document.querySelector("#progress-bar"),
  chargingMode = document.querySelector("#charging-mode"),
  dischargingTime = document.querySelector("#discharging span"),
  attentionColor = "#f2cc44",
  warningColor = "#f24444",
  normalColor = "#10cc42";

navigator
  .getBattery()
  .then((result) => {
    showBatteryLevel(result.level);
    disChargingInterval(result.level);
    result.onlevelchange = () => {
      showBatteryLevel(result.level);
      disChargingInterval(result.level);
    };
    setInterval(() => {
      if (result.charging) {
        chargeAnimation(
          "inline-block",
          "charging-animation 1500ms ease 0s infinite"
        );
      } else {
        chargeAnimation("none", "none");
      }
    }, 800);
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

let startPoint = 0,
  endPoint = 0,
  flag = false;
function disChargingInterval(batteryLevel) {
  batteryLevel *= 100;
  let interval = 0,
    date = new Date();
  if (flag) {
    endPoint = date.getTime();
    interval = endPoint - startPoint;
    interval *= parseInt(batteryLevel);
    interval /= 1000 * 60;
    interval = parseFloat(interval);

    let hours = parseInt(interval / 60),
      minutes = 0;
    if (interval % 60 !== 0) {
      minutes = parseInt(interval % 60);
    }

    let temp = "Discharging time : ";
    if (hours !== 0) temp += `${hours}h`;
    if (minutes !== 0) temp += `, ${minutes}m`;
    dischargingTime.textContent = temp;
  } else flag = true;
  startPoint = date.getTime();
}
