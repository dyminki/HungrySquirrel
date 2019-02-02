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
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/app.js":
/*!*******************!*\
  !*** ./js/app.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Hungry Squirrel

document.addEventListener("DOMContentLoaded", function () {
    function Squirrel() {
        this.x = 0;
        this.y = 0;
        this.direction = 'right';
    }
    function Walnut() {
        this.x = Math.floor(Math.random() * 10);
        this.y = Math.floor(Math.random() * 10);
    }
    function Game() {
        this.board = document.querySelectorAll('#board div');
        this.squirrel = new Squirrel();
        this.walnut = new Walnut();
        this.score = 0;

        this.index = function (x, y) {
            return x + y * 10;
        };

        this.showSquirrel = function () {
            this.hideVisibleSquirrel();
            this.board[this.index(this.squirrel.x, this.squirrel.y)].classList.add('squirrel');
        };

        this.hideVisibleSquirrel = function () {
            document.querySelector('.squirrel') != null && document.querySelector('.squirrel').classList.remove('squirrel');
        };

        this.showWalnut = function () {
            this.board[this.index(this.walnut.x, this.walnut.y)].classList.add('walnut');
        };

        this.moveSquirrel = function () {
            if (this.squirrel.direction === "right") {
                this.squirrel.x = this.squirrel.x + 1;
            } else if (this.squirrel.direction === "left") {
                this.squirrel.x = this.squirrel.x - 1;
            } else if (this.squirrel.direction === "down") {
                this.squirrel.y = this.squirrel.y + 1;
            } else if (this.squirrel.direction === "up") {
                this.squirrel.y = this.squirrel.y - 1;
            }

            if (this.gameOver() == false) {
                this.showSquirrel();
                this.checkWalnutCollision();
            }
        };

        this.turnSquirrel = function (e) {
            switch (e.which) {
                case 37:
                    this.squirrel.direction = "left";
                    break;
                case 38:
                    this.squirrel.direction = "up";
                    break;
                case 39:
                    this.squirrel.direction = "right";
                    break;
                case 40:
                    this.squirrel.direction = "down";
            }
        };

        this.checkWalnutCollision = function () {
            if (this.squirrel.y === this.walnut.y && this.squirrel.x === this.walnut.x) {
                var pos = this.index(this.squirrel.x, this.squirrel.y);
                var counter = document.querySelector('#score strong');

                this.board[pos].classList.remove("walnut");
                this.score++;
                counter.innerText = this.score;
                this.walnut = new Walnut();
                this.showWalnut();
            }
        };

        this.gameOver = function () {
            if (this.squirrel.x < 0 || this.squirrel.x > 9 || this.squirrel.y < 0 || this.squirrel.y > 9) {
                var pos = this.index(this.walnut.x, this.walnut.y);
                var counter = document.querySelector('#score strong');
                clearInterval(this.idsetInteval);
                this.hideVisibleSquirrel();
                this.board[pos].classList.remove("walnut");
                document.getElementsByClassName('bg')[0].classList.add('invisible');
                document.getElementById('over').classList.remove("invisible");

                return true;
            }
            return false;
        };

        this.startGame = function () {
            var _this = this;

            this.idsetInteval = setInterval(function () {
                _this.moveSquirrel();
            }, 250);
        };
    }

    var game = new Game();
    game.showSquirrel();
    game.showWalnut();
    game.startGame();
    document.addEventListener('keydown', function (event) {
        game.turnSquirrel(event);
    });
    document.getElementsByClassName('start')[0].addEventListener('click', function () {
        window.location.reload();
    });
});

/***/ })

/******/ });
//# sourceMappingURL=out.js.map