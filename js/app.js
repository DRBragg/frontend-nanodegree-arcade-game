// Enemies our player must avoid
var Enemy = function(x, y) {
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    this.x = x;
    this.y = y;
    this.speed = Math.floor(Math.random()*200+100)
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // Multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < 505) {
      this.x = this.x + this.speed * dt;
    } else {
      this.x = -90;
    }

    //Best I could come up with for handling collisions... there has to be a better way!
    if (this.x < player.x + 30 && this.x + 60 > player.x && this.y < player.y + 60 && this.y + 40 > player.y) {
		  score = 0;
		  document.getElementById('score').innerHTML = score;
		  player.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class
var Player = function() {
  // For Joella, Love Daddy
  this.sprite = 'images/char-princess-girl.png'
  this.x = 200;
  this.y = 320;
};

// Handle player movement
Player.prototype.handleInput = function(direction) {
    if(direction == 'left' && this.x > 0) {
        this.x -= 100;
    } else if (direction == 'up' && this.y > 3) {
      this.y -= 100;
    } else if (direction == 'right' && this.x < 400) {
      this.x += 100;
    } else if (direction == 'down' && this.y < 400) {
      this.y += 100;
    }
};

// Check if player has reached water at every movement
Player.prototype.update = function() {
	if (this.y < 20) {
    // If player reached water updated score and reset position
    score++;
    document.getElementById('score').innerHTML = score;
    this.reset();
  }
};

// Return player to SP
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 300;
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var score = 0;

// Now instantiate your objects.
var e1 = new Enemy(0, 50);
var e2 = new Enemy(-220, 140);
var e3 = new Enemy(-500, 230);
// Place all enemy objects in an array called allEnemies
var allEnemies = [e1, e2, e3];
// Place the player object in a variable called player
var player = new Player();



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
