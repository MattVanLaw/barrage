const canvas = document.getElementById('myCanvas');

const shipTree = {
  default: {
    width: 30,
    height: 25,
    x: (canvas.width - 28) / 2,
    y: (canvas.height - 28),
    hp: 10,
    weapon: [0, 6],
    bulletCount: 1,
  },
};

export default shipTree;