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
eval("__webpack_require__.r(__webpack_exports__);\nclass Bullet {\n  constructor(startPos, ctx) {\n    this.ctx = ctx;\n    this.x = startPos[0];\n    this.y = startPos[1];\n    this.width = 3;\n    this.height = 5;\n  }\n\n  draw() {\n    this.ctx.beginPath();\n    this.ctx.rect(this.x, this.y, this.width, this.height);\n    this.ctx.fillStyle = '#0f380f';\n    this.ctx.fill();\n    this.ctx.closePath();\n  }  \n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Bullet);\n\n//# sourceURL=webpack:///./lib/bullet.js?");

/***/ }),

/***/ "./lib/canvas.js":
/*!***********************!*\
  !*** ./lib/canvas.js ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _ship_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship.js */ \"./lib/ship.js\");\n/* harmony import */ var _bullet_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bullet.js */ \"./lib/bullet.js\");\n/* harmony import */ var _enemy_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./enemy.js */ \"./lib/enemy.js\");\n\n\n\n// Make slow enemies and side enemies. Add links and D-pad.\nconst canvas = document.getElementById('myCanvas');\nconst ctx = canvas.getContext('2d');\n\n\n\nconst ship = new _ship_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](canvas, ctx);\nconst shipAttr = ship.attr;\nconst bullet = new _bullet_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]([shipAttr.x + 13, shipAttr.y - 2], ctx);\n\nconst enemies = [];\n\nfor (let i = 0; i < 100; i++) {\n  let randomX = Math.floor(Math.random() * (canvas.width - 60) + 15);\n  enemies.push(new _enemy_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"]([randomX, 0], 15, 5, ctx));\n}\n\n//initial keypress state\nlet rightPressed = false;\nlet leftPressed = false;\nlet upPressed = false;\nlet downPressed = false;\n\nlet scoreMod = 3;\nlet score = shipAttr.hp;\n\nconst draw = () => {\n  if (gameOver(shipAttr.hp)) {\n    return;\n  }\n  if (isPaused) {\n    requestAnimationFrame(draw);\n  } else {\n    ctx.clearRect(0, 0, canvas.width, canvas.height);\n    $w(\".health\").html(`HP: ${shipAttr.hp}`)\n    $w(\".health\").attr(\"style\", \"color: #0f380f\");\n    score += scoreMod;\n    $w(\".score\").html(Math.floor(score - shipAttr.hp) + \"\");\n    \n    //enemy logic\n    let enemy = enemies[0];\n    enemy.draw();\n    enemy.y += score > 10000 ? 1 : .5;\n\n    if (enemies.length > 0 && enemy.y > canvas.height) {\n      enemies.shift();\n      score -= 1000;\n    }\n\n    //enemy collision\n\n    if (shipAttr.x < enemy.x + enemy.width &&\n        shipAttr.x + shipAttr.width > enemy.x &&\n        shipAttr.y < enemy.y + enemy.height &&\n        shipAttr.y + shipAttr.height > enemy.y) {\n          enemies.shift();\n          shipAttr.hp--;\n          $w(\".health\").html(shipAttr.hp);\n          score -= 100;\n          $w('.message').html(\"-1 HP\");\n    }\n\n    if (bullet.x < enemy.x + enemy.width &&\n        bullet.x + bullet.width > enemy.x &&\n        bullet.y < enemy.y + enemy.height &&\n        bullet.y + bullet.height > enemy.y) {\n          $w('.message').html(\"Kill\");\n          enemies.shift();\n          score += 1000 + (canvas.height - shipAttr.y);\n      }\n    \n\n    ship.draw();\n    \n    bullet.draw();\n    bullet.y -= score > 10000 ? 2.5 : 2;\n\n    if (rightPressed && shipAttr.x < canvas.width - shipAttr.width) {\n      shipAttr.x += score > 10000 ? 2 : 1;\n    } else if (leftPressed && shipAttr.x > 0) {\n      shipAttr.x -= score > 10000 ? 2 : 1;\n    }\n\n    if (upPressed && shipAttr.y > 0) {\n      shipAttr.y -= score > 10000 ? 2 : 1;\n    } else if (downPressed && shipAttr.y < canvas.height - shipAttr.height) {\n      shipAttr.y += score > 10000 ? 2 : 1;\n    }\n\n    if (bullet.y <= 40) {\n      bullet.draw();\n    }\n\n    if (bullet.y < 2) { \n      bullet.x = shipAttr.x + 13;\n      bullet.y = shipAttr.y - 2;\n    }\n    setTimeout(() => $w('.message').html(\"\"), 5000);\n    requestAnimationFrame(draw);\n  }\n};\n\ndocument.addEventListener('keydown', keyDownHandler, false);\ndocument.addEventListener('keyup', keyUpHandler, false);\n\nfunction keyDownHandler(e) {\n  if (e.keyCode === 39) {\n    rightPressed = true;\n  } else if (e.keyCode === 37) {\n    leftPressed = true;\n  } else if (e.keyCode === 38) {\n    upPressed = true;\n  } else if (e.keyCode === 40) {\n    downPressed = true;\n  } else if (e.keyCode === 13) {\n    isPaused = !isPaused;\n    $w('.start-menu').toggleClass('hidden');\n    initial ? $w('.start-menu').html(\"Pause\") : null;\n  }\n}\n\nfunction keyUpHandler(e) {\n  if (e.keyCode === 39) {\n    rightPressed = false;\n  } else if (e.keyCode === 37) {\n    leftPressed = false;\n  } else if (e.keyCode === 38) {\n    upPressed = false;\n  } else if (e.keyCode === 40) {\n    downPressed = false;\n  }\n}\n\nfunction gameOver(hp) {\n  if (hp <= 0) {\n    $w('.start-menu').html(`Game Over.<br/>Final Score ${score}.<br/><span class=\"replay\">r === restart</span>`);\n    $w('.start-menu').removeClass('hidden');\n    document.addEventListener('keydown', (e) => {\n      if (e.keyCode === 82) {\n        console.log(\"RRR\");\n        \n        document.location.reload(); \n      }\n    });\n    cancelAnimationFrame(stopAnime);\n    return true;\n  } else if (enemies.length < 1) {\n    alert(`Final score ${score}`)\n    document.location.reload();\n  }\n}\nlet isPaused = true;\nvar initial = true;\ndocument.addEventListener('DOMContentLoaded', () => {\n  $w('.start-menu').on(\"click\", () => {\n    initial = false;\n    $w('.start-menu').html(\"Pause\");\n    isPaused = false;\n    $w('.start-menu').addClass('hidden');\n  });\n\n});\n\nconst stopAnime = requestAnimationFrame(draw);\n\n//# sourceURL=webpack:///./lib/canvas.js?");

/***/ }),

/***/ "./lib/enemy.js":
/*!**********************!*\
  !*** ./lib/enemy.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Enemy {\n  constructor(pos, width, height, ctx) {\n    this.x = pos[0];\n    this.y = pos[1];\n    this.width = width;\n    this.height = height;\n    this.ctx = ctx;\n  }\n\n  draw() {\n    this.ctx.beginPath();\n    this.ctx.rect(this.x, this.y, this.width, this.height);\n    this.ctx.fillStyle = '#0f380f';\n    this.ctx.fill();\n    this.ctx.closePath();\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Enemy);\n\n//# sourceURL=webpack:///./lib/enemy.js?");

/***/ }),

/***/ "./lib/ship.js":
/*!*********************!*\
  !*** ./lib/ship.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Ship {\n  constructor(canvas, ctx, options) {\n    this.canvas = canvas;\n    this.ctx = ctx;\n    const weaponTree = {\n      default: {\n        fire: [0, 4],\n      },\n    };\n\n    let defaults = {\n      width: 28,\n      height: 4,\n      x: (canvas.width - 28) / 2, //center X\n      y: (canvas.height - 4),\n      hp: 10,\n      weapon: weaponTree[\"default\"],\n    }\n    this.attr = Object.assign(defaults, options);\n  }\n  attr() {\n    return this.attr;\n  }\n  draw() {\n    this.ctx.beginPath();\n    this.ctx.rect(this.attr.x, this.attr.y, this.attr.width, this.attr.height);\n    this.ctx.fillStyle = '#0f380f';\n    this.ctx.fill();\n    this.ctx.closePath();\n  }\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Ship);\n\n//# sourceURL=webpack:///./lib/ship.js?");

/***/ })

/******/ });