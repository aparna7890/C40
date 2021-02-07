class Player {
  constructor(){
    this.index = null;
    this.distance = 0;
    this.name = null;
    this.rank = null;
  }

  //get the playercount from db
  getCount(){
    var playerCountRef = database.ref('playerCount');
    playerCountRef.on("value",(data)=>{
      playerCount = data.val();
    })
  }

  //update the count taken from the db
  updateCount(count){
    database.ref('/').update({
      playerCount: count
    });
  }

  //update the values of the name and distance nodes in the db
  //.set({}) here only sets the values for the players for once, does not update it
  update(){
    var playerIndex = "players/player" + this.index;
    database.ref(playerIndex).set({
      name: this.name,
      distance: this.distance
    });
  }

  //static here means that the function is not dependent on any object(i.e., player)
  // arrow function: value in it remains the same
  static getPlayerInfo(){
    var playerInfoRef = database.ref('players');
    playerInfoRef.on("value",(data)=>{
      allPlayers = data.val();
    })
  }

  //values in tthe carsAtEnd nose will settle in this.rank
  getCarsAtEnd(){
    database.ref('carsAtEnd').on("value", (data)=>{
      this.rank = data.val()
    })
  }
  
  //updating the node in the db based on player's rank
  static updateCarsAtEnd(rank){
    database.ref('/').update({
      carsAtEnd : rank
    })
  }
}
