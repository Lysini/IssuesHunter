import Phaser from "phaser";

export default class PlayerScore extends Phaser.GameObjects.Text {
    constructor(scene) {
        super(scene, scene.width - 10, 10, 0, {
            font: '25px Arial',
            color: '#fff',
            stroke: '#000',
            strokeThickness: 4,
        });

        this.setOrigin(1, 0.5).setDepth(5);

        scene.add.existing(this);

        this.player = this.scene.player

        this.xPadding = 10
        this.yPadding = 20
    }

    update(){
        this.setText(this.player.score);

        this.x = this.scene.width - this.xPadding
        this.y = this.yPadding
    }
}