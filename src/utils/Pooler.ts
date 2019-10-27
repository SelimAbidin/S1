

class Pooler {
    private deadPool: any = {};
    private inUsePool: any = {};

    add(key: string, object: any) {
        let pool = this.deadPool;
        if (!Array.isArray(pool[key])) {
            pool[key] = [];
        }
        pool[key].push(object);
    }

    release(key: string, object: any) {

        const pool = this.inUsePool[key];
        if (Array.isArray(pool)) {
            const index = pool.indexOf(object)
            if (index > -1) {

                let deadPool = this.deadPool;
                if (!Array.isArray(deadPool[key])) {
                    deadPool[key] = [];
                }
                deadPool[key].push(pool.splice(index, 1)[0]);
            }
        }

    }

    getNext(key: string): any | null {
        let pool = this.deadPool;
        if (Array.isArray(pool[key]) && pool[key].length > 0) {

            if (!Array.isArray(this.inUsePool[key])) {
                this.inUsePool[key] = []
            }

            let value = pool[key].shift()
            this.inUsePool[key].push(value);
            return value;
        }
        return null;
    }

    update() {

        // let alienInUse = this.inUsePool["alien"] && this.inUsePool["alien"].length
        // let alienDead = this.deadPool["alien"] && this.deadPool["alien"].length
        // console.log("Alien In Use :", alienInUse, "Alien Dead:", alienDead, "T:", (alienDead + alienInUse));


        // let alienInUse = this.inUsePool["bullet"] && this.inUsePool["bullet"].length
        // let alienDead = this.deadPool["bullet"] && this.deadPool["bullet"].length
        // console.log("Alien In Use :", alienInUse, "Alien Dead:", alienDead, "T:", (alienDead + alienInUse));

    }
}

export { Pooler }