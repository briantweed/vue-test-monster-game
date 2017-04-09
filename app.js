new Vue({

    el: '#app',

    data: {

        gameIsRunning: false,
        playerHealth: 0,
        monsterHealth: 0,
        playerColor: 'green',
        monsterColor: 'green',
        points: 0,
        round: 0,
        turns: [],
        finalMessage: '',

    },

    watch: {

    	playerHealth(value) {
    		this.playerColor = this.healthBarColor(value);
    	},

    	monsterHealth(value) {
    		this.monsterColor = this.healthBarColor(value);
    	},

    },

    methods: {

        startGame: function() {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.playerColor = 'green';
            this.monsterColor = 'green';
            this.finalMessage = '',
            this.round = 1;
            this.points = 0;
            this.turns = [];
        },

        attack: function() {
            this.playerAttacks();
            if(this.checkWin()) return;
            this.monsterAttacks();
			if(this.checkWin()) return;
            this.points++;
            this.round++;
        },

        specialAttack: function () {
            this.inflictDamage(10, 20, true);
            this.points -=6;
            this.checkWin();
            this.round++;
        },
        
        heal: function() {
            this.playerHealth = this.playerHealth + 10 > 100 ? 100 : this.playerHealth += 10;
            this.points -=3;
            this.recordAction('Player heals for 10', true);
            this.round++;
        },

        giveUp: function() {
            this.gameIsRunning = false;
        },

        playerAttacks: function() {
            this.inflictDamage(3, 10, true);
        },

        monsterAttacks: function() {
            this.inflictDamage(5, 12, false);
        },

        inflictDamage: function(min, max, isPlayer) {
            var damage = Math.max(Math.floor(Math.random() * max) + 1, min);
            if(isPlayer) {
                this.monsterHealth -= damage;
                this.recordAction('Player hits Monster for ' + damage + ' points', isPlayer);
            }
            else {
                this.playerHealth -= damage;
                this.recordAction('Monster hits Player for ' + damage + ' points', isPlayer);
            }
        },

        healthBarColor: function(num) {
            return num <= 15 ? 'red' : ( num <= 40 ? 'darkorange' : 'green' );
        },

        recordAction: function(text, isPlayer) {
            this.turns.unshift({
                isPlayer: isPlayer,
                text: this.round + ') ' + text
            });
        },
        
        checkWin: function() {
			if(this.monsterHealth <= 0) {
				this.monsterHealth = 0;
				this.gameIsRunning = false;
				this.finalMessage = 'Player Wins';
				return true;
			}
			else if(this.playerHealth <= 0) {
				this.playerHealth = 0;
				this.gameIsRunning = false;
				this.finalMessage = 'Monster Wins';
				return true;
			}
        }
    }

});