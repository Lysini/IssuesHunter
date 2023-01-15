import Phaser from 'phaser';
import Character from './Character';
import Crosshair from '../objects/Crosshair';
import { box_bonuses } from '../config';

export default class Player extends Character {
    constructor(scene, x, y, texture, frame){
        super (scene, x, y, 'player', frame);

        // Keyboard event
        this.keyW = this.scene.input.keyboard.addKey('W');
        this.keyS = this.scene.input.keyboard.addKey('S');
        this.keyF = this.scene.input.keyboard.addKey('F');
        this.keyG = this.scene.input.keyboard.addKey('G');

        // Mouse events
        this.scene.input.on('pointermove', (pointer) => this.onPointerMove(pointer))
        this.scene.input.on('pointerdown', () => this.onPointerDown())
        this.scene.input.on('pointerup', () => this.onPointerUp())

        this.pointer = new Crosshair(this.scene, 5, 5, 'pointer')
 
        // this.body.setSize(30, 30);
        // this.body.setOffset(0, 0);

        this.isMouseDown = false;
        this.lastShotTime = - 2 * this.scene.playerConfig.playerShootingPause;
        

        this.collider = this.scene.physics.add.overlap(
            this, 
            this.scene.enemiesBulletsGroup, 
            (obj1, obj2) => this.gotBullet(obj1, obj2), 
            null, 
            this
        );

        this.perksValues = this.scene.perksValues;

        this.score = 0;
        this.nextScoreBonusAt = 100;

        this.hp = this.perksValues.maxHP;
        this.grenades = this.perksValues.maxGrenades;
        this.lastGrenadeTime = - 2 * this.scene.playerConfig.playerGrenadePause;
        this.shields = this.perksValues.maxShields;
        this.isSettingShield = false;

        this.speedBonus = 1;
        this.rofBonus = 1;
        this.bonusEndTime = 0;

        this.play('player_idle');
        this.animation = 'idle';
        this.isKilled = false;

        this.displayHeight = 78;
        this.displayWidth = 66;

        this.height = 78;
        this.width = 66;
    }

    onPointerMove(pointer){
        this.pointer.setPosition(pointer.x, pointer.y)
    }

    onPointerDown(){
        this.isMouseDown = true;
    }

    onPointerUp(){
        this.isMouseDown = false;
    }

    gotBullet(player, bullet){
        bullet.destroy();

        this.gotDamage(this.scene.difficultyConfig.enemyBulletDamage)
    }

    gotDamage(damage){
        if(this.perksValues.lowerDamage != 1){
            damage = Math.ceil(damage * this.perksValues.lowerDamage)
        }

        this.hp -= damage;

        if(this.hp <= 0){
            this.onKilled()
        }
    }

    onKilled(){
        this.isKilled = true;
        this.play('player_killed')
        this.animation = 'killed'
        this.scene.onPlayerKilled();
    }

    shoot(){
        if(this.scene.time.now - (this.lastShotTime + (this.scene.playerConfig.playerShootingPause * this.rofBonus * this.perksValues.rofSpeed)) >= 0){
            this.scene.playerBulletsGroup.shoot(
                this.body.center.x + (this.displayWidth / 2), 
                this.body.center.y + (this.displayHeight * 0.18),
                this.pointer.body.center.x, 
                this.pointer.body.center.y,
            )
            this.lastShotTime = this.scene.time.now
        }
    }

    throwGrenade(){
        if(this.grenades > 0){
            if(this.scene.time.now - (this.lastGrenadeTime + this.scene.playerConfig.playerGrenadePause) >= 0){
                this.lastGrenadeTime = this.scene.time.now
                this.grenades--;

                this.scene.grenadesGroup.throwGrenade(
                    this.body.center.x, 
                    this.body.center.y, 
                    this.pointer.body.center.x, 
                    this.pointer.body.center.y,
                    'player'
                )
            }
        }
    }

    setShield(){
        if(this.shields > 0){
            // if(this.scene.curtainsGroup.canSetShield()){
                this.isSettingShield = true;
                this.scene.curtainsGroup.setShield(this.body.center.y)
            // }
        }
    }

    updateShieldPosition(){
        this.scene.curtainsGroup.updateShieldPosition(this.body.center.y)
    }

    anchorShield(){
        this.shields--;
        this.isSettingShield = false;
        this.scene.curtainsGroup.anchorShield()
    }

    addGrenade(amount){
        this.grenades = Math.min(
            this.grenades + amount,
            this.perksValues.maxGrenades
        )
    }

    addShield(amount){
        this.shields = Math.min(
            this.shields + amount,
            this.perksValues.maxShields
        )
    }

    addHealth(amount){
        this.hp = Math.min(
            this.hp + amount,
            this.perksValues.maxHP
        )
    }

    onCollectBonusBox(drop){
        if(drop == box_bonuses.GRENADE){
            this.addGrenade(2)
        }

        if(drop == box_bonuses.SHIELD){
            this.addShield(2)
        }

        if(drop == box_bonuses.HEALTH){
            this.addHealth(50)
        }

        if(drop == box_bonuses.SPEED_BONUS){
            this.bonusEndTime = this.scene.time.now + 30 * 1000
            this.speedBonus = 1.2
        }

        if(drop == box_bonuses.ROF_BONUS){
            this.bonusEndTime = this.scene.time.now + 30 * 1000
            this.rofBonus = 0.75
        }
    }

    getBonusBoxDropDescription(drop){
        switch(drop){
            case box_bonuses.GRENADE:
                return '+2 grenade'

            case box_bonuses.SHIELD:
                return '+2 shield'

            case box_bonuses.HEALTH:
                return '+50 HP'

            case box_bonuses.SPEED_BONUS:
                return '+20% moves speed for 30 seconds'

            case box_bonuses.ROF_BONUS:
                return '+25% rate of fire for 30 seconds'

            default:
                return ""
        }
    }

    getHPPosition(){
		return {
			x: this.body.center.x,
			// y: this.body.center.y - ( 3 * this.height / 4)
			y: this.body.center.y - (this.displayHeight / 2) - 5
		}
    }

    addScorePoints(points){
        this.score += points;
    }

    update() {
        if(this.scene.gameOver){
            this.body.setVelocity(0);
            return ;
        }

        if(this.score >= this.nextScoreBonusAt){
            this.nextScoreBonusAt += 100
            this.addGrenade(Math.ceil(this.perksValues.maxGrenades / 2));
            this.addShield(Math.ceil(this.perksValues.maxShields / 2));
            this.addHealth(Math.ceil(this.perksValues.maxHP / 2));
        }

        var playerSpeed = 450
        if(this.perksValues.moveSpeed != 1){
            playerSpeed = Math.ceil(playerSpeed * this.perksValues.moveSpeed)
        }

        var isMoving = false;

        if (this.keyW?.isDown) {
            if(this.body.center.y > this.scene.playerConfig.playerMovesYPadding + Math.ceil(this.height / 2)){
                this.body.velocity.y = -playerSpeed * this.speedBonus;
                isMoving = true;
            }
        }

        if (this.keyS?.isDown) {
            if(this.body.center.y < this.scene.height - this.scene.playerConfig.playerMovesYPadding - Math.ceil(this.height / 2)){
                this.body.velocity.y = playerSpeed * this.speedBonus;
                isMoving = true;
            }
        }

        if(isMoving){
            if(this.animation != 'run'){
                this.play('player_run')
                this.animation = 'run'
            }
        } else {
            this.body.velocity.y = 0

            if(!this.isKilled){
                this.play('player_idle')
                this.animation = 'idle'
            }
        }

        if(this.keyF?.isDown){
            if(this.isSettingShield){
                this.updateShieldPosition()
            } else {
                this.setShield();
            }
        }

        if(this.keyF?.isUp && this.isSettingShield){
            this.anchorShield()
        }

        if(this.keyG?.isDown){
            this.throwGrenade()
        }

        if(this.isMouseDown){
            this.shoot();
        }

        if(this.scene.time.now >= this.bonusEndTime){
            this.bonusEndTime = 0;
            this.speedBonus = 1;
            this.rofBonus = 1;
        }
    }
}