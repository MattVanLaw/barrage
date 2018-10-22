const canvas = document.getElementById('myCanvas');

const shipTree = {
  1: {
    image: "assets/ship.png",
    default: {
      width: 50,
      height: 20,
      x: (canvas.width - 28) / 2,
      y: (canvas.height - 28),
      hp: 10,
      weapon: [0, 6],
      bulletCount: 1,
    },
    quick: {
      width: 50,
      height: 20,
      weapon: [0, 10],
      bulletCount: 1,
    },
    machineGun: {
      width: 50,
      height: 20,
      weapon: [0, 6],
      bulletCount: 15,
    }
  },
  2: {
    image: "assets/ship2.png",
    default: {
      width: 30,
      height: 20,
      x: (canvas.width - 28) / 2,
      y: (canvas.height - 28),
      hp: 10,
      weapon: [0, 6],
      bulletCount: 3,
    },
    quick: {
      width: 30,
      height: 20,
      weapon: [0, 10],
      bulletCount: 2,
    },
    machineGun: {
      width: 30,
      height: 20,
      weapon: [0, 6],
      bulletCount: 25,
    }    
  }
};

export default shipTree;