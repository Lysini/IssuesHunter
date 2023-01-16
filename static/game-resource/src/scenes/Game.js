import Phaser from 'phaser';
import Player from '../characters/Player'
import EnemiesBulletsGroup from '../objects/EnemiesBulletsGroup';
import PlayerBulletsGroup from '../objects/PlayerBulletsGroup';
import EnemiesGroup from '../characters/EnemiesGroup'
import CurtainsGroup from '../objects/CurtainsGroup';
import GrenadesGroup from '../objects/GrenadesGroup';
import ExplosionsGroup from '../objects/ExplosionsGroup';
import BonusBox from '../objects/BonusBox';
import PlayerUI from '../objects/PlayerUI';
import GameOverComponent from '../ui/GameOverComponent';

import background from  '../assets/sprites/background.png'

import player from  '../assets/sprites/player.png'
import player_idle_1 from  '../assets/sprites/player_idle/player_idle_1.png'
import player_idle_2 from  '../assets/sprites/player_idle/player_idle_2.png'
import player_idle_3 from  '../assets/sprites/player_idle/player_idle_3.png'
import player_idle_4 from  '../assets/sprites/player_idle/player_idle_4.png'
import player_idle_5 from  '../assets/sprites/player_idle/player_idle_5.png'
import player_killed_1 from  '../assets/sprites/player_killed/player_killed_1.png'
import player_killed_2 from  '../assets/sprites/player_killed/player_killed_2.png'
import player_killed_3 from  '../assets/sprites/player_killed/player_killed_3.png'
import player_killed_4 from  '../assets/sprites/player_killed/player_killed_4.png'
import player_killed_5 from  '../assets/sprites/player_killed/player_killed_5.png'
import player_killed_6 from  '../assets/sprites/player_killed/player_killed_6.png'
import player_killed_7 from  '../assets/sprites/player_killed/player_killed_7.png'
import player_killed_8 from  '../assets/sprites/player_killed/player_killed_8.png'
import player_killed_9 from  '../assets/sprites/player_killed/player_killed_9.png'
import player_killed_10 from  '../assets/sprites/player_killed/player_killed_10.png'
import player_run_1 from  '../assets/sprites/player_run/player_run_1.png'
import player_run_2 from  '../assets/sprites/player_run/player_run_2.png'
import player_run_3 from  '../assets/sprites/player_run/player_run_3.png'
import player_run_4 from  '../assets/sprites/player_run/player_run_4.png'
import player_run_5 from  '../assets/sprites/player_run/player_run_5.png'
import player_run_6 from  '../assets/sprites/player_run/player_run_6.png'
import player_run_7 from  '../assets/sprites/player_run/player_run_7.png'
import player_run_8 from  '../assets/sprites/player_run/player_run_8.png'
import player_run_9 from  '../assets/sprites/player_run/player_run_9.png'
import player_run_10 from  '../assets/sprites/player_run/player_run_10.png'


import enemy from  '../assets/sprites/enemy.png'
import enemy_idle_1 from  '../assets/sprites/enemy_idle/enemy_idle_1.png'
import enemy_idle_2 from  '../assets/sprites/enemy_idle/enemy_idle_2.png'
import enemy_killed_1 from  '../assets/sprites/enemy_killed/enemy_killed_1.png'
import enemy_killed_2 from  '../assets/sprites/enemy_killed/enemy_killed_2.png'
import enemy_killed_3 from  '../assets/sprites/enemy_killed/enemy_killed_3.png'
import enemy_killed_4 from  '../assets/sprites/enemy_killed/enemy_killed_4.png'
import enemy_killed_5 from  '../assets/sprites/enemy_killed/enemy_killed_5.png'
import enemy_killed_6 from  '../assets/sprites/enemy_killed/enemy_killed_6.png'
import enemy_killed_7 from  '../assets/sprites/enemy_killed/enemy_killed_7.png'
import enemy_killed_8 from  '../assets/sprites/enemy_killed/enemy_killed_8.png'
import enemy_killed_9 from  '../assets/sprites/enemy_killed/enemy_killed_9.png'
import enemy_killed_10 from  '../assets/sprites/enemy_killed/enemy_killed_10.png'
import enemy_killed_11 from  '../assets/sprites/enemy_killed/enemy_killed_11.png'
import enemy_killed_12 from  '../assets/sprites/enemy_killed/enemy_killed_12.png'
import enemy_killed_13 from  '../assets/sprites/enemy_killed/enemy_killed_13.png'
import enemy_run_1 from  '../assets/sprites/enemy_run/enemy_run_1.png'
import enemy_run_2 from  '../assets/sprites/enemy_run/enemy_run_2.png'
import enemy_run_3 from  '../assets/sprites/enemy_run/enemy_run_3.png'
import enemy_run_4 from  '../assets/sprites/enemy_run/enemy_run_4.png'
import enemy_run_5 from  '../assets/sprites/enemy_run/enemy_run_5.png'
import enemy_run_6 from  '../assets/sprites/enemy_run/enemy_run_6.png'
import enemy_run_7 from  '../assets/sprites/enemy_run/enemy_run_7.png'
import enemy_run_8 from  '../assets/sprites/enemy_run/enemy_run_8.png'
import enemy_run_9 from  '../assets/sprites/enemy_run/enemy_run_9.png'
import enemy_run_10 from  '../assets/sprites/enemy_run/enemy_run_10.png'

import explosion_1 from  '../assets/sprites/explosion/explosion_1.png'
import explosion_2 from  '../assets/sprites/explosion/explosion_2.png'
import explosion_3 from  '../assets/sprites/explosion/explosion_3.png'
import explosion_4 from  '../assets/sprites/explosion/explosion_4.png'
import explosion_5 from  '../assets/sprites/explosion/explosion_5.png'
import explosion_6 from  '../assets/sprites/explosion/explosion_6.png'
import explosion_7 from  '../assets/sprites/explosion/explosion_7.png'


import wall from  '../assets/sprites/wall.png'
import grenade from  '../assets/sprites/grenade.png'
import bullet from  '../assets/sprites/bullet.png'
import box from  '../assets/sprites/box.png'
import box_opened from  '../assets/sprites/box_opened.png'
import crosshair from  '../assets/sprites/crosshair.png'
import shield from  '../assets/sprites/shield.png'
import shield_icon from  '../assets/sprites/shield_icon.png'
import shield_ghost from  '../assets/sprites/shield_ghost.png'


const wallsVariants = {
    0: [],
    1: [{ x: 0, y: 300, height: 130 }],
    2: [
        { x: 0, y: 150, height: 110 },
        { x: 0, y: 450, height: 110 }
    ],
    3: [
        { x: 0, y: 50, height: 80 },
        { x: 0, y: 300, height: 120 },
        { x: 0, y: 550, height: 80 }
    ]
}

const getDifficultyConfig = (wave) => {
    const limits = {
        enemyMaxBulletSpeed: 700,

        pistolMinShootingPause: 1500,
        pistolMinAmmoRegenerationTime: 1500,

        rifleMinShootingPause: 120,
        rifleMinAmmoRegenerationTime: 4000,

        shotgunMinShootingPause: 1500,
        shotgunMinAmmoRegenerationTime: 5000,

        enemyMaxGrenadeDamage: 70,

        enemyMaxGrenadeRange: 100,

        maxRifleEnemies: 5,

        maxShotgunEnemies: 3,

        maxGrenadesEnemies: 4,

        maxEnemyHP: 40,

        enemyMaxBulletDamage: 10,

        maxEnemies: 15,

        enemyMinStayChance: 10
    }

    return {
        enemyBulletSpeed: Math.min(600 + (wave - 1) * 10 , limits.enemyMaxBulletSpeed),
    
        pistolShootingPause: Math.max(2000 - (wave - 1) * 20, limits.pistolMinShootingPause),
        pistolAmmoRegenerationTime: Math.max(2000 - (wave - 1) * 20, limits.pistolMinAmmoRegenerationTime),

        rifleShootingPause: Math.max(150 - (wave - 1) * 2, limits.rifleMinShootingPause),
        rifleAmmoRegenerationTime: Math.max(6000 - (wave - 1) * 60, limits.rifleMinAmmoRegenerationTime),

        shotgunShootingPause: Math.max(3000 - (wave - 1) * 40, limits.shotgunMinShootingPause),
        shotgunAmmoRegenerationTime: Math.max(10000 - (wave - 1) * 200, limits.shotgunMinAmmoRegenerationTime),
        
        enemyGrenadeDamage: Math.min(Math.floor(20 + (wave - 1) * 1.5), limits.enemyMaxGrenadeDamage),
        enemyGrenadeRange: Math.min(50 + (wave - 1) * 2 , limits.enemyMaxGrenadeRange),
        
        enemyMinGrenadePause: 10 * 1000,
        enemyMaxGrenadePause: 30 * 1000,
        
        rifleEnemies: Math.min(Math.floor(0 + (wave - 1) * 0.2), limits.maxRifleEnemies),
        
        shotgunEnemies: Math.min(Math.floor(0 + (wave - 1) * 0.3), limits.maxShotgunEnemies),

        grenadesEnemies: Math.min(Math.floor(2 + (wave - 1) * 3.75), limits.maxGrenadesEnemies),
        
        enemyHP: Math.min(Math.floor(20 + (wave - 1) * 2), limits.maxEnemyHP),

        enemyBulletDamage: Math.min(Math.floor(5 + (wave - 1) * 0.2), limits.enemyMaxBulletDamage),

        enemies: Math.min(Math.floor(10 + (wave - 1) * 0.3), limits.maxEnemies),

        enemyStayChance: Math.max(Math.ceil(40 - (wave - 1) * 2), limits.enemyMinStayChance)
    }
}

export default class Game extends Phaser.Scene {
    constructor(){
        super({ key: "game" });
    }
    
    width;
    height;

    gameConfig = {
        wallWidth: 25,
        wallXPosition: 140,
        shieldXPostion: 160,
        shieldWidth: 15,
        shieldHeight: 100,
        shieldHP: 500
    }

    playerConfig = {
        playerMovesYPadding: 20,
        // in miliseconds
        playerShootingPause: 110,
        playerBulletSpeed: 750,
        playerGrenadePause: 200,
        playerGrenadeRange: 100,
        maxPlayerGrenadeDamage: 40,
    }

    enemyConfig = {
        enemyBulletSpeed: 600,
        enemyShootingPause: 150,
        minEnemyGrenadePause: 10 * 1000,
        maxEnemyGrenadePause: 20 * 1000,
        maxEnemyGrenadeDamage: 20,
    }

    difficultyConfig = getDifficultyConfig(1)

    playerPerksConfig = {};
    // in miliseconds

    wave = 0;

    bonusBox = null;
    wasBonusBoxThisWave = false;

    perksValues = {
        bulletSpeed: 1,
        enemyBulletSpeed: 1,
        lowerDamage: 1,
        maxGrenades: 3,
        maxHP: 100,
        maxShields: 1,
        moveSpeed: 1,
        rofSpeed: 1,
        walls: 0
    }

    userDisplayName = ''

    init (data){
        this.playerPerksConfig = data.playerPerksConfig
        this.userDisplayName = data.userDisplayName

        Object.keys(this.playerPerksConfig).forEach(key => {
            this.perksValues[key] = this.playerPerksConfig[key].value
        })
    }

    setGameVariables(){
        this.wave = 0;
    
        this.bonusBox = null;
        this.wasBonusBoxThisWave = false;
    }

    create() {
        this.gameIsActive = true;

        this.width = this.cameras.main.width;
        this.height = this.cameras.main.height;

        this.add.image(this.width / 2, this.height / 2, 'background');

        this.anims.create({
            key: 'player_idle',
            frames: [
                { key: 'player_idle_1' },
                { key: 'player_idle_2' },
                { key: 'player_idle_3' },
                { key: 'player_idle_4' },
                { key: 'player_idle_5' }
            ],
            frameRate: 8,
            repeat: -1
        })

        this.anims.create({
            key: 'player_killed',
            frames: [
                { key: 'player_killed_1' },
                { key: 'player_killed_2' },
                { key: 'player_killed_3' },
                { key: 'player_killed_4' },
                { key: 'player_killed_5' },
                { key: 'player_killed_6' },
                { key: 'player_killed_7' },
                { key: 'player_killed_8' },
                { key: 'player_killed_9' },
                { key: 'player_killed_10' }
            ],
            frameRate: 8,
            repeat: 0
        })

        this.anims.create({
            key: 'player_run',
            frames: [
                { key: 'player_run_1' },
                { key: 'player_run_2' },
                { key: 'player_run_3' },
                { key: 'player_run_4' },
                { key: 'player_run_5' },
                { key: 'player_run_6' },
                { key: 'player_run_7' },
                { key: 'player_run_8' },
                { key: 'player_run_9' },
                { key: 'player_run_10' }
            ],
            frameRate: 8,
            repeat: -1
        })

        this.anims.create({
            key: 'enemy_idle',
            frames: [
                { key: 'enemy_idle_1' },
                { key: 'enemy_idle_2' }
            ],
            frameRate: 8,
            repeat: -1
        })

        this.anims.create({
            key: 'enemy_killed',
            frames: [
                { key: 'enemy_killed_1' },
                { key: 'enemy_killed_2' },
                { key: 'enemy_killed_3' },
                { key: 'enemy_killed_4' },
                { key: 'enemy_killed_5' },
                { key: 'enemy_killed_6' },
                { key: 'enemy_killed_7' },
                { key: 'enemy_killed_8' },
                { key: 'enemy_killed_9' },
                { key: 'enemy_killed_10' },
                { key: 'enemy_killed_11' },
                { key: 'enemy_killed_12' },
                { key: 'enemy_killed_13' }
            ],
            frameRate: 8,
            repeat: 0
        })

        this.anims.create({
            key: 'enemy_run',
            frames: [
                { key: 'enemy_run_1' },
                { key: 'enemy_run_2' },
                { key: 'enemy_run_3' },
                { key: 'enemy_run_4' },
                { key: 'enemy_run_5' },
                { key: 'enemy_run_6' },
                { key: 'enemy_run_7' },
                { key: 'enemy_run_8' },
                { key: 'enemy_run_9' },
                { key: 'enemy_run_10' }
            ],
            frameRate: 8,
            repeat: -1
        })

        this.anims.create({
            key: 'explosion',
            frames: [
                { key: 'explosion_1' },
                { key: 'explosion_2' },
                { key: 'explosion_3' },
                { key: 'explosion_4' },
                { key: 'explosion_5' },
                { key: 'explosion_6' },
                { key: 'explosion_7' }
            ],
            frameRate: 8,
            repeat: 0
        })

        // this.anims.create({
        //     key: 'snooze',
        //     frames: [
        //         { key: 'box_1' },
        //         { key: 'box_2', duration: 50 }
        //     ],
        //     frameRate: 8,
        //     repeat: 0
        // });
        // this.add.sprite(200, 100, 'box_1').setSize(50, 50).play('snooze');

        this.physics.world.setBounds(0, 0, this.width, this.height);
    }

    preload(){
        this.load.image('background', background);

        this.load.image('player', player);
        this.load.image('player_idle_1', player_idle_1);
        this.load.image('player_idle_2', player_idle_2);
        this.load.image('player_idle_3', player_idle_3);
        this.load.image('player_idle_4', player_idle_4);
        this.load.image('player_idle_5', player_idle_5);
        this.load.image('player_killed_1', player_killed_1);
        this.load.image('player_killed_2', player_killed_2);
        this.load.image('player_killed_3', player_killed_3);
        this.load.image('player_killed_4', player_killed_4);
        this.load.image('player_killed_5', player_killed_5);
        this.load.image('player_killed_6', player_killed_6);
        this.load.image('player_killed_7', player_killed_7);
        this.load.image('player_killed_8', player_killed_8);
        this.load.image('player_killed_9', player_killed_9);
        this.load.image('player_killed_10', player_killed_10);
        this.load.image('player_run_1', player_run_1);
        this.load.image('player_run_2', player_run_2);
        this.load.image('player_run_3', player_run_3);
        this.load.image('player_run_4', player_run_4);
        this.load.image('player_run_5', player_run_5);
        this.load.image('player_run_6', player_run_6);
        this.load.image('player_run_7', player_run_7);
        this.load.image('player_run_8', player_run_8);
        this.load.image('player_run_9', player_run_9);
        this.load.image('player_run_10', player_run_10);

        this.load.image('enemy', enemy);
        this.load.image('enemy_idle_1', enemy_idle_1);
        this.load.image('enemy_idle_2', enemy_idle_2);
        this.load.image('enemy_killed_1', enemy_killed_1);
        this.load.image('enemy_killed_2', enemy_killed_2);
        this.load.image('enemy_killed_3', enemy_killed_3);
        this.load.image('enemy_killed_4', enemy_killed_4);
        this.load.image('enemy_killed_5', enemy_killed_5);
        this.load.image('enemy_killed_6', enemy_killed_6);
        this.load.image('enemy_killed_7', enemy_killed_7);
        this.load.image('enemy_killed_8', enemy_killed_8);
        this.load.image('enemy_killed_9', enemy_killed_9);
        this.load.image('enemy_killed_10', enemy_killed_10);
        this.load.image('enemy_killed_11', enemy_killed_11);
        this.load.image('enemy_killed_12', enemy_killed_12);
        this.load.image('enemy_killed_13', enemy_killed_13);
        this.load.image('enemy_run_1', enemy_run_1);
        this.load.image('enemy_run_2', enemy_run_2);
        this.load.image('enemy_run_3', enemy_run_3);
        this.load.image('enemy_run_4', enemy_run_4);
        this.load.image('enemy_run_5', enemy_run_5);
        this.load.image('enemy_run_6', enemy_run_6);
        this.load.image('enemy_run_7', enemy_run_7);
        this.load.image('enemy_run_8', enemy_run_8);
        this.load.image('enemy_run_9', enemy_run_9);
        this.load.image('enemy_run_10', enemy_run_10);

        this.load.image('explosion_1', explosion_1);
        this.load.image('explosion_2', explosion_2);
        this.load.image('explosion_3', explosion_3);
        this.load.image('explosion_4', explosion_4);
        this.load.image('explosion_5', explosion_5);
        this.load.image('explosion_6', explosion_6);
        this.load.image('explosion_7', explosion_7);


        this.load.image('wall', wall);
        this.load.image('grenade', grenade);
        this.load.image('bullet', bullet);
        this.load.image('box', box);
        this.load.image('box_opened', box_opened);
        this.load.image('crosshair', crosshair);
        this.load.image('shield', shield);
        this.load.image('shield_icon', shield_icon);
        this.load.image('shield_ghost', shield_ghost);

        this.progressBar = this.add.graphics();
        this.progressBox = this.add.graphics();
        this.progressBox.fillStyle(0x222222, 0.8);
        this.progressBox.fillRect(240, 270, 460, 50);

        this.loadingText = this.make.text({
            x: this.width / 2,
            y: this.height / 2 - 50,
            text: 'Loading...',
            style: {
                font: '20px monospace',
            },
        });
        this.loadingText.setOrigin(0.5, 0.5);

        this.percentText = this.make.text({
            x: this.width / 2,
            y: this.height / 2 - 5,
            text: '0%',
            style: {
                font: '18px monospace',
            },
        });
        this.percentText.setOrigin(0.5, 0.5);

        this.load.on('progress', (value) => {
            this.percentText.setText(`${Math.ceil(value * 100)}%`);
            this.progressBar.clear();
            this.progressBar.fillStyle(0xffffff, 1);
            this.progressBar.fillRect(250, 280, 440 * value, 30);
        });

        this.load.on('complete', () => {
            this.loadComplete = true;
        });
    }

    loadCompleted() {
        this.enemiesBulletsGroup = new EnemiesBulletsGroup(this);
        this.playerBulletsGroup = new PlayerBulletsGroup(this);
        this.enemiesGroup = new EnemiesGroup(this);
        this.curtainsGroup = new CurtainsGroup(this);
        this.grenadesGroup = new GrenadesGroup(this);
        this.explosionsGroup = new ExplosionsGroup(this);

        wallsVariants[this.perksValues.walls].forEach(wall => {
            this.curtainsGroup.setWall(wall.y, wall.height)
        })

        this.player = new Player(this, 70, this.height / 2);
        this.playerUI = new PlayerUI(this);

        this.startNextWave();

        // for DEV
        // this.gameOver = true;
        // this.gameOverComponent = new GameOverComponent(this)
    }

    startNextWave(){
        if(this.wave > 0 && !this.wasBonusBoxThisWave){
            this.addBonusBox()
        }

        this.wave++

        this.waveText = new Phaser.GameObjects.Text(
            this, 
            this.width / 2, 
            200,
            `WAVE ${this.wave}`,
            {
                font: '50px Arial',
                color: 'white',
                stroke: '#000',
                strokeThickness: 8, 
            }
        ).setOrigin(0.5, 1).setDepth(2)
        this.add.existing(this.waveText)
        this.waveTextDissapearTime = this.time.now + 2000

        setTimeout(() => {
            this.difficultyConfig = getDifficultyConfig(this.wave)

            const shotgunEnemies = this.difficultyConfig.shotgunEnemies;
            const rifleEnemies = this.difficultyConfig.rifleEnemies;
            const pistolEnemies = Math.max(this.difficultyConfig.enemies - this.difficultyConfig.shotgunEnemies - this.difficultyConfig.rifleEnemies, 0);

            var enemiesIndexes = []
            for(i = 0; i < this.difficultyConfig.enemies; i++){ enemiesIndexes.push(i) }

            const enemiesWithGrenades = enemiesIndexes.sort(() => .5 - Math.random()).slice(0,this.difficultyConfig.grenadesEnemies)    

            var enemiesTypes = [];
            for(var i = 0; i < pistolEnemies; i++){ enemiesTypes.push('pistol')}
            for(var i = 0; i < rifleEnemies; i++){ enemiesTypes.push('rifle')}
            for(var i = 0; i < shotgunEnemies; i++){ enemiesTypes.push('shotgun')}

            enemiesTypes.forEach((enemyType, i) => {
                this.enemiesGroup.addEnemy(enemyType, enemiesWithGrenades.includes(i));
            })
            
            this.waveStarted = true;

            this.wasBonusBoxThisWave = false;
            this.bonusBoxArrivalTime = this.time.now + Phaser.Math.Between(10 * 1000, 40 * 1000)
        }, 3 * 1000)
    }

    playerCollectedBonusBox(drop){
        this.player.onCollectBonusBox(drop);
        
        this.bonusBoxDestroyTime = this.time.now + 500
        
        if(this.playerUI.bonusInfoText){
            this.playerUI.bonusInfoText.showBonusDescription(this.player.getBonusBoxDropDescription(drop))
        }
    }

    addBonusBox(){
        if(this.gameOver){
            return ;
        }

        if(this.bonusBox){
            this.bonusBox.destroy();
            this.bonusBoxDestroyTime = null;
        }

        var x = this.player.body.center.x;
		var y = 10;

        var loopLimiter = 0
		do{
			y = Phaser.Math.Between(
                this.playerConfig.playerMovesYPadding, 
                this.height - this.playerConfig.playerMovesYPadding
            )
			loopLimiter++;
		} while(Math.abs(this.player.body.center.y - y) < 150 && loopLimiter < 10)

        this.wasBonusBoxThisWave = true;
        this.bonusBox = new BonusBox(this, x, y);

        this.bonusBoxesHideTime = this.time.now + (3 * 1000)
    }

    clearBonusBox(){
        this.bonusBox.destroy();
        this.bonusBox = null;
        this.bonusBoxDestroyTime = null;
    }

    onPlayerKilled(){
        this.gameOver = true;

        if(!this.gameOverComponent){
            this.gameOverComponent = new GameOverComponent(this)
        }
    }

    goToMainMenu(){
        this.clearGame()
    
        this.scene.start('main_menu', this.playerPerksConfig);
    }

    clearGame(){
        this.wave = 0;
        this.gameIsActive = false;
        this.waveStarted = false;
        this.wasBonusBoxThisWave = false;
        this.bonusBoxArrivalTime = null;
        this.loadedCompletedRun = false;


        this.gameOver = false;
        this.gameOverComponent.destroy();
        this.gameOverComponent = null;
        
        this.enemiesBulletsGroup.destroy();
        this.enemiesBulletsGroup = null;

        this.playerBulletsGroup.destroy();
        this.playerBulletsGroup = null;

        this.enemiesGroup.destroy();
        this.enemiesGroup = null;

        this.curtainsGroup.destroy();
        this.curtainsGroup = null;

        this.grenadesGroup.destroy();
        this.grenadesGroup = null;

        this.explosionsGroup.destroy();
        this.explosionsGroup = null;

        this.player.destroy();
        this.player = null;

        this.playerUI.destroy();
        this.playerUI = null;

        if(this.waveText){
            this.waveText.destroy();
            this.waveText = null;
            this.waveTextDissapearTime = null;
        }

        if(this.bonusBox){
            this.bonusBox.destroy();
            this.bonusBox = null;
            this.bonusBoxDestroyTime = null;
        }

        this.children.each(child => child.destroy());
    }

    update() {
        if(this.loadComplete && !this.loadedCompletedRun){
            this.loadedCompletedRun = true;

            this.progressBar.destroy();
            this.progressBox.destroy();
            this.loadingText.destroy();
            this.percentText.destroy();

            this.loadCompleted();
        }

        if(!this.gameIsActive){
            return
        }

        if(this.waveText){
            if(this.time.now >= this.waveTextDissapearTime){
                this.waveText.destroy();
                this.waveText = null;
            }
        }
        
        if(this.player){
            this.player.update();
        }

        if(this.playerUI){
            this.playerUI.update();
        }

        var isAnyActiveObject = false;
        if(this.enemiesGroup){
            this.enemiesGroup.children.each(child => {
                if(child.active){
                    isAnyActiveObject = true;
                    child.update();
                }
            })
        }

        if(!isAnyActiveObject && this.waveStarted){
            this.waveStarted = false;
            this.startNextWave()
        }

        if(this.grenadesGroup){
            this.grenadesGroup.children.each(child => {
                if(child.active){
                    child.update();
                }
            })
        }

        if(this.explosionsGroup){
            this.explosionsGroup.children.each(child => {
                if(child.active){
                    child.update();
                }
            })
        }

        if(this.curtainsGroup){
            this.curtainsGroup.children.each(child => {
                if(child.active){
                    child.update();
                }
            })
        }

        if(this.bonusBox && this.bonusBoxDestroyTime >= this.time.now){
            this.bonusBox.destroy();
            this.bonusBox = null;
            this.bonusBoxDestroyTime = null;
        }

        if(this.bonusBox){
            this.bonusBox.update();

            if(this.bonusBoxesHideTime && this.time.now >= this.bonusBoxesHideTime){
                this.bonusBoxesHideTime = null;
                this.clearBonusBox();
            }
        }

        if(!this.wasBonusBoxThisWave && this.bonusBoxArrivalTime){
            if(this.time.now >= this.bonusBoxArrivalTime){
                this.addBonusBox();
            }
        }
    }
}