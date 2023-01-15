import Phaser from "phaser";
import Utils from "../Utils";

export class Grenade extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, by) {
		super(scene, x, y, 'grenade');

		this.thrownBy = by
		this.range = 100
		this.maxDamage = 0

	}

	throw(xStart, yStart, xDestination, yDestination, by, range) {
		this.body.reset(xStart, yStart);

		if(by == 'player'){
			this.range = this.scene.playerConfig.playerGrenadeRange
			this.maxDamage = this.scene.playerConfig.maxPlayerGrenadeDamage
		}
		if(by == 'enemy'){
			this.range = this.scene.difficultyConfig.enemyGrenadeRange
			this.maxDamage = this.scene.difficultyConfig.enemyGrenadeDamage
		}

		this.setActive(true);
		this.setVisible(true);

		this.width = 32
		this.height = 32

		this.displayWidth = 32
		this.displayHeight = 32

		this.thrownBy = by
		this.range = range;

		this.xDestination = xDestination;
		this.yDestination = yDestination

		this.scene.physics.moveTo(
			this,
			this.xDestination, 
			this.yDestination,
			400,
			0
		);
	}

	getGrenadeDamageForObject(object, getMaxDamage = false){
		if(getMaxDamage){
			return this.maxDamage;
		}

		var distanceToObject = Utils.getDistanceBetweenPoints(
			this.xDestination, 
            this.yDestination,
			object.body.center.x,
			object.body.center.y
		)

		if(distanceToObject > this.range){
			return 0
		}

		const distanceCoefficient =  1 - (distanceToObject / this.range);
		
		return Math.min(Math.round(distanceCoefficient * this.maxDamage * 1.05), this.maxDamage)

	}

	boom(shieldMaxDamage = false){
		if(this.thrownBy == 'enemy'){
			const playerDamage = this.getGrenadeDamageForObject(this.scene.player)
			if(playerDamage > 0){
				this.scene.player.gotDamage(playerDamage)
			}

			this.scene.curtainsGroup.getMatching('visible', true).forEach(curtain => {
				if(curtain.type == 'shield'){
					const curtainDamage = this.getGrenadeDamageForObject(curtain, shieldMaxDamage)

					if(curtainDamage > 0){
						curtain.gotDamage(curtainDamage)
					}
				}
			})
		} else {
			this.scene.enemiesGroup.getMatching('visible', true).forEach(enemy => {
				const enemyDamage = this.getGrenadeDamageForObject(enemy)

				if(enemyDamage > 0){
					enemy.gotDamage(enemyDamage)
				}
			})
		}

		this.scene.explosionsGroup.addExplosion(
			this.xDestination, 
            this.yDestination,
			this.range
		)

		this.destroy()
	}

	update(){
		this.angle += 5

		if(Utils.getDistanceBetweenPoints(
            this.body.center.x, 
            this.body.center.y, 
            this.xDestination, 
            this.yDestination
        ) < 5){
			this.boom()
        }
	}
}


export default class GrenadesGroup extends Phaser.Physics.Arcade.Group {
	constructor(scene) {
		super(scene.physics.world, scene);

		this.createMultiple({
			frameQuantity: 6,
			key: 'grenade',
			active: false,
			visible: false,
			classType: Grenade
		});
	}

    throwGrenade(xStart, yStart, xDestination, yDestination, by, range = 100){
        const grenade = this.getFirstDead(true);

		if(grenade) {
			grenade.throw(xStart, yStart, xDestination, yDestination, by, range);
		}
    }
}