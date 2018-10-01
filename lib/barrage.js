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

/***/ "./lib/bullet.js":
/*!***********************!*\
  !*** ./lib/bullet.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Bullet {\n  constructor(startPos, ctx) {\n    this.ctx = ctx;\n    this.x = startPos[0];\n    this.y = startPos[1];\n    this.width = 3;\n    this.height = 5;\n  }\n\n  update(delta) {\n    this.x += delta[0];\n    this.y -= delta[1];\n  }\n\n  draw() {\n    this.ctx.beginPath();\n    this.ctx.rect(this.x, this.y, this.width, this.height);\n    this.ctx.fillStyle = '#306230';\n    this.ctx.fill();\n    this.ctx.closePath();\n  }  \n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Bullet);\n\n//# sourceURL=webpack:///./lib/bullet.js?");

/***/ }),

/***/ "./lib/canvas.js":
/*!***********************!*\
  !*** ./lib/canvas.js ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _ship_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship.js */ \"./lib/ship.js\");\n/* harmony import */ var _enemy_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./enemy.js */ \"./lib/enemy.js\");\n\n\n\nlet scoreEl = $w('.score').html();\n\n\nconst saveScore = (name, score) => {\n  name = name || 'noname';\n  document.getElementById('name'); \n  const newScore = {};\n  newScore.score = parseInt(scoreEl);\n\n  firebase.database().ref().child('scores/').push({\n    name,\n    score,\n  });\n};\n\nconst canvas = document.getElementById('myCanvas');\nconst ctx = canvas.getContext('2d');\n\nlet ship = new _ship_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](canvas, ctx);\n\nconst ships = [ship];\n\nconst enemies1 = [];\nconst enemies2 = [];\n\nfor (let i = 0; i < 100; i++) {\n  let randomX = Math.floor(Math.random() * (canvas.width - 60) + 15);\n  enemies1.push(new _enemy_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]([randomX, 0], 15, 5, ctx));\n}\n\nfor (let i = 0; i < 100; i++) {\n  let randomY = Math.floor(Math.random() * (canvas.height + 21) - 15);\n  enemies2.push(new _enemy_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]([0, randomY], 5, 15, ctx));\n}\n\nlet rightPressed = false;\nlet leftPressed = false;\nlet upPressed = false;\nlet downPressed = false;\n\nlet scoreMod = 3;\nlet score = 0;\nlet tick = 0;\n\nconst play = () => {\n  let shipAttr = ships[0].attr;\n\n  if (gameOver(shipAttr.hp)) {\n    return;\n  } else if (isPaused) {\n    requestAnimationFrame(play);\n  } else {\n    ctx.clearRect(0, 0, canvas.width, canvas.height);\n    $w('.health').html(`HP:${shipAttr.hp}`)\n    $w('.health').attr('style', 'color: #0f380f');\n    score += scoreMod;\n    $w('.score').html(score + '');\n    console.log(tick);\n    \n    if (tick === 1000 || tick === 5000) {\n      ships.push(new _ship_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](canvas, ctx, { x: ships[0].attr.x, y: ships[0].attr.y, hp: ships[0].attr.hp, bulletCount: 5 }));\n      ships.shift();\n    } else if (tick > 1000 && tick % 1000 === 0) {\n      ships.push(new _ship_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](canvas, ctx, { x: ships[0].attr.x, y: ships[0].attr.y, hp: ships[0].attr.hp, bulletCount: 1 }));\n      ships.shift();\n    }\n    tick += 1;\n    let enemy1 = enemies1[0];\n    let enemy2 = enemies2[0];\n    if (score > 3000) {\n      enemy1.update([0, 1.5]);\n      enemy2.update([1, 0]);\n      ships[0].bullets.forEach(bullet => {\n        score = enemy2.killed(enemies2, score, canvas, shipAttr, bullet);\n      });\n    } else {\n      enemy1.update([0, 1]);\n    }\n\n    ships[0].bullets.forEach(bullet => {\n      score = enemy1.killed(enemies1, score, canvas, shipAttr, bullet);\n    });\n\n    score = enemy1.playerHit(shipAttr, enemies1, score);\n    score = enemy2.playerHit(shipAttr, enemies2, score);\n    \n    score = enemy1.died(enemies1, score, canvas);\n    score = enemy2.died(enemies2, score, canvas);\n    ships[0].draw();\n\n    ships[0].fire();\n    ships[0].reload();\n    if (rightPressed && shipAttr.x < canvas.width - shipAttr.width) {\n      shipAttr.x += score > 10000 ? 3 : 2;\n    } else if (leftPressed && shipAttr.x > 0) {\n      shipAttr.x -= score > 10000 ? 3 : 2;\n    }\n\n    if (upPressed && shipAttr.y > 0) {\n      shipAttr.y -= score > 10000 ? 3 : 2;\n    } else if (downPressed && shipAttr.y < canvas.height - shipAttr.height) {\n      shipAttr.y += score > 10000 ? 3 : 2;\n    }\n    let frame = 0;\n\n    frame += 1;\n\n    requestAnimationFrame(play);\n  }\n};\n\ndocument.addEventListener('keydown', keyDownHandler, false);\ndocument.addEventListener('keyup', keyUpHandler, false);\n\nfunction keyDownHandler(e) {\n  if (e.keyCode === 39) {\n    rightPressed = true;\n  } else if (e.keyCode === 37) {\n    leftPressed = true;\n  } else if (e.keyCode === 38) {\n    upPressed = true;\n  } else if (e.keyCode === 40) {\n    downPressed = true;\n  } else if (e.keyCode === 13) {\n    isPaused = !isPaused;\n    $w('.start-menu').toggleClass('hidden');\n    initial ? $w('.start-menu').html(\"Pause\") : null;\n  }\n}\n\nfunction keyUpHandler(e) {\n  if (e.keyCode === 39) {\n    rightPressed = false;\n  } else if (e.keyCode === 37) {\n    leftPressed = false;\n  } else if (e.keyCode === 38) {\n    upPressed = false;\n  } else if (e.keyCode === 40) {\n    downPressed = false;\n  }\n}\n\nconst gameOver = (hp) => {\n  if (hp <= 0 || enemies1.length < 1) {\n    const nameEl = document.getElementById('name');\n    $w('.start-menu').html(`Game Over<br/><span class=\"replay\">Press enter to play</span>`);\n    let name = 'noname';\n    nameEl.addEventListener('change', (e) => {\n      name = e.target.value;\n    });\n    document.getElementsByTagName('form')[0].addEventListener('submit', (e) => {\n      e.preventDefault();\n      saveScore(name, score);\n      document.getElementsByTagName('form')[0].classList.add('hidden');\n    });\n    $w('.start-menu').removeClass('hidden');\n    document.getElementsByTagName('form')[0].classList.remove('hidden');\n\n    $w('.start-menu').off('click', hideMenu);\n    document.addEventListener('keydown', (e) => {\n      if (e.keyCode === 13) {\n        document.location.reload();\n      }\n    });\n    cancelAnimationFrame(stopAnime);\n    return true;\n  }\n};\n\nconst hideMenu = () => {\n  initial = false;\n  $w('.start-menu').html('Pause');\n  isPaused = false;\n  $w('.start-menu').addClass('hidden');\n};\n\nlet isPaused = true;\nvar initial = true;\ndocument.addEventListener('DOMContentLoaded', () => {\n  $w('.start-menu').on('click', hideMenu);\n});\n\nconst stopAnime = requestAnimationFrame(play);\n\n\n//# sourceURL=webpack:///./lib/canvas.js?");

/***/ }),

/***/ "./lib/enemy.js":
/*!**********************!*\
  !*** ./lib/enemy.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Enemy {\n  constructor(pos, width, height, ctx) {\n    this.x = pos[0];\n    this.y = pos[1];\n    this.width = width;\n    this.height = height;\n    this.ctx = ctx;\n  }\n\n  playerHit(player, parentArray, score) {\n    if (\n      player.x < this.x + this.width &&\n      player.x + player.width > this.x &&\n      player.y < this.y + this.height &&\n      player.y + player.height > this.y\n    ) {\n      this.die(parentArray);\n      player.hp--;\n      $w(\".health\").html(player.hp);\n      return score - 100;\n    }\n\n    return score;\n  }\n\n  killed(parentArray, score, canvas, player, bullet) {\n    this.draw();\n    if (\n      bullet.x < this.x + this.width &&\n      bullet.x + bullet.width > this.x &&\n      bullet.y < this.y + this.height &&\n      bullet.y + bullet.height > this.y\n    ) {\n      this.die(parentArray);\n      return score + 1000 + (canvas.height - player.y);\n    }\n    return score;\n  }\n\n  died(parentArray, score, canvas) {\n    if (\n      parentArray.length > 0 &&\n      this.y >= canvas.height ||\n      parentArray.length > 0 &&\n      this.x >= canvas.width\n    ) {\n      parentArray.shift();\n      return score - 1000;\n    }\n    return score;\n  }\n\n  die(parentArray) {\n    parentArray.shift()\n  }\n\n  update(delta) {\n    this.x += delta[0];\n    this.y += delta[1];\n  }\n\n  draw() {\n    this.ctx.beginPath();\n    this.ctx.rect(this.x, this.y, this.width, this.height);\n    this.ctx.fillStyle = '#0f380f';\n    this.ctx.fill();\n    this.ctx.closePath();\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Enemy);\n\n//# sourceURL=webpack:///./lib/enemy.js?");

/***/ }),

/***/ "./lib/ship.js":
/*!*********************!*\
  !*** ./lib/ship.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _bullet_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bullet.js */ \"./lib/bullet.js\");\n\n\nclass Ship {\n  constructor(canvas, ctx, options) {\n    this.canvas = canvas;\n    this.ctx = ctx;\n    const weaponTree = {\n      default: [0, 3],\n    };\n\n    let defaults = {\n      width: 28,\n      height: 4,\n      x: (canvas.width - 28) / 2, //center X\n      y: (canvas.height - 4),\n      hp: 10,\n      weapon: weaponTree[\"default\"], \n      bulletCount: 1, \n    };\n\n    this.attr = Object.assign(defaults, options);\n    \n    this.fire = this.fire.bind(this);\n    this.reload = this.reload.bind(this);\n    this.bullets = [];\n    for (let i = 0; i < this.attr.bulletCount; i++) {\n      this.bullets.push(new _bullet_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]([this.attr.x + 10, this.attr.y + (10 * i)], this.ctx));\n    }\n  }\n\n  fire() {\n    this.bullets.forEach(bullet => {\n      bullet.draw();\n      bullet.update(this.attr.weapon);\n    });\n  }\n\n  reload() {\n    this.bullets.forEach((bullet, i) => {\n      if (bullet.y < 2) {\n        bullet.x = this.attr.x + 13;\n        bullet.y = this.attr.y - (2 + (this.attr.bulletCount - i));\n      }\n    });\n  }\n  draw() {\n    this.ctx.beginPath();\n    this.ctx.rect(this.attr.x, this.attr.y, this.attr.width, this.attr.height);\n    this.ctx.fillStyle = '#9bac0f';\n    this.ctx.fill();\n    this.ctx.closePath();\n  }\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Ship);\n\n//# sourceURL=webpack:///./lib/ship.js?");

/***/ })

/******/ });