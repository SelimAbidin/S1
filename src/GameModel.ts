import { utils } from 'pixi.js'
const { EventEmitter } = utils


enum GameModelEvent {
    LIFE_CHANGE = 'onLifeChange',
    GAME_OVER = 'onGameOver',
    SCORE_CHANGE = 'onScoreChange',
    HIGH_SCORE_CHANGE = 'onHighScore',
    REMAIN_TIME_CHANGE = 'onRemainTimeChange'
}

class GameModel extends EventEmitter {

    private life: number = 3;
    private score: number = 0;
    private higestScore: number = 0;
    private remainTime: number = 60 * 2;
    constructor() {
        super();
        this.higestScore = +document.cookie
        this.onTimerTick = this.onTimerTick.bind(this);
    }

    setRemainTime(seconds: number) {
        if (this.remainTime !== seconds) {
            this.remainTime = Math.max(seconds, 0);

            if (this.remainTime === 0) {
                this.emit(GameModelEvent.GAME_OVER, { life: this.getLife() });
            }

            this.emit(GameModelEvent.REMAIN_TIME_CHANGE, { seconds: this.remainTime });
        }
    }

    getRemainTime(): number {
        return this.remainTime;
    }

    getHigestScore(): number {
        return this.higestScore;
    }

    getLife(): number {
        return this.life;
    }

    getScore(): number {
        return this.score;
    }

    onTimerTick() {
        this.setRemainTime(this.getRemainTime() - 1);
    }

    private timerID: any;
    reset() {
        clearInterval(this.timerID);
        this.setLife(3);
        this.setScore(0);
        this.setRemainTime(5 * 2);
        // this.setRemainTime(60 * 2);
        this.timerID = setInterval(this.onTimerTick, 1000);
    }

    addToScore(score: number) {
        this.setScore(this.score + score);
    }

    setScore(score: number) {

        if (this.score !== score) {
            this.score = score;

            if (this.score > this.higestScore) {
                this.higestScore = this.score;
                this.emit(GameModelEvent.HIGH_SCORE_CHANGE, { score: this.higestScore })
            }

            this.emit(GameModelEvent.SCORE_CHANGE, { score: this.score })
        }
    }

    setLife(life: number) {

        if (this.life !== life) {
            this.life = Math.max(life, 0);
            if (this.life === 0) {
                this.setGameOver();
            }
            this.emit(GameModelEvent.LIFE_CHANGE, { life: this.life })
        }
    }

    removeLife() {
        this.setLife(this.life - 1);
    }

    setGameOver() {
        clearInterval(this.timerID);
        this.emit(GameModelEvent.GAME_OVER, { life: this.life })
    }

}

export { GameModel, GameModelEvent }