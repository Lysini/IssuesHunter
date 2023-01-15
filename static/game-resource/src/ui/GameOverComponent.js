import Phaser from "phaser";
import Button from "./Button";

export default class GameOverComponent {
    constructor(scene){
        this.scene = scene;

        this.addBackground();
        this.addPlayerNameText();
        this.addGameOverText();
        this.addScoreText();
        this.addWaveText();
        this.addGoToMenuButton();
    }

    addBackground(){
        this.background = this.scene.add.rectangle(
            this.scene.width, this.scene.height, 
            0, 0, 
            0x000000
        ).setDepth(10);
        this.background.setFillStyle(0x000000, 0.3);

        this.background.x = 0
        this.background.y = 0

        this.background.width = this.scene.width;
        this.background.height = this.scene.height;
        
        this.background.displayWidth = this.scene.width;
        this.background.displayHeight = this.scene.height;
    }

    addPlayerNameText(){
        if(this.scene.userDisplayName != ''){
            this.playerNameText = new Phaser.GameObjects.Text(
                this.scene, 
                this.scene.width / 2, 
                (this.scene.height / 2) - 120, 
                this.scene.userDisplayName,
                {
                    font: '60px Arial',
                    color: 'white',
                    stroke: '#000',
                    strokeThickness: 10, 
                }
            ).setOrigin(0.5, 1).setDepth(10)
            this.scene.add.existing(this.playerNameText)
        }
    }

    addGameOverText(){
        this.gameOverText = new Phaser.GameObjects.Text(
            this.scene, 
            this.scene.width / 2, 
            (this.scene.height / 2) - 45, 
            "GAME OVER",
            {
                font: '60px Arial',
                color: 'white',
                stroke: '#000',
                strokeThickness: 10, 
            }
        ).setOrigin(0.5, 1).setDepth(10)
        this.scene.add.existing(this.gameOverText)
    }

    addScoreText(){
        this.scoreText = new Phaser.GameObjects.Text(
            this.scene, 
            this.scene.width / 2, 
            (this.scene.height / 2) + 5, 
            `SCORE: ${this.scene.player.score}`,
            {
                font: '35px Arial',
                color: 'white',
                stroke: '#000',
                strokeThickness: 8, 
            }
        ).setOrigin(0.5, 1).setDepth(10)
        this.scene.add.existing(this.scoreText)
    }

    addWaveText(){
        this.waveText = new Phaser.GameObjects.Text(
            this.scene, 
            this.scene.width / 2, 
            (this.scene.height / 2) + 55, 
            `WAVE: ${this.scene.wave}`,
            {
                font: '35px Arial',
                color: 'white',
                stroke: '#000',
                strokeThickness: 8, 
            }
        ).setOrigin(0.5, 1).setDepth(10)
        this.scene.add.existing(this.waveText)
    }

    addGoToMenuButton(){
        this.goToMenuButton = new Button(
            this.scene, 
            this.scene.width / 2, 
            (this.scene.height / 2) + 100,
            25,
            12,
            'MAIN MENU',
            {},
            () => this.scene.goToMainMenu(),
            'info'
        ).setDepth(10)
        this.scene.add.existing(this.goToMenuButton);
    }

    destroy(){
        if(this.playerNameText){
            this.playerNameText.destroy();
        }
        this.gameOverText.destroy();
        this.scoreText.destroy();
        this.waveText.destroy();
        this.goToMenuButton.destroy();
    }
}