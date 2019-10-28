import { Container, Rectangle, Sprite, Text, TextStyle, Texture } from "pixi.js";
import { GameModel, GameModelEvent } from "../GameModel";

class GameHUD {

    public screenRect: Rectangle;
    public view: Container;
    public lifeSprites: Sprite[] = [];
    private scoreTextfield: Text;
    private highScoreTextfield: Text;
    private leftTimeTextfield: Text;
    constructor(private readonly model: GameModel, rect: Rectangle) {
        this.screenRect = rect;

        const margin = {
            bottom: 10,
            left: 10,
            right: 10,
            top: 10,
        };

        const container = new Container();
        for (let i = 0; i < 3; i++) {
            const texture = Texture.from("heart");
            const heart = new Sprite(texture);
            heart.zIndex = 10;
            heart.y = margin.top + (i * heart.height);
            heart.x = margin.left;
            heart.visible = true;
            this.lifeSprites.push(heart);
            container.addChild(heart);
        }

        container.zIndex = 100;

        const scoreStyle = new TextStyle({
            align: "right",
            fill: "#ffffff",
            fontFamily: "Arial",
            fontSize: 30,
            stroke: "#4a1850",
        });

        const scoreHead = new TextStyle({
            align: "right",
            fill: "#ffff00",
            fontFamily: "Arial",
            fontSize: 13,
            fontWeight: "bold",
            stroke: "#4a1850",
        });

        const scoreTitle = new Text("SCORE", scoreHead);
        const score = new Text("00000", scoreStyle);
        scoreTitle.x = score.x = rect.width - (score.width + margin.right);
        scoreTitle.y = margin.top;
        score.y = scoreTitle.height + margin.top;
        container.addChild(score);
        container.addChild(scoreTitle);

        const highScoreTitle = new Text("HIGH SCORE", scoreHead);
        const highScore = new Text("00000", scoreStyle);
        highScoreTitle.x = highScore.x = rect.width - (highScore.width + margin.right);
        highScoreTitle.y = score.y + score.height + 10;
        highScore.y = highScoreTitle.height + highScoreTitle.y;
        this.highScoreTextfield = highScore;
        this.setHighestScore(model.getHigestScore());
        container.addChild(highScore);
        container.addChild(highScoreTitle);

        const leftTime = new Text("02:00", scoreStyle);
        // leftTime.anchor.set(1)
        leftTime.y = rect.height - (margin.bottom + leftTime.height);
        leftTime.x = rect.width - (margin.right + leftTime.width);
        this.leftTimeTextfield = leftTime;

        const remainTitle = new Text("Time Remaining", Object.assign({}, scoreHead, { align: "left", wordWrap: true }));
        remainTitle.y = rect.height - (margin.bottom + leftTime.height + remainTitle.height);
        remainTitle.x = leftTime.x; // rect.width - (margin.right + remainTitle.width);

        container.addChild(remainTitle);
        container.addChild(leftTime);

        this.scoreTextfield = score;
        this.setScore(model.getScore());
        this.setLife(model.getLife());
        this.setRemainTime(model.getRemainTime());

        this.model.on(GameModelEvent.LIFE_CHANGE, this.onLifeChange.bind(this));
        this.model.on(GameModelEvent.SCORE_CHANGE, this.onScoreChange.bind(this));
        this.model.on(GameModelEvent.HIGH_SCORE_CHANGE, this.onHighScoreChange.bind(this));
        this.model.on(GameModelEvent.REMAIN_TIME_CHANGE, this.onRemainTimeChange.bind(this));
        this.view = container;
    }

    public onRemainTimeChange({ seconds }: { seconds: number }) {
        this.setRemainTime(seconds);
    }

    public setRemainTime(seconds: number) {
        const minutes = Math.floor(seconds / 60).toString();
        const leftSeconds = (seconds % 60).toString();
        this.leftTimeTextfield.text = minutes.padStart(2, "0") + ":" + leftSeconds.padStart(2, "0");
    }

    public onHighScoreChange(event: { score: number }) {
        this.setHighestScore(event.score);
    }

    public setHighestScore(score: number) {
        this.highScoreTextfield.text = score.toString().padStart(5, "0");
    }

    public onScoreChange(event: { score: number }) {
        this.setScore(event.score);
    }

    public setScore(score: number) {
        this.scoreTextfield.text = score.toString().padStart(5, "0");
    }

    public setLife(life: number) {
        const lifeSprites: Sprite[] = this.lifeSprites;
        for (let i = 0; i < lifeSprites.length; i++) {
            lifeSprites[i].visible = life > i;
        }
    }

    public onLifeChange(event: { life: number }) {
        this.setLife(event.life);
    }

}

export { GameHUD };
