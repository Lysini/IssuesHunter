import Phaser from 'phaser';

export default class Character extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame){
        super (scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setCollideWorldBounds(true);
        this.setOrigin(0.5, 0.5)
    }
}