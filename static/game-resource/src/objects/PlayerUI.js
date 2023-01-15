import HPText from "./HPText";
import PlayerScore from "./PlayerScore";
import PlayerItems from "./PlayerItems";
import BonusInfoText from './BonusInfoText';

export default class PlayerUI {
    constructor(scene){
        this.playerHP = new HPText(scene, 50, scene.height / 2, scene.player.hp, scene.player);
        this.playerHP.update();

        this.playerScore = new PlayerScore(scene);
        this.playerScore.update();

        this.playerItems = new PlayerItems(scene);
        this.playerItems.update();

        this.bonusInfoText = new BonusInfoText(scene);
    }

    update(){
        if(this.playerHP){
            this.playerHP.update();
        }

        if(this.playerScore){
            this.playerScore.update();
        }

        if(this.playerItems){
            this.playerItems.update();
        }
    }

    destroy(){
        if(this.playerHP){
            this.playerHP.destroy();
        }

        if(this.playerScore){
            this.playerScore.destroy();
        }

        if(this.playerItems){
            this.playerItems.destroy();
        }

        if(this.bonusInfoText){
            this.bonusInfoText.destroy();
        }
    }
}