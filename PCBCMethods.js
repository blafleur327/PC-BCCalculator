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
     * Returns array indexes that are included in indexes array.
     * @param {array} array Input to be filtered.
     * @param {array} indexes Indexes to keep.
     * @returns Filtered Array.
     */
    indexer: function (array,indexes) {
        let res = [];
        for (let a = 0; a < indexes.length; a++) {
            res.push(array[a]);
        }
        return res;
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
    unpack: (array) => {
        let res = [];
        for (let a = 0; a < array.length; a++) {
            res.push(...array[a]);
        }
        return res;
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
     * @param {boolean} return_indexes Outputs the indexes of unique transformations.
     * @returns Unique Subs || Counts.
     */
    unique_subarray: function (array,ordered = false,return_count = false,return_indexes = false) { //O(n * log(m))
        let step1 = ordered? array.map(sub => sub.join('|')) : array.map(sub => sub.sort((a,b) => a-b).join('|'));
        let elim = Array.from(new Set(step1));
        let inds = elim.map(x => step1.indexOf(x));
        if (return_indexes == true) {
            return inds;
        }
        else {
            if (return_count == false) {
                return inds.map(index => array[index]);
            }
            else {
                return inds.map(index => [array[index],this.get_many(step1,step1[index]).length]);
            }
        }
    },
    /**
     * Gets the same indexes from unique entries of array 1 in array 2.
     * @param {array} array1 
     * @param {array} array2 
     */
    symmetrical_removal: function (array1,array2) {
        let start = ArrayMethods.unique_subarray(array1,undefined,undefined,true);
        return ArrayMethods.indexer(array2,start);
    }
}

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
        return array.map(x => this.modulo(x+index,modulus)); //O(n);
    },
    /**
     * 
     * @param {int} index 
     * @returns this.set -> t(n)I mod this.universe. 
     */
    this.invert = function (array = this.set,modulus = this.universe,index = 0) {
        return array.map(x => this.modulo(index-x,modulus)); //O(n);
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
    this.abstract_subsets = (cardinality = null,uniques = false,array = this.set, mod = this.universe) => {    //2 additional operations.
        let start = this.literal_subsets(cardinality,array).filter(x => x.length > 2);
        let res = start.map(y => this.prime_form(y,mod)).sort((a,b) => a.length < b.length);
        return uniques? ArrayMethods.unique_subarray(res) : res;
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
    this.set_class = (array = this.set,modulus = this.universe,eliminateDuplicates = false) => {
        let result = {};
        for (let a = 0; a < modulus; a++) {
            result['T'+a] = this.normal_order(array.map(x => this.modulo(x+a,modulus)),modulus);
            result['I'+a] = this.normal_order(array.map(y => this.modulo(a-y,modulus)),modulus);
        }
        if (eliminateDuplicates == true) {
            result = ArrayMethods.unique_subarray(result);
        }
        return result;
    },
    /**
     * Determines if two input arrays have any meaningful PC relationship. It the sets are the same cardinality, test
     *  for T/I and Z relation. If the two sets are not the same cardinality, tests for literal and abstract (Prime Form) inclusionary relationship.
     * @param {array} array1 
     * @param {array} array2 
     * @param {int} modulus 
     * @returns Relationship
     */
    this.compare_set = (array1, array2 = this.set,modulus = this.universe) => {
        let no1 = this.normal_order(array1,modulus); 
        let no2 = this.normal_order(); 
        if (array1.length == array2.length) {   //Transposition or Inversional Equivalence.
            let sc = this.set_class(no2,modulus);
            let res = null;
            for (value in sc) { 
                if (ArrayMethods.array_concat(sc[value]) == ArrayMethods.array_concat(no1)) {
                    res = value;
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
            return res;
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
    },
    this.displayProperties = (...info) => {
        let result = {};
        let options = {
            'Normal Form': this.normal_order(),
            'Prime Form': this.prime_form(),
            'Interval Class Vector': this.interval_class_vector(),
            'Index Vector': this.index_vector(),
            'Literal Subsets': this.literal_subsets(),
            'Abstract Subsets': this.abstract_subsets()
        }
        info.forEach(item => {
            let regex = new RegExp(item,'ig');
            for (key in options) {
                if (key.match(regex)) {
                    result[key] = options[key];
                }
            }
        })
        return result;
    },
    /**
     * Find axes of symmetry within a set.
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
     * Checks the superset for all contained instances of the subset.
     * @param {array} subset
     * @param {array} superset
     * @param {int} modulus 
     */
    this.contains_subset = (subset, superset = this.set,modulus = this.universe) => {
        let subAsSet = this.set_class(subset,modulus);
        let sup = superset;
        let final = {};
        for (const [key,value] of Object.entries(subAsSet)) {
            let trues = 0;
            for (let a = 0; a < value.length; a++) {
                if (sup.indexOf(value[a]) == -1) {
                    break;
                }
                else {
                    trues++;
                }
            }
            trues == value.length? final[key] = value : null;
        }
        return final;
    }
};

/**
 * Methods used for Scale Theoretical calculations. Dependent upon the updated ArrayMethods class.
 */
const ScaleTheory = {
    /**
     * Returns a boolean of if the input is prime.
     * @param {int} value 
     * @returns Boolean
     */
    prime: function (value) {
        let res = [];
        let i = 1;
        while (i <= value/i) {
            value%i == 0? res.push(i,value/i) : null;
            i++;
        }
        return res.length == 2;
    },
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
        array = array.slice().sort((a,b) => a-b);    //Put in ascending order
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
        let d = array.length;
        let c = universe;
        if (ScaleTheory.prime(d) == true) {
            return d <= (Math.floor(c/2)+1);    //Formula by Clough and Meyerson;
        }
        else {
            return false;
        }
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
        let copy = [...new Set(array.sort((a,b) => a-b))];
        if (copy.length == universe) {
            return generate? copy : true;
        }
        let bin = ScaleTheory.maxEvenInts(copy.length,universe,generate);  //Variable output depending on next steps.
        if (generate == false) {    //Test input for ME property. -> Boolean
            return ArrayMethods.isRotation(ScaleTheory.ais(copy,universe,true),bin);   
        }
        else {  //Generate options -> Array.
            let result = ArrayMethods.rotations(bin);
            result.map(x => {
                let first = x[0];   
                for (let i = 0; i < x.length; i++) {
                    x[i] = ScaleTheory.modulo(x[i]-first,universe); //Transpose each rotation to zero.
                }
                x.slice().sort((a,b) => a-b);
            })
            return ArrayMethods.unique_subarray(result);    //Eliminate duplicates if present.
        }
    },
    /**
     * Converts elements from one modulus to another proportionally.
     * @param {array} array 
     * @param {int} universeIn 
     * @param {int} universeOut 
     * @returns elements converted proportionally
     */
    proportionalModuloConversion: function (array,universeIn,universeOut) {
        return array.map(element => Math.round((element*universeOut)/universeIn));
    },
    myhillsProperty: function (array,universe) { //Still not 100% sure how this is different from CV...
        return ScaleTheory.maximallyEven(array,universe)? ArrayFrom(new Set(ScaleTheory.ais(array,modulus,true))).length == 2: false;
    }
}

const palindrome = (array) => {
    let res = 0;
    for (let a = 0; a < array.length; a++) {
        if (array[a] == array[array.length-(a+1)]) {
            res++;
        }
    }
    return res==array.length;
}

const mod = (value,modulus) => {
    if (value >= 0) {
        return value% modulus;
    }
    else {
        return (value%modulus)+modulus;
    }
}

/**
 * Creates an HTML table, useful for formatting a page. Identity sets ids as x:y
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
            cell.setAttribute('id',`${parent? parent : ''}${b}:${a}`);
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
 * Checks the sup array for all elements of sub.
 * @param {array} sub 
 * @param {array} sup 
 * @returns boolean
 */
const isLiteral = (sub,sup) => {
    let res = sub.map(x => sup.indexOf(x) !== -1);
    return res.every(x => x);
}



/**
 * Simplified way to determine at what T/I levels a superset contains a subset at. Optionally plot individual sets. 
 * @param {array} sub 
 * @param {array} sup 
 * @param {int} modulus 
 * @returns Array
 */
const isAbstract = (sub,sup,modulus,showUniques = false) => {
    let res = [];
    let sc = new MySet(modulus,...sub).set_class();
    for (let key in sc) {
        isLiteral(sc[key],sup)? res.push(key) : null;
    }
    return [res,res.map(x => sc[x])];   //[0] = transformations [1] == actual sets.
}

/**
 * Creates an HTML table, useful for formatting a page. Identity sets ids as identityx:y
 * @param {int} columns 
 * @param {int} rows 
 */
function buildTable (identity,columns = 4, rows = 4,parent = null) {
    let table = document.createElement('table');
    let body = document.createElement('tbody');//Check this.
    for (let a = 0; a < rows; a++) {
        let row = document.createElement('tr');
        for (let b = 0; b < columns; b++) {
            let cell = document.createElement('td');
            cell.setAttribute('id',`${identity}${b}:${a}`);
            row.appendChild(cell);
        }
        body.appendChild(row);
    }
    table.appendChild(body);
    parent? document.getElementById(parent).appendChild(table) : document.body.appendChild(table);
}

class StateManager {
    constructor () {
        this.states = {};
    }
    /**
     * 
     * @param {string} name
     * @param {object} object
     */
    saveState = (name,object) => {
        const params = new URLSearchParams(window.location.search);
        for (const [key,value] of Object.entries(object)) {
            params.set(key,value);
        }
        let url = `${window.location.pathname}?${params.toString()}`;
        history.pushState(name,'',url);
        console.log(`New URL = ${url}`);
    }
    loadState = () => {
        let params = new URLSearchParams(window.location.search);
        const stateObject = {};
        for (const [key,value] of params.entries()) {
            stateObject[key] = value;
        }
        if (stateObject.universe) {
            C = new Shape.AdvancedPolygon(stateObject.universe,undefined,'',false,0,true);
        }
    }
}

//Turn Tn/In into drop down hoverable menu!!

/**
 * Creates a hoverable description element.
 * @param {string} itemID ID of extant HTML element.
 * @param {string} description 
 */
const hoverDescription = (itemID,description) => {
    let cont = document.createElement('div')
        cont.setAttribute('class','dropdown');
    let elem = document.getElementById(itemID); //This is the issue!
        elem.setAttribute('class','hoverable');
    let desc = document.createElement('p')
        desc.setAttribute('class','description');
    desc.textContent = description;
    cont.appendChild(desc);
    elem.appendChild(cont);
}

const Shape = {
    /**
     * Calculates the centroid of an irregular polygon.
     * @param {array} array [x,y]; 
     */
    centroid: (array) => {
        let area = 0;
        let Cx = 0, Cy = 0;
        for (let a = 0; a < array.length; a++) {
            let xa = array[a][0];
            let ya = array[a][1];
            let xnext = array[(a+1)%array.length][0];
            let ynext = array[(a+1)%array.length][1];
            let factor = (xa*ynext)-(ya*xnext);
            area+=factor;
            Cx += (xa+xnext) *factor;
            Cy += (ya+ynext) *factor;
        }
        area = Math.abs(area)/2;
        Cx/=(6*area);
        Cy/=(6*area);
        return [Cx,Cy];
    },
    /**
     * Determines position of n points around a regular polygon of with sides of length l.
     * @param {array} center [x,y] 
     * @param {int} numPoints 
     * @param {int} length 
     */
    getPoints: function (center,numPoints = 3,length = 50) {
        let allAngles = 360/numPoints;      //(180*(numPoints-2))/numPoints is really interesting!
        let vertices = [];
        for (let a = 0; a < numPoints; a++) {
            let angle = ((a*allAngles) -90) * Math.PI/180;  //-90 sets top element to 0;
            let x = center[0] + length * Math.cos(angle);
            let y = center[1] + length * Math.sin(angle);
        vertices.push([x, y]);
        }
        return vertices;
    },
    /**
     * Draws a polygon optionally with nodes. 
     * @param {int} numPoints 
     * @param {float} length 
     * @param {boolean} showNodes 
     */
    myPolygon: function (numPoints = 3,length = 150,showNodes = false) {
        this.drawArea = 500;    //This should change the center automatically.
        this.center = [this.drawArea/2,this.drawArea/2];
        this.superElements = [];
        this.subElements = [];
        this.nodes = [];
        this.modifiedSet = [];
        this.draw = document.getElementById('drawing').value? "": SVG().addTo("#drawing").size(this.drawArea,this.drawArea);
        this.lines = this.draw.polygon().stroke({width: '1px',color: 'black'}).fill('white');//Lines on the OG shape.
        let supGrp = this.draw.group().addClass('impo').id('superPoly');
        let subGrp = this.draw.group().addClass('impo').id('subPoly');
        let subText = this.draw.text(`0`);
        let supText = this.draw.text(`0`);
        this.superShape = this.draw.polygon().stroke({width: '1px',color: 'black'}).fill('white');
        this.subShape = this.draw.polygon().stroke({width: '1px',color: 'black'}).fill('white');
        //supGrp.add(supText);
        supGrp.add(this.superShape);
        supGrp.add(supText);
        subGrp.add(this.subShape);
        subGrp.add(subText)
        this.subSymm = false;
        this.supSymm = false;
        /**
         * Copy the SVG drawing into a new window.
         */
        this.newTab = () => {
            let tab = window.open();
            tab.document.body.innerHTML = `<div style="
            display: flex, align-items: center">
            ${document.getElementById('drawing').innerHTML}
            </div>`;
            console.log(`${tab.document.body.getElementsByTagName('div')}`);
        }
        /**
         * A method for redrawing the entire polygon without creating a new instance.
         */
        this.updater = () => {
            this.superElements = [];
            this.subElements = [];
            let table = {'superset': [],'subset': []}; //Display in console, but could be used to show the superset and subset elements.
            //
            document.getElementById('drawing').addEventListener('contextmenu',(event) => {//Needed only for right click.
                event.preventDefault();
            })
            this.nodes.forEach(elem => {
                if (elem.inSuper == true) {
                    elem.node.addClass('inSup');//This allows it to remain displayed after clicked!
                    this.superElements.push(elem);//Add to superset
                    table["superset"].push(elem.value); //Add to table;
                    if (elem.inSub == true) {
                        elem.node.addClass('inSub');
                        this.subElements.push(elem);    //Add to subset
                        table['subset'].push(elem.value);//Add to table
                    }
                    else {
                        elem.node['node'].classList.remove('inSub');
                    }
                }
                else {
                    elem.node['node'].classList.remove('inSup');
                    elem.node['node'].classList.remove('inSub');
                }
            })
            console.table(table);//Shows elements.
            //Make MySet object for each collection.
            this.setrepSuper = new MySet(numPoints,...table['superset']);
            this.setrepSub = new MySet(numPoints,...table['subset']);
            //Get coordinates of each element.
            let superCoords = this.superElements.map(y => y.coordinates);
            let subCoords = this.subElements.map(z => z.coordinates);
            //Plot the polygons of each collection.
            this.superShape.plot(superCoords);
            this.subShape.plot(subCoords);
            document.querySelector('#subPoly > text').textContent = `[${this.setrepSub.normal_order()}]`;
            document.querySelector('#superPoly > text').textContent = `[${this.setrepSuper.normal_order()}]`;
            subText.center(...Shape.centroid(subCoords));
            supText.center(...Shape.centroid(superCoords));
            /**
             * Object storing the various properties to display from the superset. 
             */
            let superInf = {
                'Normal Form': {'show': `[${this.setrepSuper.normal_order()}]`,'description': "The rotation of the numerical order with the smallest boundary interval mod n."},
                'Prime Form': {'show': `(${this.setrepSuper.prime_form()})`,'description': `The normal order or it's inverse transposed to zero. Pick the option with the smallest intervals to the...left (Straus-Rahn) or to the right (Forte).`},
                'Interval Class Vector': {'show': `<${this.setrepSuper.interval_class_vector()}>`,'description': `The collection of intervals between all binary combinations. Shows invariance by transposition level. Holds for all members of a set-class (Prime Form).`},
                'Index Vector*': {'show': `<${this.setrepSuper.index_vector()}>`,'description': `Shows invariance at inversion level. Applies only to this particular Normal Order.`},
                'Maximally Even': {'show': `ME distribution of ${this.setrepSuper.set.length} into ${numPoints} = ${String(ScaleTheory.maximallyEven(this.setrepSuper.set,numPoints)).toUpperCase()}`,'description': `Determines if the set is the maximally dispersed shape of cardinality k. Intervals must be of one or two species and these intervals must be consecutive integers.`}
            };
            let subInf = {
                'Normal Form': `[${this.setrepSub.normal_order()}]`,
                'Prime Form': `(${this.setrepSub.prime_form()})`,
                'Interval Class Vector': `<${this.setrepSub.interval_class_vector()}>`,
                'Index Vector*': `<${this.setrepSub.index_vector()}>`,
                'Maximally Even': `ME distribution of ${this.setrepSub.set.length} into ${this.setrepSuper.set.length} = ${String(ScaleTheory.maximallyEven(ScaleTheory.proportionalModuloConversion(this.setrepSub.set,numPoints,this.setrepSuper.set.length),this.setrepSuper.set.length)).toUpperCase()}`
            }
            let par1 = document.querySelectorAll('.superset > div');
            let par2 = document.querySelectorAll('.subset > div');
            if (this.setrepSuper.normal_order() == undefined) {
                par1.forEach(div => {
                    div.innerHTML = '';
                })
                par2.forEach(div => {
                    div.innerHTML = '';
                })
            }
            else {
                for (const [key,value] of Object.entries(superInf)) {
                    par1.forEach(div => {
                        if (div.id == key) {
                            div.innerHTML = `${key}: ${value.show}`;
                            hoverDescription(key,value.description);
                        }
                    })
                }
                for (const [key,value] of Object.entries(subInf)) {
                    par2.forEach(div => {
                        if (div.id == key) {
                            div.innerHTML = `${key}: ${value}`;
                            //Make these hoverable too?
                        }
                    })
                }
            }
            document.getElementById('transposition').innerHTML = '';
            document.getElementById('inversion').innerHTML = '';
            let remaining = Array.from(document.querySelectorAll('.selSub')).map(elem => elem.id);
            let literalContains = this.setrepSub.normal_order() == undefined? null : this.setrepSuper.contains_subset(this.setrepSub.set);
            let ts = 0;
            let is = 0;
            let setCompile = [];
            if (literalContains !== null) { 
                for (let [key,value] of Object.entries(literalContains)) {
                    /**
                     * Selected member of set class.
                     */
                    key[0] == 'T'? ts++ : is++;
                    setCompile.push(value);
                    document.getElementById('tInclusion').innerHTML = `Tn Inclusions: ${ts}`;
                    document.getElementById('iInclusion').innerHTML = `TnI Inclusions: ${is}`;
                    let sel = document.createElement('select');
                    sel.setAttribute('class','ddown');
                    let lab = document.createElement('p');
                    let mini = document.createElement('div');
                    mini.setAttribute('class','mini');
                    lab.innerHTML = `${key}: `;
                    let butto = document.createElement('button');
                    butto.innerHTML = `[${value}]`;
                    let clicked = remaining.indexOf(key) == -1? false : true; //This retains selection status.
                    clicked? butto.style.backgroundColor = '#000056' : '#808cfb';   //Default
                    document.getElementById('totals').innerHTML = `Unique Inclusions: ${ArrayMethods.unique_subarray(setCompile).length}`;
                    //Event Listener to each subset button!;
                    butto.addEventListener('mousedown',() => {
                        document.getElementById(`${key}`)? document.getElementById(`${key}`).remove() : null;
                        let grp = this.draw.group().addClass('selSub').id(`${key}`);
                        let littlePoly = this.draw.polygon().stroke({width: '1px', color: 'black'}).fill('#9ad6ff95');
                        clicked = !clicked;
                        this.modifiedSet = value;
                        let littleCoords = [];
                        value.forEach(elem => {
                            let reference = this.nodes.find(item => item.value == elem);
                            littleCoords.push(reference.coordinates);
                        });
                        if (clicked == true) {
                            butto.style.backgroundColor = '#000056';
                            grp.add(littlePoly);
                            littlePoly.plot(littleCoords);
                            let centroid = Shape.centroid(littleCoords);
                            grp.add(this.draw.text(`[${value}]`).center(...centroid));
                            document.getElementById('modifiedDisplay').innerHTML = `[${this.setrepSub.normal_order()}] under ${key} = [${value}]`;
                        }
                        else {
                            butto.style.backgroundColor = '#808cfb';
                        }
                    })
                    mini.appendChild(lab);
                    mini.appendChild(butto);
                    if (key[0] == 'T') {
                        document.getElementById('transposition').appendChild(mini);
                    }
                    else if (key[0] == 'I') {
                        document.getElementById('inversion').appendChild(mini);
                    }
                }
            }
            //new Description(document.getElementById('totals'),'WAHOO');
        }
        if (showNodes) {
            /**
             * Redraw the polygon with optional reordering functionality.
             * @param {array} ordering specify new node ordering from 12 o'clock.
             */
            this.redraw = (ordering = null,values = null) => {
                document.querySelectorAll('.node').forEach(item => {
                    item.remove();
                })
                this.valueList = values;
                this.specialOrdering = ordering;
                this.largeMod = numPoints > 32; 
                let og = this.specialOrdering == null || typeof this.specialOrdering[0] == 'number'? 25 : 44; 
                this.nodeSize = this.largeMod? 8: og;
                this.vertices = Shape.getPoints(this.center,numPoints,length);
                /**
                 * Stores the individual nodes and their associated properties.
                 */
                for (let a = 0; a < this.vertices.length; a++) {
                    let currentPoint = this.vertices[a];
                    let grp = this.draw.group().center(...currentPoint).addClass(`node`);
                    let circ = this.draw.circle(this.nodeSize).fill('white').stroke({width: '1px', color: 'black'}).center(...currentPoint);
                    let supMatch = this.superElements.find(el => el.value == this.specialOrdering[a]);
                    let subMatch = this.subElements.find(el => el.value == this.specialOrdering[a]);    //May Be redundant? Should be able to access once.
                    grp.add(circ);
                    let object = {
                        /**
                         * Access the total node including the circle and label elements.
                         */
                        'node': grp,
                        /**
                         * Access only the circle element.
                         */
                        'circle': circ,
                        /**
                         * Access the label/text element.
                         */
                        'text': this.draw.text(`${this.specialOrdering !== null? this.specialOrdering[a] : a}`).center(...this.vertices[a]),
                        /**
                         * Access the coordinates of this node.
                         */
                        'coordinates': this.vertices[a],
                        /**
                         * Get the associated value of this node, the number displayed.
                         */
                        'value': this.valueList !== null? this.valueList[a]: a,//This is probably the issue with varied ordering...
                        /**
                         * Wether the current node is a member of the superset.
                         */
                        'inSuper': supMatch? supMatch.inSuper : false,
                        /**
                         * Wether the current node is a member of the subset.
                         */
                        'inSub': subMatch? subMatch.inSub : false,
                    }
                    object.text? grp.add(object.text) : null;//Add to the group.
                    this.largeMod? object.node.addClass('big') : null;
                    console.log(`Object.value = ${object.value}`);
                    grp.node.objectReference = object;  //Create a property to easily access the object.
                    this.nodes[a] = object;
                }
                this.lines.plot(this.vertices);
                eventListenersToClass('node');
                this.updater();
            }
        }
        this.redraw();
        this.tesselate = (form) => {
            if (form == 'transpose') {
                
            }
            else if (form == 'invert') {

            }
            else {

            }
        }
        /**
         * Draws or removes the lines of symmetry of a given set.
         * @param {string} show superset || subset
         */
        this.drawSymmetry = (show = 'clear') => {
            if (show == 'subset') {
                this.subSymm = !this.subSymm;
            }
            else if (show == 'superset') {
                this.supSymm = !this.supSymm;
            }
            else if (show == 'clear') {
                document.querySelectorAll('line').forEach(find => {
                    find.remove();
                });
            }
            else {
                console.error(`'show' must be either the string 'subset' or 'superset'!`);
            }
            let allPoints = Shape.getPoints(this.center,numPoints*2,length*1.2);
            if (this.subSymm == true || this.supSymm == true) {
                let supe = [];
                let sub = [];
                let symm = null;
                let selColor = null;
                this.nodes.forEach(elem => {
                    if (elem.inSub == true) {
                        sub.push(elem.value);
                        supe.push(elem.value);
                    }
                    else if (elem.inSuper == true) {
                        supe.push(elem.value);
                    }
                })
                if (this.supSymm == true) {
                    selColor = 'red';
                    symm = new MySet(numPoints,...supe).symmetry();
                }
                else if (this.subSymm == true) {
                    selColor = '#626262';
                    symm = new MySet(numPoints,...sub).symmetry();
                }
                symm.forEach(pair => {
                    this.draw.line().plot(...allPoints[pair[0]*2],...allPoints[pair[1]*2]).stroke({width: 1, color: selColor, dasharray: 2}).addClass(`${show}symmetry`);
                })
            }
        }
        /**
         * Clears and redraws the polygon. Accomodates three types of clear.
         * @param {string} type full | superset | subset
         */
        this.specClear = (type) => {
            if (type == 'full') {
                this.subElements = [];
                this.superElements = [];
                document.querySelectorAll('.selSub').forEach(elem => {
                    elem.remove();
                });
                this.subSymm = false;
                this.supSymm = false;
                this.drawSymmetry('clear');
                this.nodes.forEach(element => {
                element.inSub = false;
                element.inSuper = false;
                })
            }
            else if (type == 'superset') {
                this.superElements = [];
                this.nodes.forEach(element => {
                    element.inSuper = false;
                })
            }
            else if (type == 'subset') {
                this.subset = [];
                this.nodes.forEach(element => {
                    element.inSub = false;
                })
            }
            //These almost work, but they don't keep the button selected
            else if (type == 'transposition') {
                document.querySelectorAll('.selSub').forEach(element => {
                    element.id[0] == 'T'? element.remove() : null;
                })
            }
            else if (type == 'inversion') {
                document.querySelectorAll('.selSub').forEach(element => {
                    element.id[0] == 'I'? element.remove() : null;
                })
            }
            this.updater();
        }
        /**
         * Gets the complement (opposite of) the current input set. There are some limitations, ie if you select subset complement and the superset is not the complete chromatic, only the complements of the subsets that are members of the superset will show. 
         * @param {string} type superset | subset 
         */
        this.complement = (type) => {
            if (type == 'superset') {
                this.nodes.forEach(element => {
                    element.inSuper = !element.inSuper;
                })
            }
            else if (type == 'subset') {
                this.nodes.forEach(element => {
                    element.inSub = !element.inSub;
                });
            }
            this.updater();
        }
        /**
         * Toggle the status of noteNames. 
         */
        this.noteNames = () => {
            let universe = C.data.find(elem => elem.name == 'universe').value;
            let array = this.nodes.map(a => a.value);
            let modified = null;
            let dType = typeof array[0];
            if (universe == 12) {
                let pitches = ['C','C♯/D♭','D','D♯/E♭','E','F','F♯/G♭','G','G♯/A♭','A','A♯/B♭','B'];
                if (dType == 'string') {
                    modified = array.map(x => pitches.indexOf(x));
                }
                else if (dType == 'number') {
                    modified = array.map(x => pitches[x]);
                }
                else {
                    console.error(`ERROR: Wrong data type for node elements, expected 'number' or 'string'.`)
                }
                //This sortof works, you need to check if the 'array' variable here can support a modified ordering.
                this.redraw(modified,array);
            }
            else {
                console.error(`Pitch class conversion not available in modulo ${universe}.`);
            }
        }
        this.saveSVG = (image = document.querySelector(`#drawing`)) => {
            let serializer = new XMLSerializer();
            let asString = serializer.serializeToString(image);
            const blob = new Blob([asString], { type: "image/svg+xml;charset=utf-8" });
            // Create a temporary anchor element
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = `image.svg`;
            // Trigger the download by simulating a click
            document.body.appendChild(link);
            link.click();
            // Clean up
            document.body.removeChild(link);
        }
        document.addEventListener('keypress',(event) => {
            if (event.key == ' ') {
                this.saveSVG();
            }
        })
    }
}

/**
 * Attach event listeners to all instances of a given class and pass a callback function to them.
 * @param {string} className 
 * @param {function} callback 
 * @param {any} params parameters to the callback function. 
 */
const eventListenersToClass = (className,callback = undefined,...params) => {
    let elems = document.getElementsByClassName(className);
    if (elems.length > 0) {
        let ct = 0;
        elems.forEach(item => {
            let assoc = item.objectReference;
            /**
             * Event listener for each node.
             */
            item.addEventListener('mousedown',(event) => {
                if (event.button == 0) {//Left Click or alternative input
                    assoc.inSuper = !assoc.inSuper;
                    if (assoc.inSuper == false && assoc.inSub == true) {
                        assoc.inSub = false;
                        console.log(`Forced subset deselection!`);
                    }
                }
                else if (event.button == 2) {//Right Click Or alternative input.
                    C.result.subElements = [];
                    if (assoc.inSuper == true) {    //Confirm that element is in superset.
                        assoc.inSub = !assoc.inSub;
                    }
                    else {
                        console.error(`Element ${assoc.value} is not in superset, and therefore cannot be a subset!`)
                    }
                }
                C.result.updater();
            });
            ct++;
        })
        console.log(`Event Listeners attached to ${ct} instances of ${className} class!`);
    }
    else {
        console.error(`No elements found with class name '${className}'.`);
    }
}



/**
 * Creates inputs that store their submitted values.
 * @param {string} parent
 * @param {object} inputs {name: str, type: str, callback: function}
 */
function DataCollect (parent,...inputs) {
    this.data = inputs;
    let t = document.createElement('table');
    let labels = document.createElement('tr');
    let ins = document.createElement('tr');
    let display = document.createElement('tr');
    for (let a = 0; a < this.data.length; a++) {  
        this.data[a]['value'] = null;
        this.data[a]['callback']? this.data[a].callback : null;
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
                    document.getElementById('drawing').innerHTML = '';  //Clear Drawing!
                    if (this.data[a].type == 'text') {
                        let regex = /[0-9]+/ig;
                        let temp = cellIn.value.match(regex);
                        this.data[a].value = temp.map(x => parseInt(x));
                    }
                    else if (this.data[a].type == 'number') {
                        this.data[a].value = parseFloat(cellIn.value);
                    }
                    else {
                        this.data[a].value = cellIn.value;
                    }
                    let special = typeof this.data[a].value == 'object'? `[${this.data[a].value}]` : `${this.data[a].value}`; //Determine if type of data is array.
                    assocValue.innerHTML = special;
                    this.result = new Shape.myPolygon(this.data[a].value,175,true);
                    console.log(`this.result reinstantiated!`)
                    let supComp = this.data.find(key => key.name == 'superset complement');
                    supComp['callback'] = this.result.complement;
                    if (supComp['listener']) {
                        supComp.htmlElements.removeEventListener('mousedown',supComp['listener'])
                    }
                    supComp['listener'] = () => supComp.callback('superset');
                    supComp.htmlElements.addEventListener('mousedown',supComp['listener']);
                    let subComp = this.data.find(key => key.name == 'subset complement');
                    subComp['callback'] = this.result.complement;
                    if (subComp['listener']) {
                        subComp.htmlElements.removeEventListener('mousedown',subComp['listener']);
                    }
                    subComp['listener'] = () => subComp.callback('subset');
                    subComp.htmlElements.addEventListener('mousedown',subComp['listener']);
                    let clr = this.data.find(key => key.name == 'full clear');
                    clr['callback'] = this.result.specClear;
                    if (clr['listener']) {
                        clr.htmlElements.removeEventListener('mousedown',clr['listener']);
                    }
                    clr['listener'] = () => clr.callback('full');
                    clr.htmlElements.addEventListener('mousedown',clr['listener']);
                    this.data[a].htmlElements = cellIn;
                    let symm = this.data.find(key => key.name == 'symmetry');
                    symm['callback'] = this.result.drawSymmetry;
                    if (symm['listener']) {
                        symm.htmlElements.removeEventListener('mousedown',symm['listener']);
                    }
                    symm['listener'] = () => symm.callback('subset');
                    symm.htmlElements.addEventListener('mousedown',() => {
                        let findEm = document.querySelectorAll('.subsetsymmetry');
                        if (findEm.length == 0) {
                            symm['listener']();
                        }
                        else {
                            findEm.forEach(line => {
                                line.remove();
                            })
                        }
                    });
                   }
            })
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

/**
 * Creates an object allowing for clickable descriptions.
 * @param {HTMLElement} element 
 * @param {string} description 
 */
function Description(element,description) {
    this.element = element;
    this.description = description;
    this.element.setAttribute('class','clickable');
    let desc = document.createElement('div');
    desc.setAttribute('class','description');
    let prompt = document.createElement('div');
    prompt.setAttribute('class','prompt');
    prompt.innerHTML = `...`;
    desc.innerHTML = this.description;
    element.appendChild(prompt);
    element.appendChild(desc);
    let visible = false;
    prompt.addEventListener('mousedown',() => {
        visible = !visible;
        console.log(`${element} description visibile?: ${visible}`);
        visible == true? desc.style.display = `block` : desc.style.display = `none`;
    });
}

let C;

document.addEventListener('DOMContentLoaded',() => {
    console.log('DOM Loaded!')
    C = new DataCollect('inputs',{name: 'universe',type: 'number',description: 'The number of elements in a given modular universe.'},
        {name: 'superset complement',type: 'button',description: 'The opposite collection of the current selected superset. Includes all disincluded elements and disincludes all included elements.'},
        {name: 'subset complement',type: 'button',description: 'The opposite collection of the current selected subset within the current superset. Includes all disincluded elements and disincludes all included elements.'},
        {name: 'full clear',type: 'button',description: 'Clears the entire modular structure.'},
        {name: 'symmetry',type: 'button',description: 'Show the axis of symmetry of the input subset.'}
    );
})

//USE THE THING!!!
//TARGET Conference. FOCUS THE PAPER
//WORKSHOP.

//IRB from UNIVERSITY

//Spatial arrangement of elements. Have intuitive reference Circle of 5ths and PC clock differences.

//Figure out the redraw order...

//All partition arrays! Andrew Mead

//Elliot Carter//Babbitt, Martino

//Analyst Composer Teacher 

//Applications, (Analysis) Cohn

//Bazayev OUT 