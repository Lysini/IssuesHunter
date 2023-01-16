import Phaser from 'phaser';
import Character from './Character';
import Utils from '../Utils';

export default class Enemy extends Character {
    constructor(scene, x, y, texture, frame){
        super (scene, x, y, "enemy", frame);

        this.isInitialMove = false;
        this.hasWalkDestination = false;
        this.isStaying = false
        this.collider = null;

        this.hp = 20
        this.hasGrenade = false;

        this.flipX = true;

        this.perksValues = this.scene.perksValues;

        this.play('enemy_run')
        this.animation = 'run'
    }

    setupEnemy(gunType = 'pistol', hasGrenade){
        this.hasGrenade = hasGrenade;
        this.gunType = gunType;

        if(this.gunType == 'pistol'){
            this.leftAmmo = 1;
            this.ammoRegenerationTime = this.scene.difficultyConfig.pistolAmmoRegenerationTime
            this.shootingPauseTime = this.scene.difficultyConfig.pistolShootingPause
        }

        if(this.gunType == 'rifle'){
            this.leftAmmo = 10;
            this.ammoRegenerationTime = this.scene.difficultyConfig.rifleAmmoRegenerationTime
            this.shootingPauseTime = this.scene.difficultyConfig.rifleShootingPause
        }

        if(this.gunType == 'shotgun'){
            this.leftAmmo = 3;
            this.ammoRegenerationTime = this.scene.difficultyConfig.shotgunAmmoRegenerationTime
            this.shootingPauseTime = this.scene.difficultyConfig.shotgunShootingPause
        }

        this.hp = this.scene.difficultyConfig.enemyHP

        this.lastShotTime = this.scene.time.now
        this.lastAddAmmoTime = this.scene.time.now + this.ammoRegenerationTime
        this.nextGrenadeTime = this.scene.time.now + Phaser.Math.Between(
            this.scene.difficultyConfig.enemyMinGrenadePause,
            this.scene.difficultyConfig.enemyMaxGrenadePause
        );

        this.isKilled = false;

        const x = this.scene.width + 100;
        const y = Phaser.Math.Between(this.body.height, this.scene.height - this.body.height);
        
        this.body.reset(x, y);

        this.displayHeight = 78;
        this.displayWidth = 66;

        this.height = 78;
        this.width = 66;

        this.setActive(true);
		this.setVisible(true);

        this.xDestination = this.scene.width - this.body.width * 2;
        this.yDestination = y;

        this.isInitialMove = true;
        this.hasWalkDestination = true;

        this.collider = this.scene.physics.add.overlap(
            this, 
            this.scene.playerBulletsGroup, 
            (obj1, obj2) => this.gotBullet(obj1, obj2), 
            null,
            this
        );
    }

    gotBullet(enemy, bullet){
        if(this.isInitialMove){
            return;
        }

        this.gotDamage(5)

        bullet.destroy()
    }

    gotDamage(damage){
        if(this.isInitialMove){
            return;
        }

        this.hp -= damage;

        if(this.hp <= 0){
            this.onKilled()
        }
    }

    onKilled(){
        if(this.isKilled){
            return;
        }
        
        if(this.collider){
            this.collider.destroy();
        }
        this.isKilled = true;
        this.scene.player.addScorePoints(5)
        this.play('enemy_killed')
        this.destroyOnTime = this.scene.time.now + 4000
    }

    setNextPointToGo(){
        if(!this.body || !this.scene || this.isKilled){
            return
        }
        
        const stayForAWhile = Phaser.Math.Between(0, 100) <= this.scene.difficultyConfig.enemyStayChance;
        const timeToStay = stayForAWhile ? Phaser.Math.Between(3, 5) * 1000 : 0
        
        if(timeToStay > 0){
            this.isStaying = true;

            this.play('enemy_idle')
            this.animation = 'idle'

            setTimeout(() => {
                if(this.scene && this.body){
                    this.xDestination = Phaser.Math.Between(
                        this.scene.width / 2, 
                        this.scene.width - (this.body.width * 2)
                    );
                    this.yDestination = Phaser.Math.Between(
                        this.body.height, 
                        this.scene.height - this.body.height
                    ); 

                    this.hasWalkDestination = true;
                }

                this.isStaying = false;
            }, timeToStay)
        } else {
            this.xDestination = Phaser.Math.Between(
                this.scene.width / 2, 
                this.scene.width - (this.body.width * 2)
            );
            this.yDestination = Phaser.Math.Between(
                this.body.height, 
                this.scene.height - this.body.height
            ); 

            this.hasWalkDestination = true;
            this.isStaying = false;
        }
    }

    addAmmo(){
        if(this.gunType == 'pistol'){
            this.leftAmmo = 1;
        }

        if(this.gunType == 'rifle'){
            this.leftAmmo = 10;
        }

        if(this.gunType == 'shotgun'){
            this.leftAmmo = 3;
        }

        this.lastAddAmmoTime = this.scene.time.now + this.ammoRegenerationTime
    }

    update(){
        if(this.destroyOnTime && this.scene.time.now >= this.destroyOnTime){
            this.destroyOnTime = null;
            this.destroy();

            return;
        }

        if(this.isKilled){
            this.setVelocityX(0);
            this.setVelocityY(0);
        }

        if(this.scene.gameOver){
            if(this.animation != 'idle'){
                this.play('enemy_idle')
                this.animation = 'idle'
            }
            
            this.setVelocityX(0);
            this.setVelocityY(0);

            return ;
        }

        if(this.isKilled){
            return;
        }

        if(this.lastAddAmmoTime){
            if(this.scene.time.now >= this.lastAddAmmoTime){
                this.addAmmo();
            }
        }

        if(this.leftAmmo > 0){
            if(this.scene.time.now >= this.lastShotTime + this.shootingPauseTime){
                this.scene.enemiesBulletsGroup.shoot(
                    this.body.center.x - (this.displayWidth / 2), 
                    this.body.center.y + (this.displayHeight * 0.2), 
                    this.scene.player.body.center.x, 
                    this.scene.player.body.center.y
                )

                if(this.gunType == 'shotgun'){
                    const recoil = Math.tan(Math.PI * (20 / 180)) * 200

                    this.scene.enemiesBulletsGroup.shoot(
                        this.body.center.x - (this.displayWidth / 2), 
                        this.body.center.y + (this.displayHeight * 0.2), 
                        this.scene.player.body.center.x, 
                        this.scene.player.body.center.y - recoil
                    )

                    this.scene.enemiesBulletsGroup.shoot(
                        this.body.center.x - (this.displayWidth / 2), 
                        this.body.center.y + (this.displayHeight * 0.2), 
                        this.scene.player.body.center.x, 
                        this.scene.player.body.center.y + recoil
                    )
                }

                this.lastShotTime = this.scene.time.now
                this.leftAmmo = Math.max(0, this.leftAmmo - 1)
            }

            // this.leftAmmo = 3;
            // this.ammoRegenerationTime = 10 * 1000
            // this.shootingPauseTime = 2 * 1000
        }

        // if(this.scene.time.now - (this.lastShotTime + this.scene.playerConfig.playerShootingPause) >= 0 && !this.isInitialMove){
        //     this.scene.enemiesBulletsGroup.shoot(
        //         this.body.center.x - (this.displayWidth / 2), 
        //         this.body.center.y + (this.displayHeight * 0.2), 
        //         this.scene.player.body.center.x, 
        //         this.scene.player.body.center.y
        //     )
        //     this.lastShotTime = this.scene.time.now
        // }

        if(this.hasGrenade && !this.isInitialMove){
            if(this.scene.time.now >= this.nextGrenadeTime){
                this.nextGrenadeTime = this.scene.time.now + Phaser.Math.Between(
                    this.scene.difficultyConfig.enemyMinGrenadePause,
                    this.scene.difficultyConfig.enemyMaxGrenadePause
                )

                this.scene.grenadesGroup.throwGrenade(
                    this.body.center.x, 
                    this.body.center.y, 
                    this.scene.player.body.center.x, 
                    this.scene.player.body.center.y,
                    'enemy'
                )
            }
        }

        if(Utils.getDistanceBetweenPoints(
            this.body.center.x, 
            this.body.center.y, 
            this.xDestination, 
            this.yDestination
        ) < 5){
            this.hasWalkDestination = false;
            if(this.isInitialMove){
                this.isInitialMove = false;
                this.nextGrenadeTime = this.scene.time.now + Phaser.Math.Between(
                    this.scene.difficultyConfig.enemyMinGrenadePause,
                    this.scene.difficultyConfig.enemyMaxGrenadePause
                )
                this.lastShotTime = this.scene.time.now - this.shootingPauseTime + Phaser.Math.Between(100, 2000)
            }
        }

        if(this.hasWalkDestination){
            if(this.animation != 'run'){
                this.play('enemy_run');
                this.animation = 'run';
            }
            this.scene.physics.moveTo(
                this,
                this.xDestination, 
                this.yDestination,
                200
            );
        } else {
            this.setVelocityX(0);
            this.setVelocityY(0);
            
            if(!this.isStaying){
                this.setNextPointToGo();
            }
        }
    }
}