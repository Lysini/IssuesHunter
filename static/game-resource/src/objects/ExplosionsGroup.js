import Phaser from "phaser";

export class Explosion extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
		super(scene, x, y, 'explosion_3');
	}

    addExplosion(x, y, range){
        this.removeExplosionAt = this.scene.time.now + 2 * 1000

        this.setActive(true);
		this.setVisible(true);

		this.body.reset(x, y)

		this.width = range * 2
		this.height = range * 2

		this.displayWidth = range * 2
		this.displayHeight = range * 2

		this.play('explosion')
    }

	update(){
		if(this.removeExplosionAt){
			if(this.scene.time.now >= this.removeExplosionAt){
				this.removeExplosionAt = null;
				this.destroy();
			}
		}
	}
}


export default class ExplosionsGroup extends Phaser.Physics.Arcade.Group {
	constructor(scene) {
		super(scene.physics.world, scene);

		this.createMultiple({
			frameQuantity: 6,
			key: 'explosion',
			active: false,
			visible: false,
			classType: Explosion
		});
	}

    addExplosion(x, y, range = 100){
        const explosion = this.getFirstDead(true);

        if(explosion){
            explosion.addExplosion(x, y, range)
        }
    }
}