import Phaser from 'phaser';
import Game from './scenes/Game';
import MainMenu from './scenes/MainMenu';

const config = {
    type: Phaser.WEBGL,
    backgroundColor: '#5a6d3b',
    parent: 'phaser-example',
    scale: {
        mode: Phaser.Scale.WIDTH_CONTROLS_HEIGHT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 940,
        height: 600,
        max: {
            width: 940,
            height: 600,
        },
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
        },
    },
    scene: [MainMenu, Game],
};

const game = new Phaser.Game(config);
