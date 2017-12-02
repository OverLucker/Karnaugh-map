const toFixed = (val=0, k=10) => Math.floor(val*k)/k;

export default (val=0, param=2) => {
    param = Math.pow(10, param);
    val = Number(val);
    if(isNaN(val)){
        return 'Invalid Value';
    }
    const postFixes = ['', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'];
    const tier = Math.log10(val) / 3 | 0;

    if(tier == 0) return toFixed(val, param);

    const prefix = postFixes[tier] || '';
    const scale = Math.pow(10, tier * 3);

    const scaled = val / scale;

    return toFixed(scaled, param) + prefix;
};