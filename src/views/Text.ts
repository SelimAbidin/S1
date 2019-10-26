import { Text as PixiText, TextStyle } from 'pixi.js'
import { IPositionable } from '../interfaces/IPositionable';

class Text implements IPositionable {

    private view: any;
    private needBuild: boolean = true;
    constructor(private text: string) {
        this.build();
    }

    public set visible(b: boolean) {
        this.view.visible = b;
    }

    public setText(text: string) {
        this.text = text;
        this.needBuild = true;
    }

    public setPosition(x: number, y: number): void {
        this.view.x = x;
        this.view.y = y;
    }

    public get width(): number {
        return this.view.width;
    }

    public get height(): number {
        return this.view.height;
    }

    public getView() {

        if (this.needBuild) {
            this.build();
        }

        return this.view;
    }

    private build() {
        const style = new TextStyle({
            fontFamily: 'Arial',
            fontSize: 60,
            fontWeight: 'bold',
            fill: ['#8184b3', '#070140'],
            stroke: '#070140',
            strokeThickness: 5,
            dropShadow: true,
            dropShadowColor: '#ffffff',
            dropShadowBlur: 4,
            dropShadowAngle: 0,
            dropShadowDistance: 0,
        });

        const richText = new PixiText(this.text, style);
        richText.y = 250;
        this.view = richText;
        this.needBuild = false;
    }

    public update() {

        if (this.needBuild) {
            this.build();
        }

    }
}

export { Text }