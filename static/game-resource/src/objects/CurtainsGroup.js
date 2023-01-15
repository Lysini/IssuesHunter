import Phaser from "phaser";
import HPText from "./HPText";

export class Curtain extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
		super(scene, x, y, 'wall');

		this.isDestroyable = false;
		this.hp = 100
		this.type = 'wall'

		this.setOrigin(0.5, 0.5)

		this.enemiesBulletCollider = null;
		this.playerBulletCollider = null
	}

	set(y, width, height, type){
		this.type = type;
		this.hp = this.scene.gameConfig.shieldHP

		if(this.type == 'shield'){
			this.isDestroyable = true;
			this.setTexture('shield_ghost');
		}

		var xPosition = this.type == 'shield' ? this.scene.gameConfig.shieldXPostion : this.scene.gameConfig.wallXPosition

		this.body.reset(xPosition, y);

		this.setActive(true);
		this.setVisible(true);

		this.width = width;
		this.height = height
		this.displayWidth = width;
		this.displayHeight = height

		if(this.type == 'wall'){
			this.enemiesBulletCollider = this.scene.physics.add.overlap(
				this, 
				this.scene.enemiesBulletsGroup, 
				(obj1, obj2) => this.gotBullet(obj1, obj2, 'enemy'), 
				null, 
				this
			);

			this.playerBulletCollider = this.scene.physics.add.overlap(
				this, 
				this.scene.playerBulletsGroup, 
				(obj1, obj2) => this.gotBullet(obj1, obj2, 'player'), 
				null, 
				this
			);
		}
	}

	gotBullet(wall, bullet, from='enemy'){
		bullet.destroy();

		if(this.isDestroyable){
			this.gotDamage(5)
		}
	}

	gotGrenade(shield, grenade, from='enemy'){
		if(grenade.thrownBy == 'enemy'){
			if(from == 'enemy' && this.type == 'shield'){
				grenade.boom(true)
			}
		}
	}

	gotDamage(damage){
		this.hp -= damage

		if(this.hp <= 0){
			this.onDestroyed()
		}
	}

	onDestroyed(){
		if(this.isDestroyable){
			if(this.enemiesBulletCollider){
				this.enemiesBulletCollider.destroy()
				this.enemiesBulletCollider = null;
			}
			if(this.playerBulletCollider){
				this.playerBulletCollider.destroy()
				this.playerBulletCollider = null
			}
			if(this.enemiesGrenadesCollider){
				this.enemiesGrenadesCollider.destroy()
				this.enemiesGrenadesCollider = null
			}

			if(this.hpText){
				this.hpText.destroy();
			}
	
			this.destroy();
		}
	}

	updateYPosition(yPosition){
		this.body.position.y = this.body.position.y + (yPosition - this.body.center.y)
	}

	anchor(){
		this.enemiesBulletCollider = this.scene.physics.add.overlap(
			this, 
			this.scene.enemiesBulletsGroup, 
			(obj1, obj2) => this.gotBullet(obj1, obj2, 'enemy'), 
			null, 
			this
		);

		this.playerBulletCollider = this.scene.physics.add.overlap(
			this, 
			this.scene.playerBulletsGroup, 
			(obj1, obj2) => this.gotBullet(obj1, obj2, 'player'), 
			null, 
			this
		);

		this.enemiesGrenadesCollider = this.scene.physics.add.overlap(
			this, 
			this.scene.grenadesGroup, 
			(obj1, obj2) => this.gotGrenade(obj1, obj2, 'enemy'), 
			null, 
			this
		);

		this.setTexture('shield')

		this.hpText = new HPText(this.scene, this.body.center.x, this.body.center.y, this.hp, this);
		this.hpText.update();
	}

	getHPPosition(){
		return {
			x: this.body.center.x,
			y: this.body.center.y > this.scene.height / 2 
				? this.body.center.y - (this.displayHeight / 2) - 15
				: this.body.center.y + (this.displayHeight / 2) + 15
		}
    }

	update(){
		if(this.hpText){
			this.hpText.update()
		}
	}
}


export default class CurtainsGroup extends Phaser.Physics.Arcade.Group {
	constructor(scene) {
		super(scene.physics.world, scene);

		this.createMultiple({
			frameQuantity: 4,
			key: 'curtain',
			active: false,
			visible: false,
			classType: Curtain
		});

		this.settingShield = null;
	}

	setWall(y, height){
		const wall = this.getFirstDead(true);

		if(wall) {
			wall.set(y, this.scene.gameConfig.wallWidth, height, 'wall')
		}
	}

	canSetShield(){
		var isAnyActiveShield = false;

		this.children.each(child => {
			if(child.type == 'shield' && child.active){
				isAnyActiveShield = true
			}
		})

		return !isAnyActiveShield;
	}

	setShield(y){
		const shield = this.getFirstDead(true);

		if(shield) {
			shield.set(y, this.scene.gameConfig.shieldWidth, this.scene.gameConfig.shieldHeight, 'shield')
			this.settingShield = shield
		}
	}

	updateShieldPosition(yPosition){
		if(this.settingShield){
			this.settingShield.updateYPosition(yPosition)
		}
	}

    anchorShield(){
		if(this.settingShield){
			this.settingShield.anchor();
			this.settingShield = null;
		}
    }
}