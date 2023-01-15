import Phaser from 'phaser';

const colors = {
    green: {
        default: "#31822e",
        hover: "#2a7027",
        active: "#21691e",
        text: '#ffffff',
    },
    info: {
        default: '#acb8ab',
        hover: '#99a398',
        active: '#8a948a',
        text: '#ffffff'
    }
}

export default class Button extends Phaser.GameObjects.Text {
    constructor(scene, x, y, paddingX, paddingY, text, style, callback, color = "green") {
        super(scene, x, y, text, style);

        this.color = colors[color]
  
        this.setInteractive({ useHandCursor: true })
            .on('pointerover', () => this.onPointerOver() )
            .on('pointerout', () => this.onPointerOut() )
            .on('pointerdown', () => this.onPointerDown() )
            .on('pointerup', () => {
                this.onPointerOver();
                callback();
            });

        this.setStyle({
            backgroundColor: this.color.default,
            color: this.color.text,
            font: "20px Arial",
            stroke: '#000000',
            strokeThickness: 6,
            ...style
        })

        this.setPadding(paddingX, paddingY)

        this.setOrigin(0.5, 0.5)
    }
  
    onPointerOver() {
        this.setStyle({ backgroundColor: this.color.active});
    }
  
    onPointerOut() {
        this.setStyle({ backgroundColor: this.color.default});
    }
  
    onPointerDown() {
        this.setStyle({ backgroundColor: this.color.hover});
    }
}