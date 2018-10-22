export const shipRender = (ships, canvas, frame) => {
  const shipPic = ships[0].createSprite(canvas);
  shipPic.x = ships[0].props.x - 12;
  shipPic.y = ships[0].props.y - (ships[0].props.height / 2);
  shipPic.cropX = frame * 64;
  shipPic.render();
};

export const shipLeftRender = (ships, canvas, frame) => {
  const shipLeftPic = ships[0].createLeftSprite(canvas);
  shipLeftPic.x = ships[0].props.x - 18;
  shipLeftPic.y = ships[0].props.y - (ships[0].props.height / 2);
  shipLeftPic.cropX = frame * 64;
  shipLeftPic.render();
};

export const shipRightRender = (ships, canvas, frame) => {
  const shipRightPic = ships[0].createRightSprite(canvas);
  shipRightPic.x = ships[0].props.x - 6;
  shipRightPic.y = ships[0].props.y - (ships[0].props.height / 2);
  shipRightPic.cropX = frame * 64;
  shipRightPic.render();
};