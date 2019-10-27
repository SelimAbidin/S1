
class Pooler {
    private deadPool: any = {};
    private inUsePool: any = {};

    public add(key: string, object: any) {
        const pool = this.deadPool;
        if (!Array.isArray(pool[key])) {
            pool[key] = [];
        }
        pool[key].push(object);
    }

    public release(key: string, object: any) {

        const pool = this.inUsePool[key];
        if (Array.isArray(pool)) {
            const index = pool.indexOf(object);
            if (index > -1) {

                const deadPool = this.deadPool;
                if (!Array.isArray(deadPool[key])) {
                    deadPool[key] = [];
                }
                deadPool[key].push(pool.splice(index, 1)[0]);
            }
        }

    }

    public getNext(key: string): any | null {
        const pool = this.deadPool;
        if (Array.isArray(pool[key]) && pool[key].length > 0) {

            if (!Array.isArray(this.inUsePool[key])) {
                this.inUsePool[key] = [];
            }

            const value = pool[key].shift();
            this.inUsePool[key].push(value);
            return value;
        }
        return null;
    }

    // DEBUG
    // public update() {
    //     let keys = Object.keys(this.deadPool);
    //     keys.forEach(key => {

    //         let inuse = []
    //         if (Array.isArray(this.inUsePool[key])) inuse = this.inUsePool[key];

    //         console.log(key, inuse.length);

    //         if (this.deadPool[key].length + inuse.length < 200) {
    //             console.log(this.deadPool[key].length + inuse.length, key);

    //         }
    //     })

    //     // let alienInUse = this.inUsePool["alien"] && this.inUsePool["alien"].length
    //     // let alienDead = this.deadPool["alien"] && this.deadPool["alien"].length
    //     // console.log("Alien In Use :", alienInUse, "Alien Dead:", alienDead, "T:", (alienDead + alienInUse));
    //     // let alienInUse = this.inUsePool["bullet"] && this.inUsePool["bullet"].length
    //     // let alienDead = this.deadPool["bullet"] && this.deadPool["bullet"].length
    //     // console.log("Alien In Use :", alienInUse, "Alien Dead:", alienDead, "T:", (alienDead + alienInUse));

    // }
}

export { Pooler };
