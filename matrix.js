/**
 * Class filled with methods for combinatorics calculation.
 */
const Combinatorics = {
    /**
     * Recursively calculate n!
     * @param {int} n 
     * @param {int} res 
     * @returns n!
     */
    factorial: function (n,res = 1) {
        if (n == 1) {
            return res;
        }
        else {
            return this.factorial(n-1,res*n);
        }
    },
    /**
     * 
     * @param {int} universe m
     * @param {int} cardinality n
     */
    binomial_coefficient: function (universe,cardinality) {     //n = cardinality | m = universe
        return this.factorial(universe)/(this.factorial(cardinality)*this.factorial(universe-cardinality));
    },

    /**
     * Gets the Elements of size n within a given universe.
     * @param {int} universe 
     * @param {int} card 
     * @returns Powerset in Binary Representation.
     */
    binary_representation: function (universe,card) {
        let res = [];
        let count = 0;
        let max = parseInt(''.padStart(card,'1').padEnd(universe,'0'),2);   //Get value that starts with k 1s.
        for (let a = 2**card-1; a <= max; a++) {   
            let option = a.toString(2).padStart(universe,'0');
            let check = Array.from(option.match(/1/g)).length; //Does this modify the og string?
            if (check === card) {
                res.push(option);
            }
            count++;
        }
        return res;
    },

    /**
     * Returns elements from array that are 1 (True) in binary representation.
     * @param {array} array 
     * @param {string} bin 
     * @returns Array
     */
    picker: function (array, bin) {
        return array.filter((item, index) => bin[index] === '1');
    },

    /**
     * Returns all subsets of a given cardinality.
     * @param {array} superset 
     * @param {int} cardinality 
     * @returns Array
     */
    subsets: function (superset,cardinality) {
        let first = this.binary_representation(superset.length,cardinality);
        return first.map(z => this.picker(superset,z));
    }
}

/**
 * Series of methods useful for manipulating and dealing with arrays.
 */
const ArrayMethods = {
    /**
     * Pushes element into array provided it is not already present. (Prevents duplication);
     * @param {any} element 
     * @param {array} array 
     */
    conditionalPush: function (element,array) {
        array.indexOf(element) == -1? array.push(element) : array;
        return array;
    },
    /**
     * Checks if two arrays are the same.
     * @param {array} array1 
     * @param {array} array2 
     * @returns boolean
     */
    sameArray: function (array1,array2) {
        if (array1.length !== array2.length) {
            return false;
        }
        else {
            let s1 = array1.sort((a,b) => a-b);
            let s2 = array2.sort((a,b) => a-b);
            return s1.join('|') == s2.join('|');
        }
    },
    /**
     * Returns an indexed rotation of an input array. Optionally concatenate.
     * @param {array} array 
     * @param {int} index 
     * @param {boolean} concat 
     * @returns array || string
     */
    singleRotate: function (array,index,concat = false) {
        let res = [...array.slice(index),...array.slice(0,index)];
        return concat? res.join('|') : res;
    },

/**
 * Returns all rotations of a given array. Optionally concatenate subarrays.
 * @param {array} array 
 * @param {boolean} concat 
 * @returns 2d array || 1d array ['str'];
 */
    rotations: function (array,concat = false) {
    let res = [];
    for (let a = 0; a < array.length; a++) {
        res.push(ArrayMethods.singleRotate(array,a,concat));
    }
    return res;
},

/**
 * Checks the two arrays to determine if one is an ordered rotation of the other. Can return the rotation index or a boolean.
 * @param {array} array1 
 * @param {array} array2 
 * @param {boolean} showIndex 
 * @returns int || boolean
 */
    isRotation: function (array1,array2,showIndex = false) {
        let opts = ArrayMethods.rotations(array2,true);
        let result = opts.indexOf(ArrayMethods.singleRotate(array1,0,true));
        return showIndex? result : result !== -1;
    },
    /**
     * Iterative algorithm for finding all indexes of a given element.
     * @param {array} array 
     * @param {any} element 
     * @returns Indexes
     */
    array_find: function (array,element) {  //O(n)
        let res = [];
        for (let a = 0; a < array.length; a++) {
            if (array[a] == element) {
                res.push(a);
            }
        }
        return res;
    },
    /**
     * Returns the all indexes of elements in the input array.
     * @param {array} array 
     * @param  {...any} elements 
     * @returns Array
     */
    get_many: function (array,...elements) {
        let res = [];
        for (let a = 0; a < array.length; a++) {
            for (let b = 0; b < elements.length; b++) {
                if (array[a] == elements[b]) {
                    res.push(a);
                }
            }
        }
        return res;
    },
    /**
     * Concatenates an array, if array is 2d, concatenates each subarray.
     * @param {array} array 
     * @returns 1d array
     */
    array_concat: function (array) {
        if (typeof array[0] === 'object') {
            return array.map(x => x.join('|')); //Use the pipe to prevent confusion with decimal points.
        }
        else {
            return array.join('|');
        }
    },
    /**
     * Creates an array of size (elements) with pseudo-random numbers between min-max (inclusive).
     * @param {int} elements 
     * @param {int} min 
     * @param {int} max 
     * @returns array
     */
    random_array: function (elements,min,max) {
        let res = [];
        for (let a = 0; a < elements; a++) {
        res.push(Math.floor(Math.random()*(max-min+1))+min);
        }
        return res;
    },
    /**
     * Reverses an input array.
     * @param {array} array 
     * @returns reversed array
     */
    reverse: function (array) {
        return array.reverse();
    },
    /**
     * Search a 2d array for a subarray. Returns indexes.
     * @param {array} query 
     * @param {array} array 
     * @returns Indexes
     */
    search_subarrays: function (query,array) {
        let conc = ArrayMethods.array_concat(array);
        return ArrayMethods.array_find(conc,ArrayMethods.array_concat(query));
    },

    /**
     * Returns either the unique subarrays or the number of instances of each unique subarray. 
     * @param {array} array 
     * @param {boolean} ordered true: [a,b] != [b,a] false: [a,b] == [b,a]; 
     * @param {boolean} return_count Output shows unique elements and their count.
     * @returns Unique Subs || Counts.
     */
    unique_subarray: function (array,ordered = false,return_count = false) { //O(n * log(m))
        let step1 = ordered? array.map(sub => sub.join('|')) : array.map(sub => sub.sort((a,b) => a-b).join('|'));
        let elim = Array.from(new Set(step1));
        let inds = elim.map(x => step1.indexOf(x));
        if (return_count == false) {
            return inds.map(index => array[index]);
        }
        else {
            return inds.map(index => [array[index],this.get_many(step1,step1[index]).length]);
        }
    }
}

/**
 * Equivalent to the Python print operation, since I am lazy.
 * @param {function} operation 
 */
const print = (operation) => {
    console.log(operation);
}


const findem = (string,check) => {
    let find = `[${check}]`;
    let regex = new RegExp(find,'ig');
    return string.match(regex).length;
}

const words = (string) => {
    return findem(string.trim(),' ')+1;
}

const sentences = (string) => {
    return findem(string,'.?!');
}

const factors = (n) => {
    let res = [];
    let test = 1;
    while (test <= n/test) {
        if (n%test == 0) {
            res.push(test,n/test);
        }
        test++;
    }
    return Array.from(new Set(res.sort((a,b) => a-b)));
}

/**
 * Constructor of the MySet class. Contains methods for set theoretical computation.
 * @param {int} modulus 
 * @param  {...any} elements 
 */
function MySet(modulus,...elements) {
    this.modulo = (value,modulus) => { //(2 operations per call);
        if (value >= 0) {
            return value%modulus;
        }
        else {
            return (value%modulus)+modulus;
        }
    }
    this.universe = modulus,
    this.set = Array.from(new Set(elements.map(x => this.modulo(x,this.universe)))).sort((a,b) => a-b), //3 operations
    this.interval_class = (value,modulus = this.universe) => {
        let opts = [this.modulo(value,modulus),this.modulo(modulus-value,modulus)];
            return Math.min(...opts);
        },
    /**
    * Returns the Adjacency Interval Series, or the intervals between consecutive elements in a given modular universe.
    * @param {array} array 
    * @param {int} modulus 
    * @returns array. 
    */
    this.ais = (array = this.set,modulus = this.universe) => {  //O(n) (Linear)
        let res = [];
        for (let a = 1; a < array.length; a++) {
            res.push(this.modulo(array[a]-array[a-1],modulus));
            }
        return res;
        },
    /**
     * 
     * @param {int} index 
     * @returns this.set -> t(n) mod this.universe.
     */
    this.transpose = function (array = this.set, modulus = this.universe, index = 0) {
        let i = parseInt(index,10);
        return array.map(x => this.modulo(x+i,modulus)); //O(n);
    },
    /**
     * 
     * @param {int} index 
     * @returns this.set -> t(n)I mod this.universe. 
     */
    this.invert = function (array = this.set,modulus = this.universe,index = 0) {
        let i = parseInt(index,10);
        return array.map(x => this.modulo(i-x,modulus)); //O(n);
        },
    /**
    * Generates the powerset of an input using bitwise operands. Faster than array manipulation method. Useful for large sets. 
    * @param {array} array 
    * @returns powerset
    */
    this.literal_subsets = (cardinality = null,array = this.set) => {   // O(2^n) //4+(2^n) operations. 
        let result = [];
        if (cardinality === null) {
            for (let a = 1; a <= array.length; a++) {
                result.push(...Combinatorics.subsets(array,a));
            }
        }
        else {
            result = Combinatorics.subsets(array,cardinality);
        }
        return result;
    },
    /**
     * There's a recursion depth issue here.
     * @param {array} array 
     * @param {int} mod 
     * @returns Literal Subsets in Prime Form.
     */
    this.abstract_subsets = (array = this.set, mod = this.universe) => {    //2 additional operations.
        let start = this.literal_subsets(null,array).filter(x => x.length > 2);
        return start.map(y => this.prime_form(y,mod)).sort((a,b) => a.length < b.length);
    },
    /**
     * Normal order function using the Straus-Rahn Algorithm. Iterative implementation.
     * @param {array} array this.set
     * @param {*} mod this.universe
     * @returns Normal Order
     */
    this.normal_order = (array = this.set,mod = this.universe) => { // Total = O(n^2)
        let index = array.length-1; 
        let rotations = [...ArrayMethods.rotations(array.sort((a,b) => a-b))]; //n ops
        while (index > 0) {     //n
            let curr = [];
            for (let a = 0; a < rotations.length; a++) {    //n
                curr.push(this.modulo(rotations[a][index]-rotations[a][0],mod)); //1
            }
            let small = ArrayMethods.array_find(curr,Math.min(...curr)); //2 opers  Break upon finding single winner. Or If symmetrical return index 0.
            if (small.length == 1 || index == 0) {
                return rotations[small[0]];
            }
            else {      //Remove rotations not in small;
                rotations = small.map(x => rotations[x]); //n
            }
            index--;//1
        }
        return rotations[0];    //if rotations.length > 1 all are acceptabe Normal Orders.
    }
    /**
    * Returns the Prime Form of a set (Straus-Rahn)
    * @param {array} array 
    * @param {int} mod 
    * @returns Prime Form
    */
    this.prime_form = (array = this.set,mod = this.universe) => { // O(n);
        let norm = this.normal_order(array,mod);
        let options = [norm,this.normal_order(this.invert(norm))];  //1
        let intervals = options.map(x => this.ais(x,mod)); //n
        let round = 0;
        while (round < intervals[0].length) { //n-1;
            if (intervals[0][round] < intervals[1][round]) {
                return options[0].map(x => this.modulo(x-options[0][0],mod));
            }
            else if (intervals[0][round] > intervals[1][round]) {
                return options[1].map(x => this.modulo(x-options[1][0],mod));
            }
            else if (round == array.length-2) {
                return options[0].map(x => this.modulo(x-options[0][0],mod));
            }
            else {
                round++;
            }
        }
    },
    /**
     * Generates the ICV of an input set. The sum of all intervals between constituent members. Essentially a summary of invariant tones under transposition. Holds true for all members of set class.
     * @param {array} array 
     * @param {int} mod 
     * @returns Interval Class Vector 
     */
    this.interval_class_vector = (array = this.set,mod = this.universe) => {    //n^2)/2
        let collect = [];
        for (let a = 0; a < array.length; a++) {
            for (let b = a+1; b < array.length; b++) {
                collect.push(this.modulo(array[b]-array[a],mod));//2
            }
        }
        let vector = [];
        for (let a = 1; a <= Math.floor(mod/2); a++) {
            if (a == Math.ceil(mod/2)) {
                vector.push(ArrayMethods.array_find(collect,a).length);
            }
            else {
                vector.push(ArrayMethods.array_find(collect,a).length+ArrayMethods.array_find(collect,mod-a).length)
            }
        }
        return vector;
    },
    /**
     * Returns the IV of an input set. This is a summary of the number of invariant tones under inversion. As such it is unique to each T or I in a set class.
     * @param {array} array 
     * @param {int} mod 
     * @returns Index Vector
     */
    this.index_vector = (array = this.set,mod = this.universe) => { // n^2+n+2
        let collect = [];
        for (let a = 0; a < array.length; a++) {
            for (let b = 0; b < array.length; b++) {
                collect.push(this.modulo(array[b]+array[a],mod));
            }
        }
        let vector = [];
        for (let a = 0; a < mod; a++) {
            vector.push(ArrayMethods.array_find(collect,a).length);
        }
        return vector;
    }
    /**
     * Returns all transpositions and inversions of a given set as an object literal.
     * @param {array} array 
     * @param {int} modulus 
     * @returns Set Class
     */
    this.set_class = (array = this.set,modulus = this.universe) => {
        let result = {};
        for (let a = 0; a < modulus; a++) {
            result['T'+a] = this.normal_order(array.map(x => this.modulo(x+a,modulus)),modulus);
            result['I'+a] = this.normal_order(array.map(y => this.modulo(a-y,modulus)),modulus);
        }
        return result;
    },
    /**
     * 
     * @param {array} array 
     * @param {int} modulus 
     * @returns Axes of Symmetry
     */
    this.symmetry = (array = this.set,modulus = this.universe) => {
        let res = [];
        let test = array.sort((r,s) => r-s).reduce((f,k) => f+'|'+k);
        for (let a = 0; a < modulus; a++) {
            let opt = this.invert(array,modulus,a).sort((i,j) => i-j).reduce((l,m) => l+'|'+m);
            opt == test? res.push([a/2,(a/2)+(modulus/2)]): null;
        }
        return res;
    },    

    /**
     * Determines if two input arrays have any meaningful PC relationship. It the sets are the same cardinality, test
     *  for T/I and Z relation. If the two sets are not the same cardinality, tests for literal and abstract (Prime Form) inclusionary relationship.
     * @param {array} array1 
     * @param {array} array2 
     * @param {int} modulus 
     * @returns Relationship;
     */
    this.compare_set = (array1, array2 = this.set,modulus = this.universe,showLevels = false) => {
        let no1 = this.normal_order(array1,modulus); 
        let no2 = this.normal_order(); 
        if (array1.length == array2.length) {   //Transposition or Inversional Equivalence.
            let sc = this.set_class(no2,modulus);
            let res = null;
            let indexes = []
            for (value in sc) { 
                if (ArrayMethods.array_concat(sc[value]) == ArrayMethods.array_concat(no1)) {
                    res = value;    //Right now this will only return the last indexes that worked.
                    indexes.push(value);
                }
            }
            if (res === null) { //Z relation
                if (ArrayMethods.array_concat(this.interval_class_vector(array2,modulus)) == ArrayMethods.array_concat(this.interval_class_vector(array1,modulus)) == true) {
                    res = `[${array1}] and [${array2}] are Z related.`;
                }
                else {
                    res = 'No Relationship.';
                }
            }
            return showLevels? indexes: res;
        }
        else {      //Not same cardinality. Maybe Move this up?
            let sizes = [no1,no2].sort((a,b) => a.length - b.length); //sizes[0] = short sizes[1] = long;
            let subs = {
                'Literal': this.literal_subsets(null,sizes[1]).map(x => this.normal_order(x,modulus)),
                'Abstract': this.abstract_subsets(sizes[1],modulus)
                };
            let checkLits = ArrayMethods.search_subarrays(sizes[0],subs['Literal']).length;
            let checkAbs = ArrayMethods.search_subarrays(this.prime_form(sizes[0]),subs['Abstract']).length;
            if (checkLits > 0) {
                return `[${sizes[0]}] is a literal subset of [${sizes[1]}].`;
            }
            else if (checkLits == 0 && checkAbs > 0) {
                return `[${sizes[0]}] is an abstract subset of [${sizes[1]}]. Contained ${checkAbs} times.`;
            }
            else {
                return 'No inclusionary relationship.'
            }
        }
    }
}

/**
 * Methods used for Scale Theoretical calculations. Dependent upon the updated ArrayMethods class.
 */
const ScaleTheory = {
    /**
     * Returns a value mod n.
     * @param {int} value 
     * @param {int} modulus 
     * @returns value mod modulus; 
     */
    modulo: function (value,modulus) {
        return value >=0? value%modulus : (value%modulus)+modulus; 
    },
    /**
     * Gets adjacency interval series of an input set. 
     * @param {array} array 
     * @param {int} modulus 
     * @param {boolean} octave
     * @returns array -> AIS. 
     */
    ais: function (array,modulus,octave = false) {
        let res = [];
        octave? array.push(array[0]) : undefined;   //Double octave depending on bool.
        for (let a = 1; a < array.length; a++) {
            res.push(ScaleTheory.modulo(array[a]-array[a-1],modulus));
        }
        return res;
    },
    /**
     * Generates a well formed collection from various parameters.
     * @param {int} start Integer that collection starts on.
     * @param {int} interval Interval to be applied recursively.
     * @param {int} cardinality Limit to number of elements.
     * @param {int} universe Modulus.
     * @returns Array -> Well Formed Collection (Numerical, not scale order.)
     */
    generate: function (start = 0, interval,cardinality,universe = 12) {
        let result = [];
        for (let a = 0; a < cardinality; a++) {
            result.push((start+(interval*a)));
        }
        return result.map(element => element%universe).sort((a,b) => a-b);  //Sorted numerically.
    },
    /**
     * Determines if an input set is or is not well-formed. Can produce the generator.
     * @param {array} array 
     * @param {int} universe 
     * @param {boolean} returnGenerator
     * @returns Boolean || Generator
     */
    isWellFormed: function (array,universe,returnGenerator = false) {
        array = array.sort((a,b) => a-b);    //Put in ascending order
        let ints = ScaleTheory.ais(array,universe,true);
        let generator = 1; 
        let allWF = [];
        while (generator <= universe/2) {   //Only need to test half of the universe.
            let wf = [];
            for (let a = 0; a < array.length-1; a++) {
                wf.push(ScaleTheory.modulo(a*generator,universe));
            }
            wf.sort((a,b) => a-b);
            allWF.push(ScaleTheory.ais(wf,universe,true));
            generator++;
        } 
        let temp = allWF.map(elem => ArrayMethods.isRotation(elem,ints));   //Check if any subarrays are a rotation of the original ais.
        return returnGenerator? temp.indexOf(true)+1 : temp.indexOf(true) !== -1; 
    },
    /**
     * Determines if an input set is or is not degenerate. (That is that its generating interval is a factor of the universe)
     * @param {array} array 
     * @param {int} universe 
     * @returns boolean
     */
    degenerate: function (array,universe) {
        let step1 = ScaleTheory.isWellFormed(array,universe)? ScaleTheory.isWellFormed(array,universe,true) : false;
        if (typeof(step1) == 'number') {
            return factors(universe).indexOf(step1) !== -1;
        }
        else {
            return step1;
        } 
    },
    /**
     * Determines if an input array has the property of cardinality equals variety.
     * @param {array} array 
     * @param {int} universe 
     * @returns boolean
     */
    cv: function (array,universe) {
        return ScaleTheory.degenerate(array,universe)? false: array.length <= Math.floor(universe/2)+1;
    },

    /**
     * Generates the AIS or indexes of true values of a maximally even distribution of size n within a given universe.
     * @param {int} sub 
     * @param {int} universe 
     * @param {boolean} setOut 
     * @returns Array [Indexes of True values] || Array [AIS];
     */
    maxEvenInts: function (sub,universe,setOut = true) {
        let bin = [0];
        let temp = [];
        for (let a = 1; a < universe+1; a++) {
            temp.push(Math.floor((a*sub)/universe));
        }
        for (let b = 1; b < temp.length; b++) {
            temp[b] != temp[b-1]? bin.push(1) : bin.push(0);
        }
        return setOut? ArrayMethods.array_find(bin,1).map(x => x-1) :ScaleTheory.ais(ArrayMethods.array_find(bin,1),universe,true);
    },

    /**
     * Can either test if an array is maximally even or generate a maximally even set the size of the input array starting on 0.
     * @param {array} array 
     * @param {int} universe 
     * @param {boolean} generate 
     * @returns boolean || array
     */
    maximallyEven: function (array,universe,generate = false) {
        let bin = ScaleTheory.maxEvenInts(array.length,universe,generate);  //Variable output depending on next steps.
        if (generate == false) {    //Test input for ME property. -> Boolean
            return ArrayMethods.isRotation(ScaleTheory.ais(array,universe,true),bin);
        }
        else {  //Generate options -> Array.
            let result = ArrayMethods.rotations(bin);
            result.map(x => {
                let first = x[0];   
                for (let i = 0; i < x.length; i++) {
                    x[i] = ScaleTheory.modulo(x[i]-first,universe); //Transpose each rotation to zero.
                }
                x.sort((a,b) => a-b);
            })
            return ArrayMethods.unique_subarray(result);    //Eliminate duplicates if present.
        }
    },
    myhillsProperty: function (array,universe) { //Still not 100% sure how this is different from CV...
        return ScaleTheory.maximallyEven(array,universe)? ArrayFrom(new Set(ScaleTheory.ais(array,modulus,true))).length == 2: false;
    }
}


/**
 * Set of Methods useful for working with tone-rows and matrixes.
 */
const Serialism = {
    /**
     * Returns a value mod n.
     * @param {int} value 
     * @param {int} modulus 
     * @returns value mod modulus; 
     */
    modulo: function (value,modulus) {
        return value >= 0? value%modulus : (value%modulus)+modulus; 
    },
    toPitch: function (array,universe) {
        if (universe == 12) {
            pitches = ['C','C♯/D♭','D','D♯/E♭','E','F','F♯/G♭','G','G♯/A♭','A','A♯/B♭','B'];
            return array.map(x => pitches[x]);
        }
        else {
            console.error(`Pitch class conversion not available in modulo ${universe}.`);
        }
    },
    /**
     * Returns even partitions of an input array of size n. Omits arbitrary (Dependant on factors)
     * @param {array} array 
     * @returns 2d Array
     */
    partition: function (array) {
        let facts = factors(array.length);
        let result = [];
        for (let a = 0; a < facts.length; a++) {
            let temp = [];
            let len = array.length/facts[a];
            for (let b = 0; b < array.length; b+=len) {
                temp.push(array.slice(b,b+len));
            }
            result.push(temp);
        }
        return result.slice(1,result.length-1);
    },
    /**
     * Function for dividing a 2d matrix into bubbles of size n.
     * @param {array} array 
     * @param {int} size factor of array.length
     * @returns bubbles
     */
    matrixBubble: function (array,size) {
        let n = array.length;
        let final = [];
        for (let a = 0; a < n; a+=size) {
            for (let b = 0; b < n; b+=size) {
                let submatrix = [];
                for (let i = a; i < a+size; i++) {
                    for (let j = b; j < b+size; j++) {
                        submatrix.push(array[i][j])
                    }
                }
                final.push(submatrix);
            }
        }
        return final;
    },
    /**
     * Create a matrix of input array. 
     * @param {array} row 
     * @param {int} universe 
     * @param {boolean} pitches Make output pitch names?
     * @returns n*n matrix
     */
    buildMatrix: function (row,universe = 12,pitches = false,labels = false) {
        let result = [[...row]];
        for (let a = 1; a < row.length; a++) {
            let tLevel = Serialism.modulo(row[0]-row[a],universe);
            //result.push(tLevel);
            result.push(row.map(elem => Serialism.modulo(elem+tLevel,universe)));
        }
        result = pitches? result.map(x => Serialism.toPitch(x,universe)) : result;  //Is this the issue?
        if (labels == true) {
            result.forEach(x => {
                x.unshift(`P${x[0]}`);
                x.push(`R${x[0]}`)
            })
            result.unshift(result[0].map(z => `I${z}`));
            result.push(result[0].map(z => `R${z}`));
            result[0][0] = ' ';
            result[0][result[0].length-1] = ' ';
            result[result.length-1][0] = ' ';
            result[result.length-1][result.length-1] = ' ';
        }        
        return result;
    },
    /**
     * Returns a single row-form of a tone row.
     * @param {array} row
     * @param {string} form 
     * @param {int} universe = 12 
     * @returns Row Form.
     */
    singleRowForm: function (row,form,universe = 12,pitches = false) {
        let regex = [...form.match(/[a-z]+/ig),parseInt(form.match(/[0-9]+/g))];
        let offset = universe-row[0]; //Move index 0 to 0.
        let store; 
        if (regex[0] === 'P' || regex[0] === 'R') {
            let temp = row.map(elem => Serialism.modulo(elem+offset+regex[1],universe));
            store = regex[0] === 'P'? temp : temp.reverse();
        }
        else if (regex[0] === 'I' || regex[0] === 'RI') {
            let temp = row.map(elem => Serialism.modulo((regex[1]-elem)+row[0],universe));
            store = regex[0] === 'I'? temp : temp.reverse();
        }
        return pitches? Serialism.toPitch(store,universe) : store;
    },
    /**
     * Takes a tonerow in a given universe and determines non-trivial derivation levels.
     * @param {array} row 
     * @param {int} universe 
     * @param {boolean} showLevels 
     * @returns 2d array.
     */
    derivation: function (row,universe = 12) {
        let opts = Serialism.partition(row);
        let data = {};
        opts.forEach(part => {
            let current = data[`${universe/part.length}`] = {'set' : [],'levels' : {}}; 
            for (let a = 1; a < part.length; a++) {
                let setRep = new MySet(universe,...part[a-1]);
                current['set'].push(setRep.prime_form());
                current['levels'][`${a}-${a+1}`] = setRep.compare_set(part[a]);
            }
           current['set'] = ArrayMethods.unique_subarray(current['set']);
           if (current['set'].length !== 1) {
                current['set'] = null;
                current['levels'] = null;
           }
        })
        return data;
    },
    /**
     * Checks a row for combinatoriality levels. Returns a String if not combinatorial.
     * @param {array} row 
     * @param {int} universe 
     * @returns Combinatorial Levels.
     */
    combinatoriality: function (row,universe = 12) {
        let partition = [row.slice(0,universe/2),row.slice(universe/2)];
        let storage = [new MySet(universe,...partition[0]),new MySet(universe,...partition[1])];
        let Combin = ArrayMethods.unique_subarray([storage[0].prime_form(),storage[1].prime_form()]).length == 1;
        let result = [];
        if (Combin == true && universe%2 == 0) {
            let vects = [storage[0].interval_class_vector(),storage[0].index_vector()];
            vects[0][vects[0].length-1]*=2;     //Double the value of the tritone
            for (let a = 0; a < vects.length; a++) {
                for (let b = 0; b < vects[a].length; b++) {
                    if (vects[a][b] == 0 && a == 0) {
                        result.push(`P${b+1}/${universe-(b+1)}`);
                    }
                    else if (vects[a][b] == 6 && a == 0) {
                        result.push(`R${b}/${universe-(b+1)}`);
                    }
                    else if (vects[a][b] == 0 && a == 1) {
                        result.push(`I${b}`);
                    }
                    else if (vects[a][b] == 6 && a == 1) {
                        result.push(`RI${b}`);
                    }
                }
            }
        }
        else {
            result = 'Not Combinatorial.';
        }
        return result;
    },
    allInterval: function(row,universe = 12) {
        let tally = [];
        for (let a = 1; a < row.length; a++) {
            tally.push(Serialism.modulo(row[a]-row[a-1],universe));
        }
        return Array.from(new Set(tally)).length == universe-1;
    }
}

/**
 * Creates an HTML table, useful for formatting a page. Identity sets ids as identityx:y
 * @param {int} columns 
 * @param {int} rows 
 */
function BuildTable (data,parent = undefined,borders = false) {
    this.ids = [];
    let table = document.createElement('table');
    let bod = document.createElement('tbody');//Check this.
    for (let a = 0; a < data.length; a++) {
        let row = document.createElement('tr');
        let temp = [];
        for (let b = 0; b < data[a].length; b++) {
            let cell = document.createElement('td');
            cell.setAttribute('id',`${b}:${a}`);
            temp.push(`${b}:${a}`);
            cell.innerHTML = `${data[a][b]}`
            row.appendChild(cell);
            cell.style.border = borders? '1px solid black' : undefined;
        }
        this.ids.push(temp);
        bod.appendChild(row);
    }
    console.log(this.ids);
    table.appendChild(bod);
    parent == undefined? document.body.appendChild(table) : document.getElementById(parent).appendChild(table);
}

/**
 * A method for paritioning an array into n parts. 
 * @param {array} array 
 * @param {int} parts number of partitions
 * @returns 2D array
 */
const partition = (array,parts) => {
    let res = [];
    let divs = array.length/parts;
    for (let a = 0; a < array.length/divs; a++) {
        let el1 = a*divs;
        res.push((array.slice(el1,el1+divs)));
    }
    return res;
}

/**
 * Transpose a rectangular 2D array.
 * @param {array} array 
 * @returns 2D array
 */
const zip = (array) => {
    return array[0].map((_,colIndex) => 
        array.map(row => row[colIndex]));
}


const generate = (n = 12) => {
    let res = [];
    for (let a = 0; a < n; a++) {
        for (let b = 0; b < n; b++) {
            res.push(`${a}:${b}`);
        }
    }
    return res;
}

const toPitch = (item) => {
    let pitches = ['C','C♯/D♭','D','D♯/E♭','E','F','F♯/G♭','G','G♯/A♭','A','A♯/B♭','B'];
    let dtype = typeof item;
    if (dtype == 'string') {
        return pitches.indexOf(item);
    }
    else if (dtype == 'number' && item % 1 == 0) {
        return pitches[item];
    }
    else {
        console.error(`${item} is not an integer or string!`);
    }
}

/**
 * Create an object that can command an n*n matrix.
 * @param {array} labels 2D array [[column],[row]]
 * @param {array} data 1D | 2D array
 */
function Matrix (labels,data) {
    let flattened = typeof data[0] == 'object'? data.flat() : data;//Flatten to 1d if 2d matrix.
    let size = Math.sqrt(flattened.length)%1 == 0? Math.sqrt(flattened.length): console.error(`'data' is ${flattened.length} long which is not a perfect square!`);
    this.matrix = [];
    this.rowForms = {};
    this.sectorSize = null;
    this.labelElems = [];
    this.boxSize = 35;
    for (let a = 0; a < flattened.length; a++) {
      let x = a%size;
      let y = Math.floor(a/size);
      this.matrix.push({
      'column': x, //Column placement 1d array index;
      'row': y,  //Row placement 2d array index;
      'value': a,
      'display': flattened[a],  
      'sector': null,
      'rowSelect': false,
      'columnSelect': false,
      'class': null,
      'individual': false,
      'note': Q.universe == 12? toPitch(flattened[a]) : null,//Not always true...
      'pc': flattened[a],
      'half': false,
      'initialHalf': false,
      'subs': false,
      'columnOrder': false,
      'rowOrder': false,
      'self': null
      });
    }
    this.numSectors = 0;
    this.currentSelection = [];
    for (let a = 0; a < labels.length; a++) {
        for (let b = 0; b < labels[a].length; b++) {
            for (let c = 0; c < 2; c++) {
                let temp = {
                    'name': c == 0? labels[a][b] : `R${labels[a][b]}`,
                    'form': null,  //P,RP,RI,I
                    'pc': labels[a][b].match(/[0-9]+/),
                    'self': null,
                    'note': toPitch(parseInt(labels[a][b].match(/[0-9]+/))),
                    'position': b,
                    'highlight': false,
                    'selected': false,
                    'row': a == 0? null: b,
                    'column': a == 0? b : null,
                }
                temp.form = temp.name.match(/[a-z]+/ig)[0];
                this.labelElems.push(temp);
                }
            }
        }
    /**
     * Partitions a matrix into submatrixes of size n.
     * @param {int} partition size of partition.
     * @param {int} sector which partition to access.
     */
    this.getSector = (partition,sector) => {
      let sectSize = Math.floor(size/partition);
      this.sectorSize = partition;
      this.matrix.forEach(cell => {
        cell.sector = Math.floor(cell.column/partition)+Math.floor(cell.row/partition)*sectSize;
      });
      let result = [];
      for (let a = 0; a < this.matrix.length; a++) {
        this.matrix[a].sector == sector? result.push(this.matrix[a]): null;
      }
      this.numSectors = this.matrix[this.matrix.length-1].sector+1; //Number of sectors is the last cell's sector + 1;
      let parody = this.numSectors%2 == 0? 'even' : 'odd';
        for (let a = 0; a < this.matrix.length; a++) {
            let subRow = Math.floor(this.matrix[a].sector/Math.sqrt(this.numSectors));
            console.log(subRow)
            if (parody == 'even') { 
                if (subRow % 2 == 0) {
                    this.matrix[a].class = this.matrix[a].sector % 2 == 0? 'sectorDark' : 'sectorLight';
                }
                else {
                    this.matrix[a].class = this.matrix[a].sector % 2 == 0? 'sectorLight' : 'sectorDark';
                }
            }
            else if (parody == 'odd') {
                this.matrix[a].class = this.matrix[a].sector % 2 == 0? 'sectorDark' : 'sectorLight';
            }   
        }
        if (sector !== undefined) {//Find a way to highlight a sector.
           
        }
      this.updateGrid();
    }
    /**
     * Get elements in a single row.
     * @param {int} index 
     * @param {bool} draw
     * @param {bool} cells
     */
    this.rowSelect = (index,draw = true,cells = false) => {
      let result = [];
      let rowElems = [];
      this.matrix.forEach(item => {
        item.row == index? result.push(item) : null;
      })
        result.forEach(cell => {
            rowElems.push(cell.display);
            if (draw == true) {
                cell.rowSelect = !cell.rowSelect;
            };
          })
          draw? this.updateGrid() : null;
          return cells? result : rowElems;
    }
    /**
     * Get elements in a single column.
     * @param {int} index
     * @param {bool} draw
     * @param {bool} cells 
     */
    this.columnSelect = (index,draw = true,cells = false) => {
      let result = [];
      let rowElems = [];
      this.matrix.forEach(item => {
        item.column == index? result.push(item) : null;
      })
        result.forEach(cell => {
            rowElems.push(cell.display);
            if (draw == true) {
            cell.columnSelect = !cell.columnSelect;
            }
          });
          draw? this.updateGrid() : null;
          return cells? result : rowElems;
    }
    /**
     * Collect property as a 1D or 2D array, allows for display.
     * @param {string} property
     * @param {bool} twoD 
     * @returns array
     */
    this.arrayRepr = (property,twoD = false) => {
        let result = [];
        if (twoD == false) {
            this.matrix.forEach(cell => {
                if (property in cell) {
                    result.push(cell[property]);
                }
                else {
                    result.push(null);
                }
            })
        }
        else {
           //2d fails
           ArrayMethods.partition(this.matrix,Math.sqrt(this.matrix.length));
        }
        return result;
    }
    this.getSingleElement = (element) => {
        this.matrix.forEach(cell => {
            if (cell.display == element) {
                cell.individual = true;
            }
            else {
                cell.individual = false;
            }  
        })
        this.updateGrid();
    }
    /**
     * Get a row form by it's name.
     * @param {string} form 
     * @param {bool} draw
     */
    this.getRowForm = (form,draw = false) => {
        let isI = form.indexOf('I') !== -1;
        if (isI) {
            this.rowForms[form].forEach(item => {
                draw? item.columnSelect = !item.columnSelect : null;
            })
        }
        else {
            this.rowForms[form].forEach(item => {
                draw? item.rowSelect = !item.rowSelect : null;
            })
        }
        return this.rowForms[form];
    }
    /**
     * Find adjacent instances of elements. Either in the entire matrix, or just the selected forms.
     * @param {array} elements
     * @param {bool} selectedOnly 
     */
    this.getAdjacent = (elements,selectedOnly = false) => {
        this.matrix.forEach(item => {
            item.subs = false;
        });//Clear
        let conc = elements.sort((a,b) => a-b).join('|');
        let size = elements.length;
        let winners = [];
        let options;
        if (selectedOnly == true) {
            let compiled = {};
            for (let a = 0; a < this.currentSelection.length; a++) {
                compiled[this.currentSelection[a]] = this.rowForms[this.currentSelection[a]];
            }
            options = compiled;
        }
        else {
            options = this.rowForms;
        }
        for (const [key,value] of Object.entries(options)) {
                let els = value.map(ob => ob.pc);
                for (let i = 0; i < els.length; i++) {
                    let test = els.slice(i,i+size).sort((a,b) => a-b).join('|');
                    if (test == conc) {
                        winners.push([key,[i,i+size]]);
                    }
            }
        }
        for (let a = 0; a < winners.length; a++) {
            let selectedForm = this.getRowForm(winners[a][0],false);
            for (let i = winners[a][1][0]; i < winners[a][1][1]; i++) {
                selectedForm[i]['subs'] = true;
            }
        }
        this.updateGrid();
        let filt = winners.filter(x => x[1][0] == 0);
        document.getElementById('combinatorial').innerHTML = `|${filt.map(z => z[0])}|`;
    }
    /**
     * Search the matrix for a given set class.
     * @param {array} sc 
     */
    this.findSetClass = (sc) => {
        let search = new MySet(Q.universe,...sc).prime_form().join('|');
        let results = [];
        for (let [key,value] of Object.entries(this.rowForms)) {
            for (let a = 0; a < value.length; a++) {
                let temp = value.slice(a,a+sc.length).map(z => z.pc);
                if (temp.length == sc.length) {//Confirm that slice is of same cardinality.
                    let setRep = new MySet(Q.universe,...temp).prime_form().join('|');
                    if (setRep == search) {
                        results[key] = [a,a+sc.length];
                    }
                }
            }
        }
        let conv = Object.entries(results);
        for (let b = 0; b < conv.length; b++) {
            let sel = this.getRowForm(conv[b][0],false).slice(conv[b][1][0],conv[b][1][1]);
            sel.forEach(item => {
                item.initialHalf = true;
            })
        }
        this.updateGrid();
        //return results;
    }
    /**
     * Gets elements in a matrix by order position.
     * @param {array} positions 
     * @param {bool} selectedOnly
     */
    this.orderPositions = (positions,selectedOnly = false) => {
        this.matrix.forEach(element => {
            element['columnOrder'] = false;
            element['rowOrder'] = false;
        });
        if (selectedOnly == true) {
            this.currentSelection.forEach(elem => {
                let isI = elem.indexOf('I') > -1;
                let curr = this.rowForms[elem];
                for (let a = 0; a < positions.length; a++) {
                    isI? curr[positions[a]]['columnOrder'] = true : curr[positions[a]]['rowOrder'] = true;
                }
            })
        }
        else {
            for (let [key,value] of Object.entries(this.rowForms)) {
                let isI = key.match(/[a-z]/ig).indexOf('I') > -1;
                for (let a = 0; a < positions.length; a++) {
                    console.log(`${key} = I form?: ${isI}`);
                    isI? value[positions[a]]['columnOrder'] = true : value[positions[a]]['rowOrder'] = true;
                }
            }
        }
        this.updateGrid();
    }
    /**
     * Redraws the matrix with any updates. Slow for large collections.
     */
    this.updateGrid = () => {
        document.querySelectorAll('#drawing').length > 0? document.getElementById('drawing').textContent = '' : null;
        let boxSize = this.boxSize;
        let draw = SVG().addTo("#drawing").size((size+3)*boxSize,(size+3)*boxSize);//Auto Adjust drawing area!
        //Regular cells
        for (let a = 0; a < data.length; a++) {
            let coord = [this.matrix[a].column,this.matrix[a].row];
            let grp = draw.group().addClass('cell');
            let cell = draw.rect(boxSize,boxSize).fill('white').stroke({color: 'black', width: '1px'});
            let text = draw.text(`${this.matrix[a].display}`);
            grp.add(cell);
            grp.add(text.center(boxSize/2,boxSize/2));
            this.matrix[a].self = grp['node'];
            grp.translate((coord[0]+1)*boxSize,(coord[1]+1)*boxSize);   //+1 adds buffer for labels.
            this.matrix[a].class !== 'sectorLight'? grp.addClass(this.matrix[a].class) : null;
            this.matrix[a].rowSelect? grp.addClass('selectedRow') : null;
            this.matrix[a].columnSelect? grp.addClass('selectedColumn') : null;
            this.matrix[a].individual? grp.addClass('selected') : grp['node'].classList.remove('selected');
            this.matrix[a].initialHalf? grp.addClass('selHalf') : grp['node'].classList.remove('selHalf');
            this.matrix[a].subs? grp.addClass('half') : grp['node'].classList.remove('half'); //REMOVE?
            this.matrix[a].rowOrder? grp.addClass('ro') : grp['node'].classList.remove('ro');
            this.matrix[a].columnOrder? grp.addClass('co') : grp['node'].classList.remove('co');          
        }
        //Label cells
        this.labelElems.forEach(label => {
            let grp = draw.group().addClass('label');
            let text = draw.text(label.name);
            let rect = draw.rect(boxSize,boxSize).fill('white');
            grp.add(rect);
            grp.add(text.center(boxSize/2,boxSize/2));
            label.self = grp['node'];
            let location = null;
            if (label.form.indexOf('I') > -1) {
                if (label.form == 'I') {
                    location = [boxSize*(label.position+1),0];
                    this.rowForms[label.name] = this.columnSelect(label.column,false,true);
                }
                else if (label.form == 'RI') {
                    location = [boxSize*(label.position+1),(size+1)*boxSize]; 
                    this.rowForms[label.name] = this.columnSelect(label.column,false,true).reverse();
                }
            }
            else {
                if (label.form == 'P') {
                    location = [0,boxSize*(label.position+1)];
                    this.rowForms[label.name] = this.rowSelect(label.row,false,true);
                }
                else if (label.form == 'RP') {
                    location = [(size+1)*boxSize,boxSize*(label.position+1)];
                    this.rowForms[label.name] = this.rowSelect(label.row,false,true).reverse();
                }
            }
            grp.translate(...location);
            label.self.addEventListener('mousedown',() => {//Deselect upon click R or RI??
                console.log(`${label.name} clicked!`);
                label.selected = !label.selected;//Sortof...
                label.row == null? this.columnSelect(label.column,true) : this.rowSelect(label.row,true); 
                label.selected? this.currentSelection.push(label.name) : this.currentSelection = this.currentSelection.filter(x => x != label.name);
                console.log(`Selected Forms: [${this.currentSelection}]`);
            })
        })
    },
    /**
     * Toggle Note Names.
     */
    this.noteNames = () => {
        this.matrix.forEach(item => {
            if (typeof item.display == 'number') {
                item.display = item.note;
                this.boxSize = 44;
            }
            else if (typeof item.display == 'string') {
                item.display = item.pc;
                this.boxSize = 35;
            }
        })
        this.labelElems.forEach(item => {
            if (item.name.match(/[0-9]/) == null) {//Labels have no numbers.
                item.name = `${item.form}${item.pc}`;
            }
            else {
                item.name = `${item.form}${item.note}`;
            }
        })
        this.updateGrid();
    }
}

/**
 * Creates inputs that store their submitted values.
 * @param {string} parent
 * @param {object} inputs {name: str, type: str}
 */
function DataCollect (parent,...inputs) {
    this.data = inputs;
    this.universe = null;
    let t = document.createElement('table');
    let labels = document.createElement('tr');
    let ins = document.createElement('tr');
    let display = document.createElement('tr');
    for (let a = 0; a < this.data.length; a++) {  
        this.data[a]['value'] = null;
        this.data[a]['htmlElements'] = null;
        let labCell = document.createElement('td')
        labCell.setAttribute('id',`${this.data[a].name}`);//Labels
        let cell = document.createElement('td');//Inputs
        let assocValue = document.createElement('td');
        assocValue.setAttribute('id',`column${a}`);
        labCell.innerHTML = `${this.data[a].name.toUpperCase()}`;
        let cellIn;
        /**
         * Clause for if input is a button.
        */
        if (this.data[a].type == 'button') {
            cellIn = document.createElement('button');
            cellIn.setAttribute('id',`button${a}`);
            cellIn.innerHTML = 'CLICK';
            this.data[a].htmlElements = cellIn;
        }
        else {
            cellIn = document.createElement('input');
            cellIn.setAttribute('type',`${this.data[a].type}`); 
            cellIn.setAttribute('placeholder',`${this.data[a].name}`);
            cellIn.addEventListener('keypress',(target) => {
                if (target.key == 'Enter') {
                    if (this.data[a].type == 'text') {
                        let regex = /[0-9]+/ig;
                        if (this.data[a].name == 'series') {
                            let temp = cellIn.value.match(regex);
                            this.data[a].value = temp.map(x => parseInt(x));
                            let total = Serialism.buildMatrix(this.data[a].value,this.universe,false,true);
                            this.matrix = Serialism.buildMatrix(this.data[a].value,this.universe,false,false);
                            this.labels = [total[0].slice(1,total[0].length-1),total.map(x => x[0]).slice(1,total[0].length-1)];
                            X = new Matrix(this.labels,this.matrix.flat());
                            X.updateGrid();
                            let derivation = Serialism.derivation(this.data[a].value,this.universe,true); //Find a way to slice last entry...
                            let allInterval = Serialism.allInterval(this.data[a].value,this.universe);
                            let subDivs = document.querySelectorAll('#information > div').forEach(div => {
                                div.innerHTML = '';
                            })
                            Object.entries(derivation).forEach(([key,value]) => {
                            let box = document.createElement('div');
                            box.setAttribute('class','moreInfo');
                            box.innerHTML = `Derived at cardinality ${key}: (${value['set']})`;
                            value['set'] == null? null : document.getElementById('derivation').append(box);//Don't add if null.
                        });
                        document.getElementById('allInt').innerHTML = `All Interval: ${allInterval}`;
                        }
                        else if (this.data[a].name == 'search') {
                            X.getAdjacent(cellIn.value.match(regex).map(x => parseInt(x)));
                        }
                    }
                    else if (this.data[a].type == 'number') {
                        this.data[a].value = parseFloat(cellIn.value);
                        this.universe = this.data[a].value;
                        let rowParts = factors(this.universe).filter(fact => fact !== 1 && fact !== this.universe);
                        document.querySelectorAll('.partition').forEach(item => item.remove());
                        rowParts.forEach(division => {
                            let b = document.createElement('button');
                            b.setAttribute('class','partition');
                            b.textContent = division;
                            let on = false;
                            b.addEventListener('click',() => {
                                on = !on;
                                on? X.getSector(division) : X.getSector(0);
                            })
                            document.getElementById(parent).appendChild(b);
                        })
                    }
                    else {
                        this.data[a].value = cellIn.value;
                    }
                    let special = typeof this.data[a].value == 'object'? `[${this.data[a].value}]` : `${this.data[a].value}`; //Determine if type of data is array.
                    assocValue.innerHTML = special;
                }
            });
        }
        cell.appendChild(cellIn)
        labels.appendChild(labCell);  
        ins.appendChild(cell);
        document.getElementById(`column${a}`)? document.getElementById(`column${a}`).remove() : null;
        display.appendChild(assocValue);
    }
    t.appendChild(labels);
    t.appendChild(ins);
    t.appendChild(display);
    let par = parent? document.getElementById(parent) : document.body;
    par.appendChild(t);
}

let Q;

let X;

document.addEventListener('DOMContentLoaded',() => {
    // let row = [0,3,4,6,9,10,1,2,5,7,8,11];  //Fascinating Viennese trichord row!
    //Webern Row: 10,9,1,11,2,0,6,5,4,8,7,3
    Q = new DataCollect('inputs',
        {name: 'universe',type: 'number'},
        {name: 'series', type: 'text'},
        {name: 'search', type: 'text'}
    );
}) 

//Holst double concerto
//Little Fugue in G minor mod 12 [7,2,10,9,7,10,9,7,6,9,2,7,2,9,2,10,9,10,9,7,9,2,7,2,9,2,10,9,7,9]
//Little Fugue mod7 [0, 4, 2, 1, 0, 2, 1, 0, 6, 1, 4, 0, 4, 1, 4, 2, 1, 0, 1, 4, 0, 4, 1, 4, 2, 1, 0, 1]

//Dallapicolla treble row [7,8,0,3,5,11,10,2,4,9,6,1] No. 19 in anthology

//Reach out to people about math/music