const LRUcache = (function () {
    class LRUcache {
        constructor(numberCachedValues) {
            this.cache = new Map();
            this.numberCachedValues = numberCachedValues;
        }

        get(key) {
            if (!this.cache.has(key)) {
                return -1;
            }

            let cachedResult = this.cache.get(key);

            this.cache.delete(key);
            this.cache.set(key, cachedResult);

            return cachedResult;
        }

        put(key, value) {
            this.cache.delete(key);
            if (this.cache.size === this.numberCachedValues) {
                this.cache.delete(this.cache.keys().next().value);
                this.cache.set(key, value);
            } else {
                this.cache.set(key, value);
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
// console.log(lru.cache);

// console.log(lru.get('red'));
// console.log(lru.get('white'));
// console.log(lru.get('black'));
// console.log(lru);

// lru.put('grey', 'grey');
// console.log(lru);

// lru.put('red', 'red');
// console.log(lru);

// lru.put('white', 'white');
// console.log(lru);

// lru.put('1', '1');
// console.log(lru);

// lru.put('1', '1');
// console.log(lru);

// lru.put('red', 'red');
// console.log(lru);
