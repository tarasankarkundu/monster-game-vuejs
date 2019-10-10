new Vue({
  el: '#app',
  data:{
      playerHealth:100,
      monsterHealth:100,
      isGameRunning: false,
      turns: []
  },
  methods:{
      startGame: function(){
          this.isGameRunning = true;
          this.playerHealth = 100;
          this.monsterHealth = 100;
      },
      attack: function(){
          var damage = this.calculateDamage(10,3)
          this.monsterHealth -= damage;
          this.turns.unshift({
              isPlayer: true,
              text: 'Player hit Monster for '+damage
          })
          if(this.checkWin()){
              return;
          }
          this.monsterAttacks();
      },
      specialAttack: function(){
          var damage = this.calculateDamage(20,10)
          this.monsterHealth -= damage;
          this.turns.unshift({
              isPlayer: true,
              text: 'Player hit Monster hard for '+damage
          })
          if(this.checkWin()){
              return;
          }
          this.monsterAttacks();
      },
      heal: function(){
          if(this.playerHealth <=90){
              this.playerHealth += 10;
          } else {
              this.playerHealth = 100;
          }
          this.monsterAttacks();
      },
      giveUp: function(){
          this.isGameRunning = false;
      },
      monsterAttacks: function(){
          var damage = this.calculateDamage(13, 5)
          this.playerHealth -= damage;
          this.turns.unshift({
              sPlayer: true,
              text: 'Monster hit PLayer for '+damage
          })
          this.checkWin();
      },
      calculateDamage: function(max, min){
          return Math.max(Math.floor(Math.random() * max)+1, min)
      },
      checkWin: function(){
          if(this.monsterHealth <=0){
              if(confirm('you won! New Game?')){
                  this.startGame();
              } else {
                  this.isGameRunning = false;
              }
              return true;
          } else if (this.playerHealth <= 0){
              if(confirm('you lost! New Game?')){
                  this.startGame();
              } else {
                  this.isGameRunning = false;
              }
              return true;
          }
          return false;
          
      }

  }
})
