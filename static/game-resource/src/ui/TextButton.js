import Phaser from 'phaser';

export default class TextButton extends Phaser.GameObjects.Text {
    constructor(scene, x, y, text, style, callback) {
        super(scene, x, y, text, style);
  
        this.setInteractive({ useHandCursor: true })
            .on('pointerover', () => this.onPointerOver() )
            .on('pointerout', () => this.onPointerOut() )
            .on('pointerdown', () => this.onPointerDown() )
            .on('pointerup', () => {
                this.onPointerOver();
                callback();
            });
    }
  
    onPointerOver() {
        this.setStyle({ fill: '#ff0'});
    }
  
    onPointerOut() {
        this.setStyle({ fill: '#0f0'});
    }
  
    onPointerDown() {
        this.setStyle({ fill: '#0ff' });
    }
}