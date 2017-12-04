import {
    find_possible_implicants,
    change_from_2D_to_1D,
    find_solution,
    SOPtoString2,
    MinTermFormatter,
    MinTermFormatterWordStyle,
    constitute,
    SOPtoString,
    bin2dec_array,
    remove_duplicates,
} from './utils';

export const calculateSOP = (terms, alphabet) => {
    const result = {
        SOPForHuman: '',
        SOPForComputer: '',
        SOPAllForHuman: [],
        SOPAllForComputer: [],
        SOPBestForHuman: '',
        SOPBestForComputer: '',
    };
    let terms_bin = terms.map( (x) => x.bin );
    let possible_implicants = find_possible_implicants(terms_bin);
    possible_implicants = change_from_2D_to_1D(possible_implicants);
    const terms_dec = terms.map( (x) => x.decimal );

    const s = find_solution(possible_implicants, terms_dec);
    let core = Array.from(s['core']);
    let solutions = s['solutions'];
    const keys = Object.keys(solutions);

    let formatter = new MinTermFormatter(alphabet);
    let wformatter = new MinTermFormatterWordStyle(alphabet);

    result.SOPForHuman = SOPtoString2(core, formatter);
    result.SOPForComputer = SOPtoString2(core, wformatter);

    // output Solutions
    if (keys.length > 0){
        const min_route_key = keys.reduce( (x, y) => solutions[x].size <= solutions[y].size ? x : y);
        for (let i in solutions) {
            let SOP = Array.from(solutions[i]);
            result.SOPAllForHuman.push(SOPtoString2(SOP, formatter));
            result.SOPAllForComputer.push(SOPtoString2(SOP, wformatter));
        }

        let check = Array.from(core).map( (x) => bin2dec_array(constitute(x)) ).concat(Array.from(solutions[min_route_key]).map ( (x) => bin2dec_array(constitute(x)) ));
        check = change_from_2D_to_1D(check).map( (x) => parseInt(x) );
        check = remove_duplicates(check).sort();

        result.SOPBestForComputer = SOPtoString2(core.concat(Array.from(solutions[min_route_key])), wformatter);
        result.SOPBestForHuman = SOPtoString2(core.concat(Array.from(solutions[min_route_key])), formatter);

        return result;
    }
};

export const calculateFDNF = (terms, alphabet) => {
    let formatter = new MinTermFormatter(alphabet);
    let wformatter = new MinTermFormatterWordStyle(alphabet);
    return {
        FDNFForHuman: SOPtoString(terms, formatter),
        FDNFForComputer: SOPtoString(terms, wformatter),
    };
};

export default {
    calculateFDNF,
    calculateSOP,
}
