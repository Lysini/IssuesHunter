import Phaser from "phaser";

export default class Crosshair extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'crosshair');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setCollideWorldBounds(false);
        this.setInteractive({ cursor: 'none' }).setOrigin(0.5, 0.5);

        this.body.setSize(35, 35);
        this.displayWidth = 35;
		this.displayHeight = 35

        this.body.reset(this.scene.width / 2, this.scene.height / 2)
    }
}