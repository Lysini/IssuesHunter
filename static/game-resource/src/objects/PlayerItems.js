import Phaser from "phaser";

class PlayerItemAmount {
    constructor(scene, x, y, photo_name, amountText, amountLimit){
        this.scene = scene;
        this.amountLimit = amountLimit

        this.image = this.scene.add.image(x, y, photo_name);
        this.image.setSize(25, 25)
        this.image.displayWidth = 25;
        this.image.displayHeight = 25;
        this.image.setOrigin(0, 0.5)
        this.image.setDepth(5)

        this.amountText = new Phaser.GameObjects.Text(
            this.scene, 
            x + 30, 
            y + 8, 
            `${amountText}/${amountLimit}`,
            {
                font: '20px Arial',
                color: 'white',
                stroke: '#000',
                strokeThickness: 4, 
            }
        )
        this.amountText.setOrigin(0, 0.5)
        this.amountText.setDepth(5)
        this.scene.add.existing(this.amountText)
    }

    updateAmount(amount){
        this.amountText.setText(`${Math.max(amount, 0)}/${this.amountLimit}`)
    }

    destroy(){
        if(this.amountText){
            this.amountText.destroy()
        }
    }
}

export default class PlayerItems {
    constructor(scene){
        this.scene = scene;

        this.grenadesAmount = new PlayerItemAmount(
            this.scene,
            10,
            10,
            'grenade',
            this.scene.player.grenades,
            this.scene.perksValues.maxGrenades
        )

        this.shieldsAmount = new PlayerItemAmount(
            this.scene,
            10,
            40,
            'shield_icon',
            this.scene.player.shields,
            this.scene.perksValues.maxShields
        )
    }

    update(){
        if(this.grenadesAmount){
            this.grenadesAmount.updateAmount(this.scene.player.grenades);
        }

        if(this.shieldsAmount){
            this.shieldsAmount.updateAmount(this.scene.player.shields);
        }
    }

    destroy(){
        if(this.grenadesAmount){
            this.grenadesAmount.destroy();
        }

        if(this.shieldsAmount){
            this.shieldsAmount.destroy();
        }
    }
}