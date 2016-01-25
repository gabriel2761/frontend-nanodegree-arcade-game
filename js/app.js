Array.prototype.getRandom = function() {
    return this[Math.floor(Math.random() * this.length)];
};

// Enemies our player must avoid
var Enemy = function() {
    this.x = -100;
    this.y = [60, 140, 220].getRandom();
    this.speed = [60, 120, 200].getRandom();
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;
    if (this.x > 500) {
        allEnemies.splice(allEnemies.indexOf(this), 1);
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.x = 200;
    this.y = 380;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.reset = function() {
    this.x = 200;
    this.y = 380;
};

Player.prototype.collides = function(enemy) {
    return (this.y === enemy.y) && (enemy.x > this.x - 60) && (enemy.x < this.x + 60);
};

Player.prototype.update = function() {

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

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

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(), new Enemy(), new Enemy()];
var player = new Player();
var rate = 2000;


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
