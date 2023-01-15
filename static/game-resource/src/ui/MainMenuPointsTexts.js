import Phaser from "phaser";

export default class MainMenuPointsTexts {
    constructor(scene){
        this.scene = scene;

        this.addTotalCoinsText();
        this.addLeftCoinsText();
        this.addHintText();
    }

    getTotalCoinsText(){
        return `You have ${this.scene.playerPoints + this.scene.playerPointsForIssues} points`.toUpperCase()
    }

    addTotalCoinsText(){
        this.totalCoinsText = new Phaser.GameObjects.Text(
            this.scene, 
            this.scene.width - 34, 
            10, 
            this.getTotalCoinsText(),
            {
                font: '28px Arial',
                color: 'white',
                stroke: '#000',
                strokeThickness: 4, 
            }
        ).setOrigin(1, 0)
        this.scene.add.existing(this.totalCoinsText)
    }

    getHintText(){
        return `10 default + ${this.scene.playerPointsForIssues} for ${this.scene.solvedIssues} done issues`
    }

    addHintText(){
        this.hintText = new Phaser.GameObjects.Text(
            this.scene, 
            this.scene.width - 34, 
            45, 
            this.getHintText(),
            {
                font: '14px Arial',
                color: 'white',
                stroke: '#000',
                strokeThickness: 4, 
            }
        ).setOrigin(1, 0)
        this.scene.add.existing(this.hintText)
    }

    getLeftCoinsText(){
        return `${(this.scene.playerPoints + this.scene.playerPointsForIssues) - this.scene.playerSpentPoints} points left`.toUpperCase()
    }

    addLeftCoinsText(){
        this.leftCoinsText = new Phaser.GameObjects.Text(
            this.scene, 
            this.scene.width - 34, 
            75, 
            this.getLeftCoinsText(),
            {
                font: '22px Arial',
                color: 'white',
                stroke: '#000',
                strokeThickness: 4, 
            }
        ).setOrigin(1, 0)
        this.scene.add.existing(this.leftCoinsText)
    }

    update(){
        if(this.totalCoinsText){
            this.totalCoinsText.setText(this.getTotalCoinsText())
        }
        
        if(this.hintText){
            this.hintText.setText(this.getHintText())
        }

        if(this.leftCoinsText){
            this.leftCoinsText.setText(this.getLeftCoinsText())
        }
    }
}