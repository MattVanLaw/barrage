const blockOnBlock = (one, two) => (
  one.x < two.x + two.width &&
  one.x + one.width > two.x &&
  one.y < two.y + two.height &&
  one.y + one.height > two.y
);

export default blockOnBlock;