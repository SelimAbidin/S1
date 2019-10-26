import { ITextable } from './interfaces/ITextable';
import { TextStyle, Text as PixiText } from 'pixi.js';
import { Text } from './views/Text';

class StartText {

    private view: any;
    private text: string = '';
    constructor(view: Text) {
        // this.text = text;

    }

    public getView(): any {
        return this.view;
    }

    public getText(): string {
        return this.text;
    }
}


export { StartText }