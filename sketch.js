function setup() {
  createCanvas(windowWidth - 20, windowHeight - 20);
  setInterval(tick, 20);
  setInterval(displayValues, 1000);
  energyPercent = 0;
  powerPercent = 0;
  defensePercent = 0;
  energy = 0;
  energyBars = 1;
  energySpeed = 1;
  energyPower = 1;
  power = 1;
  defense = 1;
  allocatedPowerEnergy = 0;
  allocatedDefenseEnergy = 0;
  energyCap = 50
  hp = 100
  hpCap = 100
  hpRegen = 0.1
  damage = 1
  toughness = 1
  eHP = 500
  eToughness = 20
  eDamage = 20
  eRegen = 0.05
  eHPCap = 500
  combat = false
  enemyCount = 0
  enemyList = [
    ["Test", 6, 6, 0.01, 100, "enemy.png"],
    ["Test 2", 20, 20, 0.05, 500, "player.png"],
    ["Test 3", 50, 50, 0.2, 2000, "enemy.png"],
    ["Test 4", 100, 100, 0.5, 5000, "enemy.png"]
  ]
  eName = "test";
  eStats = [];
  ePic = "enemy.png";
  enemyPicture = loadImage(ePic);
  playerPicture = loadImage("player.png");
  enemyInitialize();
}

function draw() {
  background(220);
  fill(255)
  rect(50, 20, windowWidth - 100, 20);
  fill(0, 200, 0);
  if (energySpeed >= 10) {
    rect(50, 20, energySpeed * (windowWidth - 100) / 100, 20);
      } else {
    rect(50, 20, energyPercent * (windowWidth - 100) / 100, 20);
  }
  fill(0)
  text(str(Math.round(energy)) + " available (" + str(Math.round(energy + allocatedPowerEnergy + allocatedDefenseEnergy)) + " total, " + str(Math.round(energyCap)) + " cap)", 60, 35)
  fill(255)
  rect(50, 50, 100, 20);
  fill(250, 50, 0);
  if ((allocatedPowerEnergy / 20) * energyPower >= 10) {
    rect(50, 50, (allocatedPowerEnergy / 20) * energyPower, 20);
      } else {
    rect(50, 50, powerPercent, 20);
  }
  fill(0)
  text(Math.round(power), 60, 65)
  fill(255)
  rect(50, 80, 100, 20);
  fill(0, 100, 250);
  if ((allocatedDefenseEnergy / 20) * energyPower >= 10) {
    rect(50, 80, (allocatedDefenseEnergy / 20) * energyPower, 20);
      } else {
    rect(50, 80, defensePercent, 20);
  }
  fill(0)
  text(Math.round(defense), 60, 95)
  text(str(Math.round(allocatedPowerEnergy)) + " energy allocated (A and + or - to allocate)", 160, 65)
  text(str(Math.round(allocatedDefenseEnergy)) + " energy allocated (D and + or - to allocate)", 160, 95)
  fill(255)
  rect(50, windowHeight - 50, windowWidth / 2 - 100, 20);
  fill(255, 0, 0);
  rect(50, windowHeight - 50, (windowWidth / 2 - 100) / (hpCap / hp), 20);
  fill(0)
  text("HP: " + str(Math.round(hp * 10) / 10) + "/" + str(Math.round(hpCap * 10) / 10), 60, windowHeight - 35)
  fill(0)
  text("Damage: " + str(Math.round(damage * 10) / 10) + "       Defense: " + str(Math.round(toughness * 10) / 10), 50, windowHeight - 65)
  fill(255)
  rect(windowWidth / 2, windowHeight - 50, windowWidth / 2 - 50, 20);
  fill(255, 0, 0);
  rect(windowWidth / 2, windowHeight - 50, (windowWidth / 2 - 50) / (eHPCap / eHP), 20);
  fill(0)
  text("Enemy HP: " + str(Math.round(eHP * 10) / 10) + "/" + str(Math.round(eHPCap * 10) / 10), windowWidth / 2 + 10, windowHeight - 35)
  text(eName, windowWidth / 2 + 10, windowHeight - 55)
  enemyPicture = loadImage(ePic);
  playerPicture = loadImage("player.png");
  image(enemyPicture, windowWidth / 2, windowHeight / 2, (windowHeight / 2) - 100, (windowHeight / 2) - 100);
  image(playerPicture, 100, windowHeight / 2, (windowHeight / 2) - 100, (windowHeight / 2) - 100)
  print("YAY")
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
function tick() {
  eHP += eRegen
  if (eHP >= eHPCap) {
    eHP = eHPCap
  }
  energyPercent += energySpeed;
  energyCap = 50 * (enemyCount + 1) + (Math.sqrt(defense - 1) * 2)
  energySpeed = 1 * ((enemyCount / 5) + 1) + (Math.sqrt(((power * 1.1) - 1) * (defense - 1)) / 100)
  energyPower = 1 + (Math.sqrt((power - 1) * 1.2) / 25)
  if (energySpeed >= 100) {
      energyBars = 1 + (energySpeed / 100)
      energySpeed = 100
  }
  if (energyPercent >= 100) {
    energy += energyBars;
    energyPercent = 0;
    if (energy + allocatedPowerEnergy + allocatedDefenseEnergy > energyCap) {
      energy = energyCap - allocatedPowerEnergy - allocatedDefenseEnergy
      energyPercent = 100
    }
  }
  hp += hpRegen
  if (hp > hpCap) {
    hp = hpCap
  }
  if ((allocatedPowerEnergy / 20) * energyPower >= 100) {
    powerPercent += 100;
    energyPower *= (allocatedPowerEnergy / 20) * energyPower / 100

      } else {
    powerPercent += (allocatedPowerEnergy / 20) * energyPower;
  }
  energyPower = 1 + (Math.sqrt((power - 1) * 1.2) / 25)
  if (powerPercent >= 100) {
    power += energyBars;
    powerPercent = 0;
  }
  if ((allocatedDefenseEnergy / 20) * energyPower >= 100) {
    defensePercent += 100;
    energyPower *= (allocatedDefenseEnergy / 20) * energyPower / 100
      } else {
    defensePercent += (allocatedDefenseEnergy / 20) * energyPower;
  }
  energyPower = 1 + (Math.sqrt((power - 1) * 1.2) / 25)
  if (defensePercent >= 100) {
    defense += 1;
    defensePercent = 0;
  }
  if (keyIsDown(65)) {
    if (keyIsDown(187)) {
      allocatedPowerEnergy += 1;
      energy -= 1;
      if (energy < 0) {
        allocatedPowerEnergy -= 1;
        energy += 1;
      }
    }
    if (keyIsDown(189)) {
      allocatedPowerEnergy -= 1;
      energy += 1;
      if (allocatedPowerEnergy < 0) {
        allocatedPowerEnergy += 1;
        energy -= 1;
      }
    }
  }
  if (keyIsDown(68)) {
    if (keyIsDown(187)) {
      allocatedDefenseEnergy += 1;
      energy -= 1;
      if (energy < 0) {
        allocatedDefenseEnergy -= 1;
        energy += 1;
      }
    }
    if (keyIsDown(189)) {
      allocatedDefenseEnergy -= 1;
      energy += 1;
      if (allocatedDefenseEnergy < 0) {
        allocatedDefenseEnergy += 1;
        energy -= 1;
      }
    }
  }
  hpCap = 100 + (Math.sqrt((power - 1) * 100))
  hpRegen = 0.02 + (Math.sqrt(defense - 1)) / 1000
  damage = Math.sqrt(power * 10) + 1.8
  toughness = Math.sqrt(defense * 10) + 1.8
  if (combat == true) {
    if (doCombatCycle() == "victory") {
      combat = false;
      newEnemy();
    } else if (doCombatCycle() == "loss") {
      combat = false;
    }
  }
  if (hp < 0) {
    hp = 0
  }
  if (eHP < 0) {
    eHP = 0
  }
}
function keyPressed() {
  if (keyCode === 67) {
    if (combat == true) {
      combat = false
    } else {
      combat = true
    }
  }
}
function displayValues() {
  print("hi")
}
function doCombatCycle() {
  if (damage / eToughness > 0) {
    eHP -= (damage / eToughness) / 10
  }
  if (eDamage / toughness > 0) {
    hp -= (eDamage / toughness) / 10
  }
  if (eHP <= 0) {
    return "victory";
  } else if (hp <= 0) {
    return "loss";
  } else {
    return "continue";
  }
}
function newEnemy() {
  enemyCount += 1;
  eStats = enemyList[enemyCount];
  eName = eStats[0]
  eToughness = eStats[1]
  eDamage = eStats[2]
  eRegen = eStats[3]
  eHPCap = eStats[4]
  eHP = eStats[4]
  ePic = eStats[5]
}
function enemyInitialize() {
  eStats = enemyList[enemyCount];
  eName = eStats[0]
  eToughness = eStats[1]
  eDamage = eStats[2]
  eRegen = eStats[3]
  eHPCap = eStats[4]
  eHP = eStats[4]
  ePic = eStats[5]
}
