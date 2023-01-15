import Phaser from "phaser";

export default class HPText extends Phaser.GameObjects.Text {
    constructor(scene, x, y, text, object) {
        super(scene, x, y, text, {
            font: '20px Arial',
            color: '#fff',
            stroke: '#000',
            strokeThickness: 4,
        });

        this.setOrigin(0.5, 0.5).setDepth(4);

        scene.add.existing(this);

        this.object = object
    }

    update(){
        this.setText(Math.max(this.object.hp, 0));

        const textPosition = this.object.getHPPosition();
        this.x = textPosition.x;
        this.y = textPosition.y;
    }
}