import Phaser from "phaser";
import Utils from "../Utils";

export default class Bullet extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
		super(scene, x, y, 'bullet');

		this.width = 15
		this.height = 5
		this.scene = scene;
	}

	fire(xStart, yStart, xDestination, yDestination, whom='enemy') {
		var speed = Math.ceil(this.scene.difficultyConfig.enemyBulletSpeed * this.scene.perksValues.enemyBulletSpeed)

		if(whom == 'player'){
			speed = Math.ceil(this.scene.playerConfig.playerBulletSpeed * this.scene.perksValues.bulletSpeed)
		}

        var xVelocity = xDestination - xStart
        var yVelocity = yDestination - yStart

        const vectorLength = Math.sqrt(Math.pow(xVelocity, 2) + Math.pow(yVelocity, 2))
        xVelocity = (xVelocity / vectorLength) * this.scene.playerConfig.playerBulletSpeed
        yVelocity = (yVelocity / vectorLength) * this.scene.playerConfig.playerBulletSpeed

		this.body.reset(xStart, yStart);

		this.width = this.width
		this.height = this.height

		this.displayWidth = this.width;
		this.displayHeight = this.height;


		this.setActive(true);
		this.setVisible(true);

        this.setVelocityX(xVelocity);
		this.setVelocityY(yVelocity);

		this.angle = Utils.getAngleFromVector(xVelocity, yVelocity)
	}
}