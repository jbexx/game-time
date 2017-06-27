/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	document.write(__webpack_require__(1));
	document.write('It works');

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	// var styles = require('./styles.css');
	const Skeleton = __webpack_require__(2);
	const Ship = __webpack_require__(3);
	const Bullet = __webpack_require__(4);
	const Alien = __webpack_require__(5);

	const background = document.getElementById('background');
	const game = document.getElementById('game');

	const screen = background.getContext('2d');
	const ctx = game.getContext('2d');

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	

/***/ })
/******/ ]);