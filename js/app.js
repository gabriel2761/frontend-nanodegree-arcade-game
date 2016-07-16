document.getElementById('instructions-exit').addEventListener('click', function() {
    document.getElementById('instructions').style.display = 'none';
});

/**
 * @description Returns a random value from an array.
 * @return {value}
 */
Array.prototype.getRandom = function() {
    return this[Math.floor(Math.random() * this.length)];
};

/**
 * @description Enemies the player must avoid
 * @class Instantiates the initial positions and speed for an enemy
 * and assigns a sprite. The positions are chosen from a range at random.
 */
var Enemy = function() {
    this.x = -100;
    this.y = [60, 140, 220].getRandom();
    this.speed = [60, 120, 200].getRandom();
    this.sprite = 'images/enemy-bug.png';
};

/**
 * @description Changes the enemies position by the time delta information.
 * @param  {Number}
 */
Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;
    if (this.x > 500) {
        allEnemies.splice(allEnemies.indexOf(this), 1);
    }
};

/**
 * @description Draws the enemy sprite to the
 * screen, using it's x and y positions.
 */
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
 * @description The character that the player controls
 * @class Instantiates the players initial position using it's
 * assigned x and y values, and assigned the characters sprite.
 */
var Player = function() {
    this.x = 200;
    this.y = 380;
    this.sprite = 'images/char-boy.png';
};

/**
 * @description Moves the players positions back
 * to its starting position
 */
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 380;
};

/**
 * @description checks to see if an enemy is within bounds
 * @param  {Object}
 * @return {Boolean}
 */
Player.prototype.collides = function(enemy) {
    return (this.y === enemy.y) && (enemy.x > this.x - 60) && (enemy.x < this.x + 60);
};

Player.prototype.update = function() {

};

/**
 * @description Draws the player sprite to the screen
 */
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
 * @description Allows player movement on the screen
 * @param  {string} key Keyboard input
 */
Player.prototype.handleInput = function(key) {
    switch (key) {
        case 'left':
            if (this.x > 0) this.x -= 100;
            break;
        case 'up':
            if (this.y <= 60) {
                this.reset();
            } else {
                this.y -= 80;
            }
            break;
        case 'right':
            if (this.x < 400) this.x += 100;
            break;
        case 'down':
            if (this.y < 380) this.y += 80;
            break;
    }
};

var allEnemies = [new Enemy(), new Enemy(), new Enemy()];
var player = new Player();
var rate = 2000;


/**
 * @description Keyboard listener
 * @param  {string} 'keyup' Type of event listener
 * @param {function} e Maps keyboard input with
 */
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
