class Sprite {
  constructor(options) {
    this.context = options.context;
    this.width = options.width;
    this.height = options.height;
    this.image = options.image;
    this.x = options.x;
    this.y = options.y;
    this.cropX = options.cropX;
    this.cropY = options.cropY;
    this.frameWidth = options.frameWidth;
    this.frameHeight = options.frameHeight;

    this.update = this.update.bind(this);
    this.frameIndex = 0;
    this.tickCount = 0;
    this.ticksPerFrame = options.ticksPerFrame || 0;
    this.numberOfFrames = options.numberOfFrames || 1;
    this.loop = options.loop;
  }

  render() {
    this.context.drawImage(
    this.image,
    this.cropX,
    this.cropY,
    this.frameWidth,
    this.frameHeight,
    this.x, // x
    this.y, // y
    this.width,
    this.height);
  }

  // render() {
  //   this.context.drawImage(
  //     this.image,
  //     this.frameIndex * this.frameWidth / this.numberOfFrames,
  //     this.cropY,
  //     this.frameWidth / this.numberOfFrames,
  //     this.height,
  //     this.x,
  //     this.y,
  //     this.width / this.numberOfFrames,
  //     this.height);
  // }

  update() {
    this.tickCount += 1;

    if (this.tickCount > this.ticksPerFrame) {
      this.tickCount = 0;

      if (this.frameIndex < this.numberOfFrames - 1) {
        this.frameIndex += 1;
      } else if (this.loop) {
        this.frameIndex = 0;
      }
    }
  }
}

export default Sprite;