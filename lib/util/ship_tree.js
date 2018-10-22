const canvas = document.getElementById('myCanvas');

const shipTree = {
  1: {
    default: {
      width: 30,
      height: 20,
      x: (canvas.width - 28) / 2,
      y: (canvas.height - 28),
      hp: 10,
      weapon: [0, 6],
      bulletCount: 1,
    },
    quick: {
      width: 30,
      height: 20,
      weapon: [0, 10],
      bulletCount: 1,
    },
    machineGun: {
      width: 30,
      height: 20,
      weapon: [0, 6],
      bulletCount: 15,
    }
  },
  2: {
    default: {
      width: 30,
      height: 20,
      x: (canvas.width - 28) / 2,
      y: (canvas.height - 28),
      hp: 10,
      weapon: [0, 6],
      bulletCount: 1,
    },
    quick: {
      width: 30,
      height: 20,
      weapon: [0, 10],
      bulletCount: 1,
    },
    machineGun: {
      width: 30,
      height: 20,
      weapon: [0, 6],
      bulletCount: 15,
    }    
  }
};

export default shipTree;