// var styles = require('./styles.css');
const Skeleton = require('./Skeleton.js');
const Ship = require('./Ship.js');
const Bullet = require('./Bullet.js');
const Alien = require('./Alien.js');

const background = document.getElementById('background');
const game = document.getElementById('game');

const screen = background.getContext('2d');
const ctx = game.getContext('2d');
