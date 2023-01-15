import Phaser from "phaser";
import Bullet from './Bullet'

export default class PlayerBulletsGroup extends Phaser.Physics.Arcade.Group {
	constructor(scene) {
		super(scene.physics.world, scene);

		this.createMultiple({
			frameQuantity: 150,
			key: 'bullet',
			active: false,
			visible: false,
			classType: Bullet
		});
	}

    shoot(xStart, yStart, xDestination, yDestination){
        const bullet = this.getFirstDead(true);

		if(bullet) {
			bullet.fire(xStart, yStart, xDestination, yDestination, 'player');
		}
    }
}