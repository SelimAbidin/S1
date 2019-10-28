import { AnimatedSprite, Texture } from "pixi.js";
import { Explotion } from "../display/effects/Explotion";

enum EffectType {
    EXPLOTION = "EXPLOTION",
}

const frames: Texture[] = [];
function getExlotionFrames(): Texture[] {

    if (frames.length === 0) {
        for (let i = 0; i < 26; i++) {
            frames.push(Texture.from(`Explosion_Sequence_A ${i + 1}.png`));
        }
    }
    return frames;
}

class EffectFactory {

    public createEffectByType(type: EffectType) {

        if (type === EffectType.EXPLOTION) {

            const explosionFrames = getExlotionFrames();
            const anim = new AnimatedSprite(explosionFrames);
            anim.animationSpeed = 0.5;
            anim.anchor.set(0.5);
            anim.zIndex = 100;
            anim.loop = false;
            anim.gotoAndStop(0);
            const explotion = new Explotion(anim);
            return explotion;
        }

        return null;
    }

}

export { EffectFactory, EffectType };
