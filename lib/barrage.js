/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/canvas.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/boss.js":
/*!*********************!*\
  !*** ./lib/boss.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _enemy_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./enemy.js */ \"./lib/enemy.js\");\n/* harmony import */ var _sprite_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sprite.js */ \"./lib/sprite.js\");\n/* harmony import */ var _util_collision_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util/collision.js */ \"./lib/util/collision.js\");\n\n\n\n\nclass Boss extends _enemy_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  constructor(pos, width, height, ctx, hp) {\n    super(pos, width, height, ctx);\n    this.hp = hp;\n    this.hitScore = this.hitScore.bind(this);\n    \n    this.draw = this.draw.bind(this);\n    this.killed = this.killed.bind(this);\n    this.hurtPlayer = this.hurtPlayer.bind(this);\n    this.collide = false;\n  }\n\n  static sprite(canvas, boss) {\n    let bossImg = new Image();\n    bossImg.src = 'assets/boss.png';\n    return new _sprite_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({\n      context: canvas.getContext(\"2d\"),\n      cropY: 0,\n      x: boss.x,\n      y: boss.y,\n      width: 125,\n      height: 600,\n      image: bossImg,\n      frameWidth: 271,\n      frameHeight: 900,\n    });\n  }\n\n  killed() {\n    this.hp === 0;\n  }\n\n  hitScore(score, canvas, player, bullet) {\n    const collision = Object(_util_collision_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(bullet, this);\n    if (collision) {\n      this.hp--;  \n      if (this.hp <= 0) {\n        return score + 8000 + (canvas.height - player.y);\n      }\n      return score + 150;\n    }\n    return score;\n  }\n\n  hurtPlayer(player, score) {\n    const collision = Object(_util_collision_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(player, this);\n    if (collision && !this.collide) {\n      player.hp--;\n      $w(\".health\").html(player.hp);\n      this.collide = true;\n      return score - 100;\n    }\n\n    return score;\n  }\n\n  update(canvas) {\n    if (this.y >= 0 && this.y < canvas.height) {\n      this.y += 3;\n    } else \n    if(this.y >= canvas.height) {\n      this.y = 0;\n      this.collide = false;\n    }\n  }\n\n  draw() {\n    this.ctx.beginPath();\n    this.ctx.rect(this.x, this.y, this.width, this.height);\n    this.ctx.fillStyle = '#0f380f';\n    this.ctx.fill();\n    this.ctx.closePath();\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Boss);\n\n//# sourceURL=webpack:///./lib/boss.js?");

/***/ }),

/***/ "./lib/bullet.js":
/*!***********************!*\
  !*** ./lib/bullet.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _sprite_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sprite.js */ \"./lib/sprite.js\");\n\n\nclass Bullet {\n  constructor(startPos, ctx, canvas) {\n    this.canvas = canvas;\n    this.ctx = ctx;\n    this.x = startPos[0];\n    this.y = startPos[1];\n    this.width = 4;\n    this.height = 17;\n    this.bulletImage = new Image();\n    this.bulletImage.src = \"assets/bullet.png\";\n    this.render = this.render.bind(this);\n  }\n\n  render() {\n    const bulletPic = new _sprite_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\n      context: this.canvas.getContext(\"2d\"),\n      cropX: 0,\n      cropY: 0,\n      x: this.x - 1,\n      y: this.y - 1,\n      width: 7,\n      height: 20,\n      image: this.bulletImage,\n      frameWidth: 600,\n      frameHeight: 700,\n    });\n    bulletPic.render();\n  }\n\n  update(delta) {\n    this.x += delta[0];\n    this.y -= delta[1];\n  }\n\n  draw() {\n    this.ctx.beginPath();\n    this.ctx.rect(this.x, this.y, this.width, this.height);\n    // this.ctx.fill();\n    this.ctx.closePath();\n  }  \n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Bullet);\n\n//# sourceURL=webpack:///./lib/bullet.js?");

/***/ }),

/***/ "./lib/canvas.js":
/*!***********************!*\
  !*** ./lib/canvas.js ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _ship_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship.js */ \"./lib/ship.js\");\n/* harmony import */ var _enemy_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./enemy.js */ \"./lib/enemy.js\");\n/* harmony import */ var _powerup_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./powerup.js */ \"./lib/powerup.js\");\n/* harmony import */ var _sound_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./sound.js */ \"./lib/sound.js\");\n/* harmony import */ var _sprite_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./sprite.js */ \"./lib/sprite.js\");\n/* harmony import */ var _boss_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./boss.js */ \"./lib/boss.js\");\n/* harmony import */ var _util_game_over_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./util/game_over.js */ \"./lib/util/game_over.js\");\n\n\n\n\n\n\n\n\n//bkgMusic, canvas, ctx can go into main game file\nlet bkgMusic = new _sound_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"](\"8-punk-music.mp3\");\nconst canvas = document.getElementById('myCanvas');\nconst ctx = canvas.getContext('2d');\nlet bulletFrame = 0;\n\nconst ships = [new _ship_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](canvas, ctx, \"default\")];\nlet shipProps = ships[0].props;\n\nlet frame = 0;\nconst shipPic = ships[0].createSprite(canvas);\n\nconst shipRender = () => {\n  shipPic.x = shipProps.x - 10;\n  shipPic.y = shipProps.y - (shipProps.height / 2);\n  shipPic.cropX = frame * 64;\n  shipPic.render();\n};\n\nconst shipLeftPic = ships[0].createLeftSprite(canvas);\n\nconst shipLeftRender = () => {\n  shipLeftPic.x = shipProps.x - 18;\n  shipLeftPic.y = shipProps.y - (shipProps.height / 2);\n  shipLeftPic.cropX = frame * 64;\n  shipLeftPic.render();\n};\n\nconst shipRightPic = ships[0].createRightSprite(canvas);\n\nconst shipRightRender = () => {\n  shipRightPic.x = shipProps.x - 12;\n  shipRightPic.y = shipProps.y - (shipProps.height / 2);\n  shipRightPic.cropX = frame * 64;\n  shipRightPic.render();\n};\n\nconst powerups = _powerup_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].buildAllPowerUps(canvas, ctx, ships);\n\nconst mgRender = () => {\n  const mgPic = _powerup_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].sprite(canvas, powerups);\n  mgPic.render();\n};\n\nconst boss = new _boss_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"]([canvas.width / 6 + 8, 0], 125, 90, ctx, 5000);\nconst bosses = [boss];\n\nconst bossPic = _boss_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"].sprite(canvas, bosses[0]);\n\nconst bossRender = () => {\n  bossPic.cropX = bossFrame * 272;\n  bossPic.x = bosses[0].x;\n  bossPic.y = bosses[0].y;\n  bossPic.render();\n};\n\nconst allEnemies = _enemy_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].buildAllEnemies(canvas, ctx);\nconst enemies1 = allEnemies.enemies1;\nconst enemies1b = allEnemies.enemies1b;\nconst enemies2 = allEnemies.enemies2;\nlet enemy1Image = new Image();\nenemy1Image.src = \"assets/enemy-missiles.png\";\nconst enemy1Pic = _enemy_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].sprite(canvas, enemies1[0]);\n\nconst enemy1Render = () => {\n  enemy1Pic.x = enemies1[0].x - (enemies1[0].width / 2 - 5);\n  enemy1Pic.y = enemies1[0].y;\n  if (bulletFrame >= 12 && enemy1Pic.cropY === 246) {\n    bulletFrame = 0;\n    enemy1Pic.cropY = 117;\n  } else if (bulletFrame >= 12 && enemy1Pic.cropY === 117) {\n    bulletFrame = 0;\n    enemy1Pic.cropY = 246;\n  } \n  enemy1Pic.render();\n};\n\nconst enemy1bPic = new _sprite_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"]({\n  context: canvas.getContext(\"2d\"),\n  cropY: 39.9,\n  x: enemies1b[0].x - (enemies1[0].width / 2 - 5),\n  y: enemies1b[0].y,\n  width: 15.4,\n  height: 42,\n  image: enemy1Image,\n  frameWidth: 31.5,\n  frameHeight: 70,\n});\n\nconst enemy1bRender = () => {\n  enemy1bPic.x = enemies1b[0].x - (enemies1b[0].width / 2 - 5);\n  enemy1bPic.y = enemies1b[0].y;\n  enemy1bPic.cropX =  0 * 32.5,\n  enemy1bPic.render();\n};\n\nlet enemy2Image = new Image();\nenemy2Image.src = \"assets/side-bullet.png\";\nconst enemy2Pic = new _sprite_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"]({\n  context: canvas.getContext(\"2d\"),\n  cropX: 0,\n  cropY: 0,\n  x: enemies2[0].x - 1,\n  y: enemies2[0].y - 2,\n  width: 55,\n  height: 20,\n  image: enemy2Image,\n  frameWidth: 67,\n  frameHeight: 29,\n});\n\nconst enemy2Render = () => {\n  enemy2Pic.x = enemies2[0].x - 1;\n  enemy2Pic.y = enemies2[0].y - 2;\n  enemy2Pic.render();\n};\n\nconst shipSpeed = (speed) => {\n  if (rightPressed && shipProps.x < canvas.width - shipProps.width) {\n    shipProps.x += speed;\n  } else if (leftPressed && shipProps.x > 0) {\n    shipProps.x -= speed;\n  }\n  \n  if (upPressed && shipProps.y > 0) {\n    shipProps.y -= speed;\n  } else if (downPressed && shipProps.y < canvas.height - shipProps.height) {\n    shipProps.y += speed;\n  }\n}\n\nlet rightPressed = false;\nlet leftPressed = false;\nlet upPressed = false;\nlet downPressed = false;\n\nlet scoreMod = 1;\nlet score = 0;\nlet tick = 0;\nlet musicPaused = false;\nlet anime = 0;\nlet bossFrame = 0;\nconst play = () => {\n  shipProps = ships[0].props;\n  let powerup = powerups[0];\n  if (Object(_util_game_over_js__WEBPACK_IMPORTED_MODULE_6__[\"gameOver\"])(shipProps.hp, bosses[0], stopAnime, score)) {\n    return;\n  } else if (isPaused) {\n    requestAnimationFrame(play);\n  } else {\n    ctx.clearRect(0, 0, canvas.width, canvas.height);\n    musicPaused ? bkgMusic.stop() : bkgMusic.play();\n    $w('.health').html(`HP:${shipProps.hp}`)\n    $w('.health').attr('style', 'color: #0f380f');\n    score += scoreMod;\n    $w('.score').html(score + '');\n    anime += 1;\n    if (anime % 2 === 0) ++bossFrame;\n    if (bossFrame >= 65) {\n      bossFrame = 0;\n    }\n    bulletFrame++;\n    if (frame >= 11) {\n      frame = 0;\n    }\n    \n    if (anime % 3 === 0) ++frame;\n    \n    if (leftPressed) {\n      shipLeftRender();\n    } else if (rightPressed) {\n      shipRightRender();\n    } else {\n      shipRender();\n    }\n    enemy1Render();\n    // enemies1[0].animateExplosion(frame, explosionPic);\n    if (tick > 1000 && tick <= 1150) {\n      if (tick === 1150) tick = 0;\n      powerup.draw();\n      mgRender();\n      powerup.update(canvas);\n      powerup.collide(powerups);\n    }\n\n    tick += 1;\n    let enemy1 = enemies1[0];\n    let enemy1b = enemies1b[0];\n    let enemy2 = enemies2[0];\n\n    if (score > 3000) {\n      enemy1.update([0, 2]);\n      enemy1b.update([0, 3]);\n      enemy1bRender();\n      enemy2Render();\n      enemy2.update([1.9, 0.5]);\n      \n      ships[0].bullets.forEach(bullet => {\n        score = enemy2.killed(enemies2, score, canvas, shipProps, bullet).score;\n        score = enemy1b.killed(enemies1b, score, canvas, shipProps, bullet).score;\n      });\n      shipSpeed(4);\n    } else if (score >= 40000) {\n      enemy1.update([0, 2.5]);\n      enemy1b.update([0, 3.5]);\n      enemy1bRender();\n      enemy2Render();\n      enemy2.update([3, 1]);\n      ships[0].bullets.forEach(bullet => {\n        score = enemy2.killed(enemies2, score, canvas, shipProps, bullet);\n        score = enemy1b.killed(enemies1b, score, canvas, shipProps, bullet);\n      });\n      shipSpeed(3);\n    } else {\n      enemy1.update([0, 1]);\n      shipSpeed(2);\n    }\n\n    if (score >= 300000) {\n      bosses[0].draw();\n      bossRender();\n      setInterval(() => bosses[0].update(canvas), 20000);\n      bosses[0].hurtPlayer(shipProps, score);\n      ships[0].bullets.forEach(bullet => {\n        bosses[0].hitScore(score, canvas, ships[0], bullet);\n      });\n    }\n\n    ships[0].bullets.forEach(bullet => {\n      score = enemy1.killed(enemies1, score, canvas, shipProps, bullet).score;\n    });\n    \n    score = enemy1.playerHit(shipProps, enemies1, score);\n    score = enemy1b.playerHit(shipProps, enemies1b, score);\n    score = enemy2.playerHit(shipProps, enemies2, score);\n    \n    score = enemy1.died(enemies1, score, canvas);\n    score = enemy1b.died(enemies1b, score, canvas);\n    score = enemy2.died(enemies2, score, canvas);\n    ships[0].draw();\n\n    ships[0].fire();\n    ships[0].reload();\n \n    if (score > 40000) {\n      $w('#myCanvas').attr('style', \"background: url('./assets/sky-pink.png\");\n    } else if (score > 60000) {\n      $w('#myCanvas').attr('style', \"background: purple\");\n    } else if (score > 400000) {\n      $w('#myCanvas').attr('style', \"background: black\");\n    }\n    requestAnimationFrame(play);\n  }\n};\n\nfunction keyDownHandler(e) {\n  if (e.keyCode === 39) {\n    e.preventDefault();\n    rightPressed = true;\n  } else if (e.keyCode === 37) {\n    e.preventDefault();\n    leftPressed = true;\n  } else if (e.keyCode === 38) {\n    e.preventDefault();\n    upPressed = true;\n  } else if (e.keyCode === 40) {\n    e.preventDefault();\n    downPressed = true;\n  } else if (e.keyCode === 13) {\n    e.preventDefault();\n    isPaused = !isPaused;\n    $w('.start-menu').toggleClass('hidden');\n    initial ? $w('.start-menu').html(\"Pause\") : null;\n  } else if (e.keyCode === 83) {\n    musicPaused = !musicPaused;\n  }\n}\n\nfunction keyUpHandler(e) {\n  if (e.keyCode === 39) {\n    rightPressed = false;\n  } else if (e.keyCode === 37) {\n    leftPressed = false;\n  } else if (e.keyCode === 38) {\n    upPressed = false;\n  } else if (e.keyCode === 40) {\n    downPressed = false;\n  }\n}\n\ndocument.addEventListener('keydown', keyDownHandler, false);\ndocument.addEventListener('keyup', keyUpHandler, false);\n\nlet isPaused = true;\nvar initial = true;\n\nconst stopAnime = requestAnimationFrame(play);\n\n\n//# sourceURL=webpack:///./lib/canvas.js?");

/***/ }),

/***/ "./lib/enemy.js":
/*!**********************!*\
  !*** ./lib/enemy.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _util_collision_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util/collision.js */ \"./lib/util/collision.js\");\n/* harmony import */ var _sprite_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sprite.js */ \"./lib/sprite.js\");\n\n\n\nclass Enemy {\n  constructor(pos, width, height, ctx) {\n    this.x = pos[0];\n    this.y = pos[1];\n    this.width = width;\n    this.height = height;\n    this.ctx = ctx;\n    this.renderExplosion = this.renderExplosion.bind(this);\n    this.animateExplosion = this.animateExplosion.bind(this);\n    this.update = this.update.bind(this);\n    this.randomX = Math.random() * 2000 + 1;\n    this.randomY = Math.random() * 2000 + 1;\n  }\n\n  static buildAllEnemies(canvas, ctx) {\n    const enemies1 = [];\n    const enemies1b = [];\n    const enemies2 = [];\n    const bossBullets = [];\n    for (let i = 0; i < 1000; i++) {\n      let randomX = Math.floor(Math.random() * (canvas.width - 60) + 15);\n      enemies1.push(new Enemy([randomX, -45], 15, 35, ctx));\n      \n      randomX = Math.floor(Math.random() * (canvas.width - 60) + 15);\n      enemies1b.push(new Enemy([randomX, -45], 15, 35, ctx));\n      \n      let randomY = Math.floor(Math.random() * (canvas.height)) - (canvas.height / 2);\n      enemies2.push(new Enemy([-60, randomY], 50, 18, ctx));\n\n      randomX = Math.floor(Math.random() * (canvas.width - 60) + 15);\n      bossBullets.push(new Enemy([randomX, 12], 15, 35, ctx));\n    }\n    return { enemies1, enemies1b, enemies2, bossBullets };\n  }\n\n  static sprite(canvas, enemy) {\n    let enemy1Image = new Image();\n    enemy1Image.src = \"assets/enemy-missiles.png\";\n    return new _sprite_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({\n      context: canvas.getContext(\"2d\"),\n      cropX: 0,\n      cropY: 117,\n      x: enemy.x - (enemy.width / 2 - 5),\n      y: enemy.y,\n      width: 15.4,\n      height: 42,\n      image: enemy1Image,\n      frameWidth: 31,\n      frameHeight: 126,\n    });\n  }\n\n  playerHit(player, parentArray, score) {\n    const collision = Object(_util_collision_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(player, this);\n    \n    if (collision) {\n      this.die(parentArray);\n      player.hp--;\n      $w(\".health\").html(player.hp);\n      return score - 100;\n    }\n\n    return score;\n  }\n\n  killed(parentArray, score, canvas, player, bullet) {\n    const collision = Object(_util_collision_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(bullet, this);\n    \n    if (collision) {\n      this.die(parentArray);\n      const newScore = score + 1000 + (canvas.height - player.y);\n      return { score: newScore, dead: this }\n    }\n    return { score };\n  }\n\n  renderExplosion(src) {\n    let explosionImg = new Image();\n    explosionImg.src = src;\n\n    return new _sprite_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({\n      context: this.ctx,\n      cropY: 0,\n      x: this.x,\n      y: this.y,\n      width: 52,\n      height: 300,\n      image: explosionImg,\n      frameWidth: 42,\n      frameHeight: 300,\n    });\n  }\n\n  animateExplosion(frame, explosionPic) {\n    explosionPic.cropX = frame * 50.8888;\n    explosionPic.x = this.x;\n    explosionPic.y = this.y;\n    explosionPic.render(); \n  }\n\n  died(parentArray, score, canvas) {\n    if (\n      parentArray.length > 0 &&\n      this.y >= canvas.height ||\n      parentArray.length > 0 &&\n      this.x >= canvas.width\n    ) {\n      parentArray.shift();\n      return score - 1000;\n    }\n    return score;\n  }\n\n  die(parentArray) {\n    parentArray.shift();\n  }\n\n  update(delta) {\n    this.x += delta[0];\n    this.y += delta[1];\n  }\n\n  draw() {\n    this.ctx.beginPath();\n    this.ctx.rect(this.x, this.y, this.width, this.height);\n    this.ctx.fillStyle = '#0f380f';\n    this.ctx.fill();\n    this.ctx.closePath();\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Enemy);\n\n//# sourceURL=webpack:///./lib/enemy.js?");

/***/ }),

/***/ "./lib/powerup.js":
/*!************************!*\
  !*** ./lib/powerup.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _ship_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship.js */ \"./lib/ship.js\");\n/* harmony import */ var _sprite_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sprite.js */ \"./lib/sprite.js\");\n\n\n\nclass Powerup {\n  constructor(pos, dim, shipArray, ctx, canvas) {\n    this.ctx = ctx;\n    this.canvas = canvas;\n    this.x = pos[0];\n    this.y = pos[1];\n    this.width = dim[0];\n    this.height = dim[1];\n    this.ships = shipArray;\n    this.addMGShip = this.addMGShip.bind(this);\n    this.resetShip = this.resetShip.bind(this);\n    this.collide = this.collide.bind(this);\n    this.used = this.used.bind(this);\n  }\n\n  static buildAllPowerUps(canvas, ctx, ships) {\n    const powerups = [];\n\n    for (let i = 0; i < 1000; i++) {\n      let randoX = Math.floor(Math.random() * (canvas.width)) + 1;\n\n      let powerup = new Powerup([randoX, 0], [15, 14], ships, ctx, canvas);\n      powerups.push(powerup);\n    }\n    return powerups;\n  }\n\n  static sprite(canvas, powerups) {\n    let mgImage = new Image();\n    mgImage.src = \"assets/m-powerup.png\";\n\n    return new _sprite_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({\n      context: canvas.getContext(\"2d\"),\n      cropX: 0,\n      cropY: 0,\n      x: powerups[0].x,\n      y: powerups[0].y,\n      width: 20,\n      height: 20,\n      image: mgImage,\n      frameWidth: 50,\n      frameHeight: 50,\n    });\n  }\n\n  draw() {\n    this.ctx.beginPath();\n    this.ctx.rect(this.x, this.y, this.width, this.height);\n    this.ctx.closePath();\n  }\n\n  update(canvas) {\n    this.y += 1.5;\n    if (this.y === canvas.height) this.y === 0;\n  }\n\n  addMGShip() {\n    const mgShip = new _ship_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.canvas, this.ctx, \"default\");\n    mgShip.changeBulletCount(15);\n    this.ships.push(mgShip);\n    this.ships.shift();\n  }\n\n  resetShip() {\n    const defaultShip = new _ship_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.canvas, this.ctx, \"default\");\n    defaultShip.changeBulletCount(1);\n    this.ships.push(defaultShip);\n    this.ships.shift();\n  }\n\n  collide(parentArray) {\n    if (\n      this.ships[0].props.x < this.x + this.width &&\n      this.ships[0].props.x + this.ships[0].props.width > this.x &&\n      this.ships[0].props.y < this.y + this.height &&\n      this.ships[0].props.y + this.ships[0].props.height > this.y\n    ) {\n      this.addMGShip();\n      this.used(parentArray);\n    }\n  }\n\n  used(parentArray) {\n    parentArray.shift();\n    console.log(parentArray.length);\n    this.addMGShip();\n    setTimeout(() => this.resetShip(), 5000);\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Powerup);\n\n//# sourceURL=webpack:///./lib/powerup.js?");

/***/ }),

/***/ "./lib/ship.js":
/*!*********************!*\
  !*** ./lib/ship.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _bullet_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bullet.js */ \"./lib/bullet.js\");\n/* harmony import */ var _sprite_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sprite.js */ \"./lib/sprite.js\");\n/* harmony import */ var _util_ship_tree_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util/ship_tree.js */ \"./lib/util/ship_tree.js\");\n\n\n\n\nclass Ship {\n  constructor(canvas, ctx, type) {\n    this.canvas = canvas;\n    this.ctx = ctx;\n\n    this.props = _util_ship_tree_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"][type];\n\n    this.fire = this.fire.bind(this);\n    this.reload = this.reload.bind(this);\n    \n    this._buildBullets = this._buildBullets.bind(this);\n    this.bullets = this._buildBullets();\n\n    this.createSprite = this.createSprite.bind(this);\n    this.createLeftSprite = this.createLeftSprite.bind(this);\n    this.createRightSprite = this.createRightSprite.bind(this);\n    this.changeBulletCount = this.changeBulletCount.bind(this);\n  }\n  changeBulletCount(x) {\n    this.props.bulletCount = x;\n    this.bullets = this._buildBullets();\n  }\n  _buildBullets() {\n    const bullets = [];\n\n    for (let i = 0; i < this.props.bulletCount; i++) {\n      bullets.push(new _bullet_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]([this.props.x + (this.props.width / 2) - 2, this.props.y - (2 + (this.props.bulletCount - i))], this.ctx, this.canvas));\n    }\n\n    return bullets;\n  }\n\n  createSprite() {\n    let shipImage = new Image();\n    shipImage.src = \"assets/ship.png\";\n    return new _sprite_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({\n      context: this.canvas.getContext(\"2d\"),\n      cropX: 0,\n      cropY: 258,\n      x: (this.canvas.width - 28) / 2 - 17,\n      y: (this.canvas.height - 28) - (25 / 2),\n      width: this.props.width + 15,\n      height: this.props.height + 15,\n      image: shipImage,\n      frameWidth: 60,\n      frameHeight: 42,\n    });\n  }\n\n  createLeftSprite() {\n    let shipImage = new Image();\n    shipImage.src = \"assets/ship.png\";\n    return new _sprite_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({\n      context: this.canvas.getContext(\"2d\"),\n      cropX: 0,\n      cropY: 321,\n      x: (this.canvas.width - 28) - 12,\n      y: (this.canvas.height - 28) - (25 / 2),\n      width: this.props.width + 15,\n      height: this.props.height + 15,\n      image: shipImage,\n      frameWidth: 60,\n      frameHeight: 43,\n    });\n  }\n  createRightSprite() {\n    let shipImage = new Image();\n    shipImage.src = \"assets/ship.png\";\n    return new _sprite_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({\n      context: this.canvas.getContext(\"2d\"),\n      cropX: 0,\n      cropY: 385,\n      x: (this.canvas.width - 28) - 12,\n      y: (this.canvas.height - 28) - (25 / 2),\n      width: this.props.width + 15,\n      height: this.props.height + 15,\n      image: shipImage,\n      frameWidth: 60,\n      frameHeight: 42,\n    });\n  }\n\n  fire() {\n    this.bullets.forEach(bullet => {\n      bullet.render();\n      bullet.draw();\n      bullet.update(this.props.weapon);\n    });\n  }\n\n  reload() {\n    this.bullets.forEach((bullet, i) => {\n      if (bullet.y < 2) {\n        bullet.x = this.props.x + (this.props.width / 2) - 2;\n        bullet.y = this.props.y - (2 + (this.props.bulletCount - i));\n      }\n    });\n  }\n  \n  draw() {\n    this.createSprite();\n    this.createLeftSprite();\n    this.createRightSprite();\n    this.ctx.beginPath();\n    this.ctx.rect(this.props.x, this.props.y, this.props.width, this.props.height);\n    // this.ctx.fill();\n    this.ctx.closePath();\n  }\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Ship);\n\n//# sourceURL=webpack:///./lib/ship.js?");

/***/ }),

/***/ "./lib/sound.js":
/*!**********************!*\
  !*** ./lib/sound.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Sound {\n  constructor(src) {\n    this.sound = document.createElement(\"audio\");\n    this.sound.src = src;\n    this.sound.setAttribute(\"preload\", \"auto\");\n    this.sound.setAttribute(\"controls\", \"none\");\n    this.sound.style.display = \"none\";\n    document.body.appendChild(this.sound);\n    this.play = () => this.sound.play();\n    this.stop = () => this.sound.pause();\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Sound);\n\n//# sourceURL=webpack:///./lib/sound.js?");

/***/ }),

/***/ "./lib/sprite.js":
/*!***********************!*\
  !*** ./lib/sprite.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Sprite {\n  constructor(options) {\n    this.context = options.context;\n    this.width = options.width;\n    this.height = options.height;\n    this.image = options.image;\n    this.x = options.x;\n    this.y = options.y;\n    this.cropX = options.cropX;\n    this.cropY = options.cropY;\n    this.frameWidth = options.frameWidth;\n    this.frameHeight = options.frameHeight;\n\n    this.update = this.update.bind(this);\n    this.frameIndex = 0;\n    this.tickCount = 0;\n    this.ticksPerFrame = options.ticksPerFrame || 0;\n    this.numberOfFrames = options.numberOfFrames || 1;\n    this.loop = options.loop;\n  }\n\n  render() {\n    this.context.drawImage(\n    this.image,\n    this.cropX,\n    this.cropY,\n    this.frameWidth,\n    this.frameHeight,\n    this.x, // x\n    this.y, // y\n    this.width,\n    this.height);\n  }\n\n  // render() {\n  //   this.context.drawImage(\n  //     this.image,\n  //     this.frameIndex * this.frameWidth / this.numberOfFrames,\n  //     this.cropY,\n  //     this.frameWidth / this.numberOfFrames,\n  //     this.height,\n  //     this.x,\n  //     this.y,\n  //     this.width / this.numberOfFrames,\n  //     this.height);\n  // }\n\n  update() {\n    this.tickCount += 1;\n\n    if (this.tickCount > this.ticksPerFrame) {\n      this.tickCount = 0;\n\n      if (this.frameIndex < this.numberOfFrames - 1) {\n        this.frameIndex += 1;\n      } else if (this.loop) {\n        this.frameIndex = 0;\n      }\n    }\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Sprite);\n\n//# sourceURL=webpack:///./lib/sprite.js?");

/***/ }),

/***/ "./lib/util/collision.js":
/*!*******************************!*\
  !*** ./lib/util/collision.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst blockOnBlock = (one, two) => (\n  one.x < two.x + two.width &&\n  one.x + one.width > two.x &&\n  one.y < two.y + two.height &&\n  one.y + one.height > two.y\n);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (blockOnBlock);\n\n//# sourceURL=webpack:///./lib/util/collision.js?");

/***/ }),

/***/ "./lib/util/game_over.js":
/*!*******************************!*\
  !*** ./lib/util/game_over.js ***!
  \*******************************/
/*! exports provided: hideMenu, gameOver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"hideMenu\", function() { return hideMenu; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"gameOver\", function() { return gameOver; });\n//pull gameOver and saveScore to game util file.\n\nconst hideMenu = (initial, isPaused) => {\n  initial = false;\n  $w('.start-menu').html('Pause');\n  isPaused = false;\n  $w('.start-menu').addClass('hidden');\n};\n\nconst saveScore = (name, score) => {\n  name = name || 'noname';\n  document.getElementById('name');\n  const newScore = {};\n  newScore.score = parseInt(scoreEl);\n\n  firebase.database().ref().child('scores/').push({\n    name,\n    score,\n  });\n};\n\nlet scoreEl = $w('.score').html();\n\nconst gameOver = (hp, boss, stopAnime, score) => {\n  if (hp <= 0 || boss.hp < 0) {\n    const nameEl = document.getElementById('name');\n    $w('.start-menu').html(`Game Over<br/><span class=\"replay\">Press enter to play</span>`);\n    let name = 'noname';\n    nameEl.addEventListener('change', (e) => {\n      name = e.target.value;\n    });\n    document.getElementsByTagName('form')[0].addEventListener('submit', (e) => {\n      e.preventDefault();\n      saveScore(name, score);\n      document.getElementsByTagName('form')[0].classList.add('hidden');\n    });\n    $w('.start-menu').removeClass('hidden');\n    document.getElementsByTagName('form')[0].classList.remove('hidden');\n\n    $w('.start-menu').off('click', hideMenu);\n    document.addEventListener('keydown', (e) => {\n      if (e.keyCode === 13) {\n        document.location.reload();\n      }\n    });\n    cancelAnimationFrame(stopAnime);\n    return true;\n  }\n};\n\n//# sourceURL=webpack:///./lib/util/game_over.js?");

/***/ }),

/***/ "./lib/util/ship_tree.js":
/*!*******************************!*\
  !*** ./lib/util/ship_tree.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst canvas = document.getElementById('myCanvas');\n\nconst shipTree = {\n  default: {\n    width: 50,\n    height: 40,\n    x: (canvas.width - 28) / 2,\n    y: (canvas.height - 28),\n    hp: 10,\n    weapon: [0, 6],\n    bulletCount: 1,\n  },\n  quick: {\n    width: 35,\n    height: 25,\n    x: (canvas.width - 28) / 2,\n    y: (canvas.height - 28),\n    hp: 5,\n    weapon: [0, 10],\n    bulletCount: 1,\n  },\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (shipTree);\n\n//# sourceURL=webpack:///./lib/util/ship_tree.js?");

/***/ })

/******/ });