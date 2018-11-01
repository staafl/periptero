
export const Utils = {
    inheritLayoutStyles: (style) =>
        ['paddingLeft', 'paddingTop', 'paddingRight', 'paddingBottom', 'padding',
             'marginLeft', 'marginTop', 'marginRight', 'marginBottom', 'margin',
             'flex', 'height', 'width'].reduce((o,k) => ((style[k] && (o[k] = style[k])), o), {}),
    toObject: (array, keyGetter) => {
        const obj = {};
        let ii = 0;
        for (const entry of array) {
            obj[keyGetter(entry, ii)] = entry;
            ii += 1;
        }
        return obj;
    },
}