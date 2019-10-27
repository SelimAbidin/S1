import { Explotion } from "../Explotion";

enum EffectType {
    EXPLOTION = 'EXPLOTION'
}

class EffectFactory {

    constructor() {

    }

    public createEffectByType(type: EffectType) {

        if (type === EffectType.EXPLOTION) {
            const explotion = new Explotion();
            return explotion;
        }

        return null;
    }

}

export { EffectFactory, EffectType }