const LRUcache = (function () {
    class LRUcache {
        constructor(numberCachedValues) {
            this.cache = new Map();
            this.numberCachedValues = numberCachedValues;
            this.cacheTime = new Map();
        }

        get(key) {
            if (!this.cache.has(key)) {
                return -1;
            }

            let cachedResult = this.cache.get(key);
            let currentTime = Date.now();

            this.cache.delete(key);
            this.cache.set(key, cachedResult);
            this.cacheTime.delete(key);
            this.cacheTime.set(key, currentTime);

            return cachedResult;
        }

        put(key, value) {
            this.cache.delete(key);
            this.cacheTime.delete(key);
            let currentTime = Date.now();

            if (this.cache.size === this.numberCachedValues) {
                let arrayKeyAndMinTime = [...this.cacheTime.entries()].reduce((prev, curItem) => curItem[1] < prev[1] ? curItem : prev)
                let keyMinTime = arrayKeyAndMinTime[0];

                this.cache.delete(keyMinTime);
                this.cache.set(key, value);
                this.cacheTime.delete(keyMinTime);
                this.cacheTime.set(key, currentTime)
            } else {
                this.cache.set(key, value);
                this.cacheTime.set(key, currentTime);
            }
        }
    }

    return LRUcache;
})();



// Tests

// let lru = new LRUcache(3);
// lru.put('red', 'red');
// lru.put('green', 'green');
// lru.put('white', 'white');
// lru.get('red');
// console.log(lru.cache);

// setTimeout(() => {
//     lru.put('newRed', 'newRed');
//     console.log(lru.cache);
//     console.log(lru.cacheTime);
//     console.log('---------------');
// }, 1000);
// setTimeout(() => {
//     lru.put('green', 'green');
//     console.log(lru.cache);
//     console.log(lru.cacheTime);
//     console.log('---------------');
// }, 2000);
// setTimeout(() => {
//     lru.put('white', 'white');
//     console.log(lru.cache);
//     console.log(lru.cacheTime);
//     console.log('---------------');
// }, 3000);
// setTimeout(() => {
//     lru.put('red', 'red');
//     console.log(lru.cache);
//     console.log(lru.cacheTime);
//     console.log('---------------');
// }, 4000);
// setTimeout(() => {
//     lru.put('1', '1');
//     console.log(lru.cache);
//     console.log(lru.cacheTime);
//     console.log('---------------');
// }, 5000);
// setTimeout(() => {
//     lru.put('white', 'white');
//     console.log(lru.cache);
//     console.log(lru.cacheTime);
//     console.log('---------------');
// }, 6000);


