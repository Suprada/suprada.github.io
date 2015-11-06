// Reset both enemy and player, required method for game
Object.prototype.reset = function(){
    player.x = 200;
    player.y = 400;
}
// Draw the enemy and player on the screen, required method for game
Object.prototype.render = function() {
    ctx.drawImage(Resources.get(this.image),this.x,this.y);
}


// Enemies our player must avoid
var Enemy = function(x,y) {
    this.image = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = (Math.random()*300)+25 ;
    var canvas = document.getElementById('ctx');
    console.log(canvas);
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {    
    if (this.x <= 505){
            this.x = this.x + (this.speed * dt);
    }
    else{
        this.x = 0;
    }
    //Collision detection
    if (player.x >= this.x - 35 && player.x <= this.x + 35){
        if (player.y >= this.y - 35 && player.y <= this.y + 35){
            this.reset();
            console.log("Thud! Collision detected.");
        }
    }
}

// Player class
var Player = function(x,y){
    this.image = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;
}

//How to move the player
Player.prototype.handleInput = function(keypress) {
    if (keypress == 'left' && this.x > 0){
        this.x = this.x - 20;
    }
    else if (keypress == 'right' && this.x <505){
        this.x = this.x + 20;
    }
    else if (keypress == 'up' && this.y > 25){
        this.y = this.y - 20;
    }
    else if (keypress == 'down' && this.y < 606){
        this.y = this.y + 20;
    }
    this.keypress = null;

    if (this.y < 25 || this.y > 438){
        console.log('Reached water. Go swimming!');        
        console.log(this.y);        
        this.reset();
    }
    if (this.x >400 || this.x < 1){
        this.reset();   
    }
}

Player.prototype.update = function(){
    this.handleInput();
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemy1 = new Enemy(1,1);
var enemy2 = new Enemy(100,100);
var enemy3 = new Enemy(300,200);
var allEnemies = [enemy1, enemy2, enemy3];
var player = new Player(200,200);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. 
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
