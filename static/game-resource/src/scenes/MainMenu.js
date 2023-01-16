import Phaser from 'phaser';
import { invoke } from '@forge/bridge';
import { RESOLVERS } from '../../../../src/types';
import Button from '../ui/Button';
import PerkConfig from '../ui/PerkConfig';
import MainMenuPointsTexts from '../ui/MainMenuPointsTexts';

import background from  '../assets/sprites/background.png'

export const perksConfig = {
    walls: {
        pointsPrice: {stage_0: 0, stage_1: 1, stage_2: 2, stage_3: 3},
        perkValue: { stage_0: 0, stage_1: 1, stage_2: 2, stage_3: 3 },
        optionsLabels: {stage_0: '0', stage_1: '1', stage_2: '2', stage_3: '3'},
        optionsLabelsXPadding: {stage_0: 15, stage_1: 15, stage_2: 15, stage_3: 15},
        title: 'Walls on map'
    },
    moveSpeed: {
        pointsPrice: {stage_0: 0, stage_1: 1, stage_2: 2, stage_3: 3},
        perkValue: { stage_0: 1, stage_1: 1.1, stage_2: 1.2, stage_3: 1.35 },
        optionsLabels: {stage_0: '+0%', stage_1: '+10%', stage_2: '+20%', stage_3: '+35%'},
        optionsLabelsXPadding: {stage_0: 8, stage_1: 3, stage_2: 3, stage_3: 3},
        title: 'User moves speed'
    },
    rofSpeed: {
        pointsPrice: {stage_0: 0, stage_1: 1, stage_2: 2, stage_3: 3},
        perkValue: { stage_0: 1, stage_1: 1.05, stage_2: 1.1, stage_3: 1.2 },
        optionsLabels: {stage_0: '+0%', stage_1: '+5%', stage_2: '+10%', stage_3: '+20%'},
        optionsLabelsXPadding: {stage_0: 10, stage_1: 10, stage_2: 5, stage_3: 5},
        title: 'Player rate of fire'
    },
    bulletSpeed: {
        pointsPrice: {stage_0: 0, stage_1: 1, stage_2: 2, stage_3: 3},
        perkValue: { stage_0: 1, stage_1: 1.1, stage_2: 1.2, stage_3: 1.3 },
        optionsLabels: {stage_0: '+0%', stage_1: '+10%', stage_2: '+20%', stage_3: '+30%'},
        optionsLabelsXPadding: {stage_0: 10, stage_1: 5, stage_2: 5, stage_3: 5},
        title: 'Player bullets speed'
    },
    enemyBulletSpeed: {
        pointsPrice: {stage_0: 0, stage_1: 1, stage_2: 2, stage_3: 3},
        perkValue: { stage_0: 1, stage_1: 0.95, stage_2: 0.85, stage_3: 0.75 },
        optionsLabels: {stage_0: '-0%', stage_1: '-5%', stage_2: '-15%', stage_3: '-25%'},
        optionsLabelsXPadding: {stage_0: 10, stage_1: 10, stage_2: 5, stage_3: 5},
        title: 'Enemy bullets speed'
    },
    maxHP: {
        pointsPrice: {stage_0: 0, stage_1: 1, stage_2: 2, stage_3: 3},
        perkValue: { stage_0: 100, stage_1: 150, stage_2: 200, stage_3: 300 },
        optionsLabels: {stage_0: '100', stage_1: '150', stage_2: '200', stage_3: '300'},
        optionsLabelsXPadding: {stage_0: 10, stage_1: 10, stage_2: 10, stage_3: 10},
        title: 'Max player HP'
    },
    maxGrenades: {
        pointsPrice: {stage_0: 0, stage_1: 1, stage_2: 2, stage_3: 3},
        perkValue: { stage_0: 3, stage_1: 5, stage_2: 7, stage_3: 10 },
        optionsLabels: {stage_0: '3', stage_1: '5', stage_2: '7', stage_3: '10'},
        optionsLabelsXPadding: {stage_0: 15, stage_1: 15, stage_2: 15, stage_3: 10},
        title: 'Holded grenades'
    },
    maxShields: {
        pointsPrice: {stage_0: 0, stage_1: 1, stage_2: 2, stage_3: 3},
        perkValue: { stage_0: 1, stage_1: 2, stage_2: 3, stage_3: 5 },
        optionsLabels: {stage_0: '1', stage_1: '2', stage_2: '3', stage_3: '5'},
        optionsLabelsXPadding: {stage_0: 15, stage_1: 15, stage_2: 15, stage_3: 15},
        title: 'Holded buildable covers'
    },
    lowerDamage: {
        pointsPrice: {stage_0: 0, stage_1: 1, stage_2: 2, stage_3: 3},
        perkValue: { stage_0: 1, stage_1: 0.95, stage_2: 0.85, stage_3: 0.7 },
        optionsLabels: {stage_0: '-0%', stage_1: '-5%', stage_2: '-15%', stage_3: '-30%'},
        optionsLabelsXPadding: {stage_0: 10, stage_1: 10, stage_2: 5, stage_3: 5},
        title: 'Enemy damage reduction'
    }
}

const perksOrder = [
    'walls', 'moveSpeed', 'rofSpeed', 'bulletSpeed', 'enemyBulletSpeed', 
    'maxHP', 'maxGrenades', 'maxShields', 'lowerDamage'
]

const getDefaultPlayerPerksObject = () => {
    var playerPerksObject = {}

    Object.keys(perksConfig).forEach(key => {
        playerPerksObject[key] = {
            stage: 'stage_0',
            value: perksConfig[key].perkValue.stage_0,
            price: perksConfig[key].pointsPrice.stage_0,
        }
    })

    return playerPerksObject
}

export default class MainMenu extends Phaser.Scene {
    constructor(){
        super({ key: "main_menu" });
    }

    width;
    height;

    playerPoints = 10;
    playerPointsForIssues = 0;
    playerSpentPoints = 0;
    solvedIssues = 0;
    pointsForIssue = 2

    perksPage = 1;
    perksPerPage = 6;
    totalPerksPages = Math.ceil(Object.keys(perksConfig).length / 6);
    perkConfigComponents = {};

    playerPerksConfig = getDefaultPlayerPerksObject()

    userDisplayName = ''

    init (data){
        this.playerPerksConfig = {
            ...this.playerPerksConfig,
            ...data
        }
    }

    async create() {
        this.width = this.cameras.main.width;
        this.height = this.cameras.main.height;

        this.add.image(this.width / 2, this.height / 2, 'background');

        this.onStartLoadingInitData();
        this.loadUserIssues();
    }

    preload(){
        this.load.image('background', background);
    }

    setUserPointsForIssues(issues){
        var doneIssues = 0;

        const timeDifference = 1000 * 60 * 60 * 24 * 30

        issues.forEach(issue => {
            if(issue.fields.status.statusCategory.key == 'done' || issue.fields.status.statusCategory.color == 'green'){
                if(new Date(issue.fields.statuscategorychangedate) >= Date.now() - timeDifference){
                    doneIssues += 1
                }
            }
        })

        this.playerPointsForIssues = doneIssues * this.pointsForIssue;
        this.solvedIssues = doneIssues;
    }

    loadUserIssues(){
        Promise.all([
            invoke(RESOLVERS.GET_USER_ISSUES),
            invoke(RESOLVERS.GET_USER_DATA)
        ]).then(responsesArray => {
            if(responsesArray[0].status == 200){
                this.setUserPointsForIssues(responsesArray[0].data);
            }

            if(responsesArray[1].status == 200){
                this.userDisplayName = responsesArray[1].data.displayName
            }

            this.onLoadingInitDataComplete();
        })
    }

    startGame(){
        this.scene.start('game', { playerPerksConfig: this.playerPerksConfig, userDisplayName: this.userDisplayName });
    }

    loadCompleted() {
        this.addUIElements();
    }

    addUIElements(){
        this.mainMenuPointsTexts = new MainMenuPointsTexts(this)

        this.startButton = new Button(
            this, 
            this.width / 2, 
            this.height - 50, 
            25,
            12,
            'START GAME', 
            {
                font: "22px Arial",
                stroke: '#000000',
                strokeThickness: 6,
            },
            () => this.startGame()
        );
        this.add.existing(this.startButton);

        this.gameNameText = this.make.text({
            x: 34,
            y: 20,
            text: 'IssuesHunter',
            style: {
                font: '60px Arial',
                color: '#5a6d3b',
                stroke: '#000',
                strokeThickness: 10, 
            },
        });
        this.gameNameText.setOrigin(0, 0);

        this.addPerkConfigComponents();

        this.updatePageButtons();
    }

    addPerkConfigComponents(){
        Object.keys(this.perkConfigComponents).forEach(key => {
            this.perkConfigComponents[key].destroy();
        })

        this.perkConfigComponents = {};

        perksOrder
        .slice((this.perksPage - 1) * this.perksPerPage, this.perksPage * this.perksPerPage)
        .forEach((perkKey, i) => {
            const perkConfigComponent = new PerkConfig(this, perkKey, perksConfig[perkKey], i);
            this.perkConfigComponents[perkKey] = perkConfigComponent
        });
    }
    
    changePerksPage(page){
        this.perksPage = page;
        this.addPerkConfigComponents();
        this.updatePageButtons();
    }

    onNextPerksPage(){
        this.changePerksPage(this.perksPage + 1)
    }

    onPreviousPerksPage(){
        this.changePerksPage(this.perksPage - 1)
    }

    updatePageButtons(){
        if(this.prevPageButton){
            this.prevPageButton.destroy();
            this.prevPageButton = null;
        }

        if(this.nextPageButton){
            this.nextPageButton.destroy();
            this.nextPageButton = null;
        }

        if(this.perksPage > 1){
            this.prevPageButton = new Button(
                this, 
                34, 
                this.height - 140, 
                14,
                10,
                'PREV PAGE', 
                {
                    font: "16px Arial",
                    stroke: '#000000',
                    strokeThickness: 4,
                },
                () => this.onPreviousPerksPage(),
                'info'
            ).setOrigin(0, 0.5);
            this.add.existing(this.prevPageButton)
        }

        if(this.perksPage < this.totalPerksPages){
            this.nextPageButton = new Button(
                this, 
                this.width - 34, 
                this.height - 140, 
                14,
                10,
                'NEXT PAGE', 
                {
                    font: "16px Arial",
                    stroke: '#000000',
                    strokeThickness: 4,
                },
                () => this.onNextPerksPage(),
                'info'
            ).setOrigin(1, 0.5);
            this.add.existing(this.nextPageButton)
        }
    }

    onStartLoadingInitData(){
        this.loadingText = this.make.text({
            x: this.width / 2,
            y: this.height / 2,
            text: 'Loading...'.toUpperCase(),
            style: {
                font: '20px',
                strokeThickness: 2,
                // strokeColor: '#000000'
            },
        });
        this.loadingText.setOrigin(0.5, 0.5);

        this.loadingGameNameText = this.make.text({
            x: this.width / 2,
            y: this.height / 2 - 80,
            text: 'IssuesHunter',
            style: {
                font: '60px Arial',
                color: '#5a6d3b',
                stroke: '#000',
                strokeThickness: 10, 
            },
        });
        this.loadingGameNameText.setOrigin(0.5, 0.5);
    }

    onLoadingInitDataComplete(){
        this.loadingText.destroy();
        this.loadingGameNameText.destroy();

        this.addUIElements()
    }

    onSelectPerkValue(perkKey, valueKey){
        if(perksConfig[perkKey].pointsPrice[valueKey] <= (this.playerPoints + this.playerPointsForIssues) - this.playerSpentPoints){
            this.playerPerksConfig[perkKey].stage = valueKey;
            this.playerPerksConfig[perkKey].value = perksConfig[perkKey].perkValue[valueKey];
            this.playerPerksConfig[perkKey].price = perksConfig[perkKey].pointsPrice[valueKey];

            this.recalculatePlayerSpentPoints();
        }
    }

    recalculatePlayerSpentPoints(){
        var spentPoints = 0;
        Object.keys(this.playerPerksConfig).forEach(key => {
            spentPoints += this.playerPerksConfig[key].price;
        })

        this.playerSpentPoints = spentPoints
    }

    update() {
        Object.keys(this.perkConfigComponents).forEach(key => {
            this.perkConfigComponents[key].update();
        })
        
        if(this.mainMenuPointsTexts){
            this.mainMenuPointsTexts.update();
        }
    }
}