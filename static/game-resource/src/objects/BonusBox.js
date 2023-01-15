import Phaser from "phaser";
import { box_bonuses } from '../config'

export default class BonusBox extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
		super(scene, x, y, 'box');

		scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setCollideWorldBounds(false);
        this.setOrigin(0.5, 0.5);

		this.body.reset(x, y);

		this.collider = this.scene.physics.add.overlap(
			this, 
			this.scene.player, 
			(obj1, obj2) => this.onPlayerCollect(obj1, obj2), 
			null, 
			this
		);
	}

	onPlayerCollect(){
		const randomNumber = Phaser.Math.Between(1, 100)

		var drop = box_bonuses.HEALTH

		if(randomNumber >= 1 && randomNumber <= 15){ drop = box_bonuses.GRENADE }
		if(randomNumber >= 16 && randomNumber <= 30){ drop = box_bonuses.SHIELD }
		if(randomNumber >= 31 && randomNumber <= 45){ drop = box_bonuses.SPEED_BONUS }
		if(randomNumber >= 46 && randomNumber <= 60){ drop = box_bonuses.ROF_BONUS }
		// if(randomNumber >= 61 && randomNumber <= 100){ drop = box_bonuses.HEALTH }

		this.setTexture("box_opened")

		this.scene.playerCollectedBonusBox(drop);
	}

	update(){

	}
}