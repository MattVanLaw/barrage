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
eval("__webpack_require__.r(__webpack_exports__);\nclass Bullet {\n  constructor(startPos, ctx) {\n    this.ctx = ctx;\n    this.x = startPos[0];\n    this.y = startPos[1];\n    this.radius = 3;\n  }\n\n  draw() {\n    this.ctx.beginPath();\n    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);\n    this.ctx.fillStyle = \"#0095DD\";\n    this.ctx.fill();\n    this.ctx.closePath();\n  }  \n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Bullet);\n\n//# sourceURL=webpack:///./lib/bullet.js?");

/***/ }),

/***/ "./lib/canvas.js":
/*!***********************!*\
  !*** ./lib/canvas.js ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _ship_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship.js */ \"./lib/ship.js\");\n/* harmony import */ var _bullet_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bullet.js */ \"./lib/bullet.js\");\n/* harmony import */ var _enemy_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./enemy.js */ \"./lib/enemy.js\");\n\n\n\n\nlet score = 0;\n\nconst canvas = document.getElementById('myCanvas');\nconst ctx = canvas.getContext('2d');\n\n//default ship settings w/ bullets\nconst ship = new _ship_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](canvas, ctx);\nconst shipAttr = ship.attr;\nconst bulletLeft = new _bullet_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]([shipAttr.x + 4, shipAttr.y], ctx);\nconst bulletRight = new _bullet_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]([shipAttr.x + 23, shipAttr.y], ctx);\n\n\n\nconst enemies = [];\n\nfor (let i = 0; i < 5; i++) {\n  let randomX = Math.floor(Math.random() * canvas.width + 1);\n  enemies.push(new _enemy_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"]([randomX, 0], 5, 5, ctx));\n}\n\n//initial keypress state\nlet rightPressed = false;\nlet leftPressed = false;\nlet upPressed = false;\nlet downPressed = false;\n\nconst draw = () => {\n  ctx.clearRect(0, 0, canvas.width, canvas.height);\n\n  gameOver(shipAttr.hp);\n  \n  let enemy = enemies[0];\n  debugger\n  enemy.draw();\n  enemy.y += .5;\n\n  \n  if (enemy.y > canvas.height) {\n    enemies.shift();\n    debugger\n  }\n\n  ship.draw();\n  bulletLeft.draw();\n  bulletRight.draw();\n  bulletLeft.y -= 2;\n  bulletRight.y -= 2;\n\n  if (rightPressed && shipAttr.x < canvas.width - shipAttr.width) {\n    shipAttr.x += 1;\n  } else if (leftPressed && shipAttr.x > 0) {\n    shipAttr.x -= 1;\n  }\n\n  if (upPressed && shipAttr.y > 0) {\n    shipAttr.y -= 1;\n  } else if (downPressed && shipAttr.y < canvas.height - shipAttr.height) {\n    shipAttr.y += 1;\n  }\n\n  if (bulletLeft.y < 2) { \n    bulletLeft.x = shipAttr.x + 4;\n    bulletLeft.y = shipAttr.y;\n    bulletRight.x = shipAttr.x + 23;\n    bulletRight.y = shipAttr.y;\n  }\n  \n  requestAnimationFrame(draw);\n};\n\ndocument.addEventListener('keydown', keyDownHandler, false);\ndocument.addEventListener('keyup', keyUpHandler, false);\n\nfunction keyDownHandler(e) {\n  if (e.keyCode === 39) {\n    rightPressed = true;\n  } else if (e.keyCode === 37) {\n    leftPressed = true;\n  } else if (e.keyCode === 38) {\n    upPressed = true;\n  } else if (e.keyCode === 40) {\n    downPressed = true;\n  }\n}\n\nfunction keyUpHandler(e) {\n  if (e.keyCode === 39) {\n    rightPressed = false;\n  } else if (e.keyCode === 37) {\n    leftPressed = false;\n  } else if (e.keyCode === 38) {\n    upPressed = false;\n  } else if (e.keyCode === 40) {\n    downPressed = false;\n  }\n}\n\nfunction gameOver(hp) {\n  if (hp < 0 || enemies.length < 1) {\n    alert(\"GAME OVER\");\n    document.location.reload();\n  }\n}\n\nrequestAnimationFrame(draw);\n\n\n//# sourceURL=webpack:///./lib/canvas.js?");

/***/ }),

/***/ "./lib/enemy.js":
/*!**********************!*\
  !*** ./lib/enemy.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Enemy {\n  constructor(pos, width, height, ctx) {\n    this.x = pos[0];\n    this.y = pos[1];\n    this.width = width;\n    this.height = height;\n    this.ctx = ctx;\n  }\n\n  draw() {\n    this.ctx.beginPath();\n    this.ctx.rect(this.x, this.y, this.width, this.height);\n    this.ctx.fillStyle = '#E0115F';\n    this.ctx.fill();\n    this.ctx.closePath();\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Enemy);\n\n//# sourceURL=webpack:///./lib/enemy.js?");

/***/ }),

/***/ "./lib/ship.js":
/*!*********************!*\
  !*** ./lib/ship.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Ship {\n  constructor(canvas, ctx, options) {\n    this.canvas = canvas;\n    this.ctx = ctx;\n    const weaponTree = {\n      default: {\n        fire: [0, 4],\n      },\n    };\n\n    let defaults = {\n      width: 28,\n      height: 4,\n      x: (canvas.width - 28) / 2, //center X\n      y: (canvas.height - 4),\n      hp: 5,\n      weapon: weaponTree[\"default\"],\n    }\n    this.attr = Object.assign(defaults, options);\n  }\n  attr() {\n    return this.attr;\n  }\n  draw() {\n    this.ctx.beginPath();\n    this.ctx.rect(this.attr.x, this.attr.y, this.attr.width, this.attr.height);\n    this.ctx.fillStyle = '#ffffff';\n    this.ctx.fill();\n    this.ctx.closePath();\n  }\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Ship);\n\n//# sourceURL=webpack:///./lib/ship.js?");

/***/ })

/******/ });