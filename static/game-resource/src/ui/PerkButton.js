import Phaser from 'phaser';
import { perksConfig } from '../scenes/MainMenu';

export default class PerkButton {
    constructor(scene, x, y, perkKey, buttonStage, text, callback){
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.perkKey = perkKey;
        this.buttonStage = buttonStage;
        this.text = text;
        this.callback = callback;

        this.defaultBackgroundColor = '#31822e';
        // this.defaultBackgroundColor = '#acb8ab';
        this.hoverBackgroundColor = '#2a7027';
        this.activeBackgroundColor = '#21691e';

        // this.defaultTextColor = '#d1d1d1';
        // this.activeTextColor = '#b8b4b4';
        this.defaultTextColor = '#d1d1d1';
        this.activeTextColor = '#b8b4b4';

        this.createText();
        this.updateStyle();
    }

    onPointerOver() {
        this.pointerOver = true;
    }
  
    onPointerOut() {
        this.pointerOver = false;
    }
  
    onPointerDown() {
        this.pointerDown = true;
    }

    onPointerUp(){
        this.pointerDown = false;
        this.callback();
    }

    updateStyle(){
        if(!this.textObject || (this.textObject && !this.textObject.active)){
            return;
        }

        // if(this.scene.playerPerksConfig[this.perkKey].stage == this.buttonStage){
        //     this.textObject.setStyle({
        //         color: this.activeTextColor
        //     })
        // } else {
        //     this.textObject.setStyle({
        //         color: this.activeTextColor
        //     })
        // }

        if(this.pointerDown || this.scene.playerPerksConfig[this.perkKey].stage == this.buttonStage){
            this.textObject.setStyle({
                backgroundColor: this.activeBackgroundColor
            })
            return;
        }

        if(this.pointerOver){
            this.textObject.setStyle({
                backgroundColor: this.hoverBackgroundColor
            })
            return;
        }

        this.textObject.setStyle({
            backgroundColor: this.defaultBackgroundColor
        })
    }

    createText(){
        this.textObject = new Phaser.GameObjects.Text(
            this.scene, 
            this.x,
            this.y, 
            this.text,
            {
                font: '18px bold Arial',
                color: 'white',
                stroke: '#000',
                strokeThickness: 3
            }
        ).setOrigin(0.5, 0.5)
        .setPadding(
            perksConfig[this.perkKey].optionsLabelsXPadding[this.buttonStage], 
            8
        )
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => this.onPointerOver() )
        .on('pointerout', () => this.onPointerOut() )
        .on('pointerdown', () => this.onPointerDown() )
        .on('pointerup', () => this.onPointerUp());

        this.scene.add.existing(this.textObject)
    }

    update(){
        this.updateStyle();
    }

    destroy(){
        if(this.textObject){
            this.textObject.destroy();
        }
    }
}
