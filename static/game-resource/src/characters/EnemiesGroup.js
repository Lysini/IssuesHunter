import Phaser from 'phaser';
import Enemy from './Enemy'

export default class EnemiesGroup extends Phaser.Physics.Arcade.Group {
	constructor(scene) {
		super(scene.physics.world, scene);

		this.createMultiple({
			frameQuantity: 15,
			key: 'enemy',
			active: false,
			visible: false,
			classType: Enemy
		});
	}

    addEnemy(gunType, hasGrenade){
        const enemy = this.getFirstDead(true);

        if(enemy) {
			enemy.setupEnemy(gunType, hasGrenade);
		}
    }
}