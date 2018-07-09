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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// import { log } from "util";

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
                board.classList.add('invisible');
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
});

/***/ })
/******/ ]);
//# sourceMappingURL=out.js.map