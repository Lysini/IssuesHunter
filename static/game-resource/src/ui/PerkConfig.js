import Phaser from "phaser";
import PerkButton from "./PerkButton";

const perkConfigColumnsInRow = 3;
const columnWidth = 280;
const columnHeight = 146;
const perkTilesStartYPosition = 115;
const perkTilesPadding = 15;
const rectangleBorderWidth = 4

export default class PerkConfig {
    constructor(scene, perkKey, perkConfig, index){
        this.scene = scene;
        this.sceneWidth = scene.width;
        this.sceneHeight = scene.height;
        this.perkKey = perkKey;
        this.perkConfig = perkConfig;

        this.index = index;
        this.rowIndex = Math.floor(index / perkConfigColumnsInRow) + 1;
        this.columnIndex = (index % 3) + 1;

        this.activePerk = 'stage_0'

        this.calculateRectangleCenter();
        this.addFrameRectangles();

        this.addTitle();
        this.addPrices();
        this.addSelectButtons();
    }

    calculateRectangleCenter(){
        var xTilesRowPadding = this.sceneWidth - ((perkConfigColumnsInRow - 1) * perkTilesPadding) - (perkConfigColumnsInRow * columnWidth)
        xTilesRowPadding = Math.round(xTilesRowPadding / 2)

        this.rectangleCenter = {
            x: xTilesRowPadding + ((this.columnIndex - 1) * perkTilesPadding) + (((this.columnIndex - 1) + 0.5) * columnWidth),
            y: perkTilesStartYPosition + ((this.rowIndex - 1) * perkTilesPadding) + (((this.rowIndex - 1) + 0.5) * columnHeight)
        }
    }

    addFrameRectangles(){
        this.outterRectangle = this.scene.add.rectangle(
            columnWidth, 
            columnHeight, 
            this.rectangleCenter.x, 
            this.rectangleCenter.y, 
            0x8a948a
        ).setOrigin(0, 0);

        this.outterRectangle.width = columnWidth
        this.outterRectangle.height = columnHeight
        this.outterRectangle.x = this.rectangleCenter.x - (columnWidth / 2)
        this.outterRectangle.y = this.rectangleCenter.y - (columnHeight / 2)

        this.innerRectangle = this.scene.add.rectangle(
            columnWidth - (rectangleBorderWidth * 2), 
            columnHeight - (rectangleBorderWidth * 2), 
            this.rectangleCenter.x, 
            this.rectangleCenter.y, 
            0xacb8ab
        ).setOrigin(0, 0);

        this.innerRectangle.width = columnWidth - (rectangleBorderWidth * 2);
        this.innerRectangle.height = columnHeight - (rectangleBorderWidth * 2);
        this.innerRectangle.x = this.rectangleCenter.x + rectangleBorderWidth - (columnWidth / 2);
        this.innerRectangle.y = this.rectangleCenter.y + rectangleBorderWidth - (columnHeight / 2);
    }

    addTitle(){
        this.titleText = new Phaser.GameObjects.Text(
            this.scene, 
            this.rectangleCenter.x,
            this.rectangleCenter.y - 48, 
            this.perkConfig.title.toUpperCase(),
            {
                font: '18px Arial',
                color: 'white',
                stroke: '#000',
                strokeThickness: 4, 
            }
        ).setOrigin(0.5, 0.5)
        this.scene.add.existing(this.titleText)
    }

    addPrices(){
        this.pricesTexts = []

        Object.keys(this.perkConfig.pointsPrice).forEach((key, i) => {
            const priceText = new Phaser.GameObjects.Text(
                this.scene, 
                this.rectangleCenter.x - 136 + 40 + (i * 64),
                this.rectangleCenter.y - 15, 
                `${this.perkConfig.pointsPrice[key]}P`,
                {
                    font: "17px bold Arial",
                    color: '#5a6d3b',
                    stroke: '#5a6d3b',
                    strokeThickness: 1
                }
            ).setOrigin(0.5, 0.5)
            this.scene.add.existing(priceText)
            this.pricesTexts.push(priceText)
        })
    }

    onSelectPerk(valueKey){
        this.scene.onSelectPerkValue(this.perkKey, valueKey)
    }

    addSelectButtons(){
        this.selectButtons = []

        Object.keys(this.perkConfig.pointsPrice).forEach((key, i) => {
            this.selectButtons.push(new PerkButton(
                this.scene, 
                this.rectangleCenter.x - 136 + 40 + (i * 64),
                this.rectangleCenter.y + 30, 
                this.perkKey,
                key,
                this.perkConfig.optionsLabels[key],
                () => this.onSelectPerk(key)
            ))
        })
    }

    destroy(){
        if(this.titleText){
            this.titleText.destroy();
        }

        if(this.pricesTexts){
            this.pricesTexts.forEach(priceText => priceText.destroy())
        }

        if(this.selectButtons){
            this.selectButtons.forEach(selectText => selectText.destroy())
        }

        if(this.outterRectangle){
            this.outterRectangle.destroy();
        }

        if(this.innerRectangle){
            this.innerRectangle.destroy();
        }
    }

    update(){
        if(this.selectButtons){
            this.selectButtons.forEach(button => button.update())
        }
    }
}