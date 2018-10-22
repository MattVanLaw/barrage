import Powerup from './../powerup.js';

const powerupRender = (canvas, powerups) => {
  Powerup
    .sprite(canvas, powerups)
    .render();
};

const dropPowerup = (tick, canvas, powerups, ship) => {
  if (tick > 1000 && tick <= 1120) {
    powerups[0].draw();
    powerupRender(canvas, powerups);
    powerups[0].update(canvas, powerups);
    powerups[0].collide(powerups, "machineGun", ship);

    if (tick === 1120) {
      tick = 0;
      powerups.shift();
    };
  }
};

export default dropPowerup;