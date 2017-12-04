export class Term{
    constructor(decimal, length){
        decimal = parseInt(decimal);
        this.length = length;
        this.decimal = decimal;
        function toBin(){
            return decimal.toString(2).padStart(length, "0");
        }
        this.bin = toBin();
        return this;
    }

    format = formatter => {
        return formatter.format(this.bin);
    }
}

export class Implication{
    constructor(implication){
        this.implication = implication;
    }

    constitute = () => {

        const constitute = implication => {
            const Xi = implication.implication.indexOf('X');
            if (Xi >= 0){
                const zero_implications = constitute(implication.replace(Xi, 0));
                const one_implications = constitute(implication.replace(Xi, 1));
                return zero_implications.concat(one_implications);
            }
            return [implication];
        };

        return constitute(this);
    };

    replace = (pos, value) => {
        return new Implication(this.implication.slice(0, pos) + value + this.implication.slice(pos + 1));
    };

    toDec = () => {
        if (this.implication.indexOf('X') >= 0){
            return NaN;
        }
        return parseInt(this.implication, 2);
    };

    format = formatter => {
        return formatter.format(this.implication);
    }
}

export class SumOfProducts{
    constructor(implications){
        this.implications = implications;
    }

    coverage = () => {
        const coverage = [];
        terms_dec.forEach(function(item) {
            coverage[item] = [];
        });

        possible_implicants.forEach(function(implicant) {
            let pos_terms = constitute(implicant);
            let pt_dec = pos_terms.map( (x) => bin2dec(x) );
            implications[implicant] = pt_dec;
            pt_dec.forEach(function(item) {
                coverage[item].push(implicant);
            });
        });
    };

    prime = () => {
        coverage = this.coverage();
    };
}

export const bin2dec = bin => parseInt(bin, 2);

export const bin2dec_array = array => {
    const dec_array = [];
    for (let i = 0; i < array.length; i++) {
        dec_array.push(bin2dec(array[i]));
    }
    return dec_array;
};

export const find_possible_implicants = array => {
    const implicants = [];
    implicants[0] = array.slice();
    for (let x = 0; x < array[0].length; x++) {
        remove_duplicates(implicants[x]);
        const current_coloumn = implicants[x].slice();
        const next_coloumn = [];
        for (let i = 0; i < implicants[x].length; i++) {
            for (let j = i+1; j < implicants[x].length; j++) {
                remove_duplicates(implicants[x]);
                const implicant = find_implicant(implicants[x][i],implicants[x][j]);
                if (implicant) {
                    remove_item(current_coloumn,implicants[x][i]);
                    remove_item(current_coloumn,implicants[x][j]);
                    next_coloumn.push(implicant);
                }
            }
        }
        remove_duplicates(next_coloumn);
        implicants[x] = current_coloumn.slice();
        if (next_coloumn.length) {
            implicants[x+1] = next_coloumn;
        } else {
            return implicants;
        }
    }
    return implicants;
};

export const find_implicant = (bin1,bin2) => {
    let differences = 0;
    let indexOfDifference = undefined
    for (let i = 0; i < bin1.length; i++)
    {
        if (!(bin1[i] === bin2[i]))
        {
            differences += 1;
            indexOfDifference = i;
        }
        if (differences > 1)
        {
            return false;
        }
    }
    return replace_item(bin1,indexOfDifference,"X");
};

export const replace_item = (string,index,new_item) => string.slice(0,index) + new_item + string.slice(index+1);

export const remove_item = (array,item) => {
    const index_for_removal = array.indexOf(item);
    if (index_for_removal !== -1) {
        array.splice(index_for_removal,1);
    }
    return array;
};

export const remove_duplicates = array => {
    for (let i = 0; i < array.length; i++) {
        while (array.slice(i+1,array.length).indexOf(array[i]) !== -1) {
            array.splice(i,1);
        }
    }
    return array;
};

export const change_from_2D_to_1D = array => {
    const new_array = [];
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array[i].length; j++) {
            new_array.push(array[i][j]);
        }
    }
    return new_array;
}

export const min_term2max_term = (string) => {
    const terms = string.split(' ');
    let outString = '(';
    for (let i = 0; i < terms.length; i++) {
        if (terms[i] !== '') {
            if (i !== terms.length-1) {
                outString += terms[i] + '+';
            }
            else {
                outString += terms[i];
            }
        }
    }
    if (outString[outString.length - 1] === "+") {
        outString = outString.slice(0, -1);
    }

    outString += ')';
    return outString;
}

export function constitute(term) {
    const Xi = term.indexOf('X');
    if (Xi >= 0){
        const zero_terms = constitute(replace_item(term, Xi, 0));
        const one_terms = constitute(replace_item(term, Xi, 1));
        return zero_terms.concat(one_terms);
    }
    return [term];
}

export class MinTermFormatterWordStyle{
    constructor(alphabets, inverse_symbol){
        this.alphabets = alphabets;
        return this;
    }

    literal = (value, lit) => {
        if (value === 'X')
            return '';

        if (value === '1')
            return lit;

        if (value === '0')
            return '\\overline (' + lit + ')';
    };

    format = term => {
        let res = "";
        term = Array.from(term);
        let obj = this;
        res = term.map( (x, i) => obj.literal(x, obj.alphabets[term.length - i - 1] ) )
            .reduce( (x, y) => x ? (x + (y ? "\t⋅\t" + y : y)) : y );
        return !res ? '1' : res;
    };
}

export class MinTermFormatter{
    constructor(alphabets, inverse_symbol){
        this.alphabets = alphabets;
        return this;
    }

    literal = (value, lit) => {
        if (value === 'X')
            return '';

        if (value === '1')
            return lit;

        if (value === '0')
            return '\\overline {' + lit + '} ';
    };

    format = (term) => {
        let res = "";
        term = Array.from(term);
        let obj = this;
        res = term.map( (x, i) => obj.literal(x, obj.alphabets[term.length - i - 1] ) )
            .reduce( (x, y) => x ? (x + (y ? " \\cdot " + y : y)) : y );
        return !res ? '1' : res;
    };
}

export const SOPtoString = (sop, formatter) => sop.map( (x) => x.format(formatter) ).reduce( (x, y) => x + ' + ' + y );
export const SOPtoString2 = (sop, formatter) => sop.map(formatter.format).reduce( (x, y) => x + ' + ' + y );

export const essential = coverage => coverage.filter( (x) => x.length === 1 ).map( (x) => x[0] );

export function* merge(setA, setB) {
    for (let a of setA.values()) {
        yield a;
    }
    for (let b of setB.values()) {
        if (setA.has(b))
            continue;
        yield b;
    }
}

export function* exclude(setA, setB) {
    for (let a of setA.values()) {
        if (setB.has(a))
            continue;
        yield a;
    }
}

export const find_solution = (possible_implicants, terms_dec) =>{
    // prepare data
    const implications = {};
    // prepare coverage array
    const coverage = [];
    terms_dec.forEach(item => coverage[item] = []);

    possible_implicants.forEach(implicant => {
        let pos_terms = constitute(implicant);
        let pt_dec = pos_terms.map(bin2dec);
        implications[implicant] = pt_dec;
        pt_dec.forEach(item => {
            coverage[item].push(implicant);
        });
    });

    const not_covered = new Set(terms_dec);
    const core = new Set(essential(coverage));
    core.forEach(function(implication){
        // remove every node covered by core
        const covered_by_core = implications[implication];
        for (let i in covered_by_core){
            not_covered.delete(covered_by_core[i]);
        }
    });

    console.log('core ' + Array.from(core).join(" "));

    function cover(implication, coverage) {
        const covered = implications[implication];
        return new Set(exclude(coverage, new Set(covered)));
    }

    function* search_tupic(node, coverage, uncovered) {
        for (let [num, implication] of coverage[node].entries()){
            if (core.has(implication)){
                continue;
            }
            let new_route = new Set();
            new_route.add(implication);
            let new_coverage = cover(implication, uncovered);
            if (new_coverage.size > 0) {

                let next_node = new_coverage.values().next().value;
                for (let next_hop of search_tupic(next_node, coverage, new_coverage)){
                    yield new Set(merge(new_route, next_hop));
                }
            }else{
                // covered every cell
                yield new_route;
            }
        }
    }


    if (!not_covered.size) {
        return {
            'core' : core,
            'solutions' : []
        };
    }

    let route_pool = {};
    for (let route of search_tupic(not_covered.values().next().value, coverage, not_covered)){
        const sroute = Array.from(route).sort();
        let result_string = sroute.reduce((x, y) => x + " " + y );
        if (!route_pool[result_string]){
            route_pool[result_string] = route;
        }
    }

    function issubset(setA, setB){
        let result = true;
        setA.forEach(function(item){
            if (!setB.has(item)) {
                result = false;
            }
        });
        return result;
    }

    let keys = Object.keys(route_pool);
    for (let [num1, val1] of keys.entries()){
        for (let [num2, val2] of keys.entries()) {
            if (val1 != val2
                && route_pool[val1] !== undefined
                && route_pool[val2] !== undefined
                && issubset(route_pool[val1], route_pool[val2])
            ){
                delete route_pool[val2];
            }
        }
    }

    console.log(Object.keys(route_pool).length);
    console.log(route_pool);
    return {
        'core' : core,
        'solutions':route_pool
    };
};

export const create_truth_table = (no_of_variables) => {
    let outString = '';

    const no_of_rows = Math.pow(2,no_of_variables);
    const dec_array = [];
    for (let i = 0; i < no_of_rows; i++) {
        dec_array.push(i);
    }
    const bin_array = dec2bin_array(dec_array,null);
    outString += '<table>';
    outString += '<tr>';
    for (i = 0; i < no_of_variables; i++) {
        outString += '<th>' + alphabets[i] + '</th>';
    }
    outString += '<th>Output</th>';
    outString += '</tr>';

    for (let i = 0; i < no_of_rows; i++) {
        outString += '<tr>';
        var binary_for_row = bin_array[i];
        for (var j = 0; j < no_of_variables; j++) {
            outString += '<td>' + binary_for_row[j] + '</td>';
        }
        outString += '<td><select id="' + dec_array[i] + '"><option>0</option><option>1</option><option>X</option></select></td>';
        outString += '</tr>';
    }
    outString += '</table>';
    return outString;
};
