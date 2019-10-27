import { Explotion } from "../display/effects/Explotion";

enum EffectType {
    EXPLOTION = 'EXPLOTION'
}

class EffectFactory {

    public createEffectByType(type: EffectType) {

        if (type === EffectType.EXPLOTION) {
            const explotion = new Explotion();
            return explotion;
        }

        return null;
    }

}

export { EffectFactory, EffectType }