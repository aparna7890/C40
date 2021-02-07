class Game {
  constructor(){

  }

  //getting gamestate from db
  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })
  }

  //updating the gamestate in db
  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  //here .once() means if there is atleast one value in playerCount in db
  //it reads the data change only once, unlike the .on()
  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car2 = createSprite(300,200);
    car3 = createSprite(500,200);
    car4 = createSprite(700,200);
    cars = [car1, car2, car3, car4];

    car1.addImage(car1Img)
    car2.addImage(car2Img)
    car3.addImage(car3Img)
    car4.addImage(car4Img)
  }

  //here gamestate becomes 1, the screen shows the cars and players
  play(){
    form.hide();

    Player.getPlayerInfo();
    player.getCarsAtEnd();
    
    if(allPlayers !== undefined){

      background("black")
      //var display_position = 100;
      image(trackImg, 0, -(displayHeight * 4), displayWidth, displayHeight * 5)

      //index of the array
      var index = 0;

      //x and y position of the cars (i.e., players)
      var x = 220;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 220;

        //use data from the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          //marking the player with a circle below the car
          fill("white")
          ellipse(x, y, 80, 80)

          //positioning the camera just above the player's car
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
        }
       console.log(player.distance)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      //x=x+10 => x += 10
      player.distance += 10
      player.update();
    }

    //if a player crosses finish line
    if(player.distance > 4220){
      gameState = 2

      player.rank = player.rank + 1
      Player.updateCarsAtEnd(player.rank)
    }
    drawSprites();
  }

  end(){
    rectMode(CENTER)
    fill(255)
    rect(displayWidth / 2, cars[player.index - 1].y , 400, 200)
    textSize(30)
    fill(0)
    text("Game Over!", displayWidth / 2 - 85, cars[player.index - 1].y - 20)
    text("Your Rank: " + player.rank, displayWidth/2 - 85, cars[player.index - 1].y + 30)
  }
}
