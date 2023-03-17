// Es hora de definir variables
var game;
var player;
var platforms;
var badges;
var items;
var cursors;
var jumpButton;
var text;
var winningMessage;
var won = false;
var currentScore = 0;
var winningScore = 100;

// Agregamos los objetos coleccionables en el juego 
function addItems(){
    items = game.add.physicsGroup();
    createItem(375, 300, 'coin');
    // 9 mas (hize una escalera)
    createItem(350, 250, 'coin');
    createItem(275, 200, 'coin');
    createItem(250, 150, 'coin');
    createItem(475, 400, 'coin');
    createItem(450, 350, 'coin');
    createItem(175, 100, 'coin');
    createItem(150, 50, 'coin');
    // 3 in a row 
    createItem(100, 300, 'coin');
    createItem(150, 300, 'coin');
    createItem(200, 300, 'coin');
    // poison nueva
    //createItem(680, 400, 'poison');
    //createItem(720, 400, 'poison');
    //createItem(760, 400, 'poison');
}
// Agregamos las plataformas en el juego 
function addPlatforms(){
    platforms = game.add.physicsGroup();
    platforms.create(500, 550, 'platform3');
    //añadir 4 plataformas mas 
    platforms.create(70, 400, 'platform3');
    platforms.create(70, 180, 'platform3');
    platforms.create(500, 100, 'platform3');
    platforms.create(500, 300, 'platform3');
    // Hongo
    //platforms.create(680,480, 'platform2');
    // Mas implementaciones 
    platforms.create(950,200,'platform4');
    // Fijarlas 
    
    platforms.setAll('body.immovable',true);
}
// Crearemos una animacion simple de un objeto y lo agregaremos en pantalla 
function createItem(left, top, image){
    var item = items.create(left, top, image);
    item.animations.add('spin');
    item.animations.play('spin', 10, true);
}
// Crear insignia ganadora y agregar a pantalla
function createBadge(){
    badges = game.add.physicsGroup();
    var badge = badges.create(1250, 140, 'badge');
    badge.animations.add('spin');
    badge.animations.play('spin', 10, true);
} 
// Cuando el jugador colecta un objeto obtiene puntos
function itemHandler(player, item){
    item.kill();
    currentScore = currentScore + 10;
    if(currentScore === winningScore){
        createBadge();
    }
}
// Cuando el jugador colecta una insignia al final del juego
function badgeHandler(player, badge){
    badge.kill();
    won = true;
}
// Iniciar el juego cuando la pagina carga 
window.onload = function(){
    game = new Phaser.Game(1400, 600, Phaser.AUTO,'',{preload: preload, create: create, update: update, render: render});

// Previo a que inicie el juego 
function preload(){
    //game.stage.backgroundColor = '#5db1ad';
    game.load.image('background','background.png')
    // Carga de imagenes 
    game.load.image('platform', 'platform_1.png');
    game.load.image('platform3', 'platform_3.png');
    game.load.image('platform2', 'platform_2.png');
    game.load.image('platform4', 'isla.png');
    // Cargar los sprites 
    game.load.spritesheet('player','pika.png',64 ,40); // 48 y 62 son chalkers 
    game.load.spritesheet('coin','coin.png', 36, 44);
    game.load.spritesheet('badge','pokeball.png', 80, 70); // 42 y 54 son del badge
    // nuevo objeto animado 
    game.load.spritesheet('poison','poison.png',32,32);
}
// Configuracion inicial del juego 
function create(){
    var background = game.add.sprite(0,0,'background');
    player = game.add.sprite(50, 600, 'player');
    player.animations.add('walk');
    player.anchor.setTo(0.5, 1);
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;
    player.body.gravity.y = 500;

    addItems();
    addPlatforms();

    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    text = game.add.text(16, 16, "SCORE: " + currentScore, { font: "bold 24px Arial", fill: "white" });
    winningMessage = game.add.text(game.world.centerX, 275, "", { font: "bold 48px Arial", fill: "white" });
    winningMessage.anchor.setTo(0.5, 1);
}
// Cuando el juego este corriendo 
function update() {
    text.text = "SCORE: " + currentScore;
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.overlap(player, items, itemHandler);
    game.physics.arcade.overlap(player, badges, badgeHandler);
    player.body.velocity.x = 0; 
    // Cuando presionamos la flecha izquierda
    if (cursors.left.isDown) {
       player.animations.play('walk', 10, true);
       player.body.velocity.x = -300;
       player.scale.x = -1; 
    }
    // Cuando presionamos la flecha derecha
    else if (cursors.right.isDown) {
        player.animations.play('walk', 10, true);
        player.body.velocity.x = 300;
        player.scale.x = 1;
    }
    // Cuando el jugador este quieto
    else {
        player.animations.stop();
    }
    if (jumpButton.isDown && (player.body.onFloor() || player.body.touching.down)) {
        player.body.velocity.y = -400;
    }
    // Cuando el jugador gana el juego 
    if (won) {
        winningMessage.text = "¡Ya esta! ¡Pikachu Atrapado!";
    }
} 

function render(){

}
};