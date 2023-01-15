import Phaser from "phaser";

export default class BonusInfoText {
    constructor(scene){
        this.scene = scene;
    }

    showBonusDescription(text){
        if(this.infoText){
            this.infoText.destroy();
        }
        this.infoText = new Phaser.GameObjects.Text(
            this.scene, 
            this.scene.width / 2, 
            this.scene.height - 10, 
            text.toUpperCase(),
            {
                font: '22px Arial',
                color: '#4ef24b',
                stroke: '#000',
                strokeThickness: 4, 
            }
        ).setOrigin(0.5, 1).setDepth(5)
        this.scene.add.existing(this.infoText)

        setTimeout(() => {
            this.infoText.destroy();
            this.infoText = null;
        }, 3 * 1000)
    }

    destroy(){
        if(this.infoText){
            this.infoText.destroy();
            this.infoText = null;
        }
    }
}