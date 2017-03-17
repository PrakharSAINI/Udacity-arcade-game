// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.y_pos_choice = [224,144,64];  //set of y positions the bug can appear at
    this.x = 0; //initial x coordinate for bug
    this.y = this.y_pos_choice[randomize(10,0)]; //randomize y coordinate to make y position unpredictable
    this.speed = randomize(6,2); //randomize speed value to make it unpredictable
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed ; // update x value using speed property

    //make the bug loop back to the left of the screen with unpredictable y position and speed
    if (this.x > 505) {
        this.x = 0; //reset x to the initial position
        this.y = this.y_pos_choice[randomize(10,0)]; //choose random unpredictable y position
        this.speed = randomize(6,2); //randomize the speed to make it unpredictable
    }

    this.collide();
};

Enemy.prototype.collide = function () {
    var dist_x = (player.x)- this.x;
    var dist_y = (player.y) - this.y;
    if ( dist_x >= -51 && dist_x <= 51 && dist_y >= -42 && dist_y <= 42 ) {
        display('GAME OVER! REFRESH TO PLAY AGAIN');
        allEnemies = [];
        player.x = 202;//reset x position
        player.y = 404;//reset y position
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
var Player = function(){
    this.sprite = 'images/char-boy.png'; //character's image
    this.x = 202; //initial x coordinate
    this.y = 404; //initial y coordinate
    this.change_x = 0; //change in x coordinate initialised to 0
    this.change_y = 0; //change in y coordinate initialised to 0


};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite),this.x,this.y);
};

Player.prototype.update = function(dt) {

    this.x += this.change_x; //change x position
    //the following code does not allow the player to move off the screen limits
    if (this.x  <= -48 || this.x  >= 452){
        this.x -= this.change_x; //cancel out the change in position by subtracting it. This keeps the x position constant
    }
    this.change_x = 0;//reset value

    this.y += this.change_y;//change y position
    if (this.y >= 454 || this.y < -40 ){
        this.y -= this.change_y; //cancel out the change in position by subtracting it. This keeps the y position

    }

    if (this.y === -12){ //winning position for the game, clears off all the enemies and prints the message
        display('Awesome! Refresh to play again!');
        allEnemies = [];
    }

    this.change_y = 0;//reset y position
};

Player.prototype.handleInput = function (key){
    //compares keypresses to the movement and updates the value for change accordingly so that the player moves on the screen
    if (key === 'left'){
        //if key pressed is left, move left by 50 positions
        this.change_x = -50;
    }
    if (key === 'right'){
        //if key pressed is right, move right by 50 positions
        this.change_x = 50;
    }
    if (key === 'up'){
        //if key pressed is up, move up by 32  positions
        this.change_y = -32;
    }
    if (key === 'down') {
        //if key pressed is down, move down by 32 positions
        this.change_y = 32;
    }
};

// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var randomize = function (max,min) {
    //generates numbers between two given integers
    return (Math.floor(Math.random()*(max-min+1)) + min);
};
var display = function (par) {
    //displays string based on the parameter par received
    var canvas = document.getElementsByTagName('canvas');
    var firstCanvasTag = canvas[0];
    Show.innerHTML = par;
    document.body.insertBefore(Show, firstCanvasTag[0]);
};

var player = new Player();
var allEnemies = [];//empty array for bugs
allEnemies.push(new Enemy());//instantiating bugs


for ( var i = 0 ; i < 5 ; i++ ){//to have more than 1 bug on the screen
    allEnemies.push(new Enemy());
}

var Show = document.createElement('div');

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
