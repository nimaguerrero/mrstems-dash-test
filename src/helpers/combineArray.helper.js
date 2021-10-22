const combineArrayCount = (series) => {
    // name y value por defecto
    let dup = [];
    let nuevoObjeto = {};
    series.forEach((d, i, ds) => {
        dup[i] = d.value;
        !nuevoObjeto.hasOwnProperty(d.name)
            ? (nuevoObjeto[d.name] = dup[i])
            : (nuevoObjeto[ds[i - 1].name] = dup[i - 1] + dup[i]);
    });
    Object.keys(nuevoObjeto).forEach((k, i) => (series[i].name = k));
    Object.values(nuevoObjeto).forEach((k, i) => (series[i].value = k));
    const lengthborrar = Number(
        series.length - Object.keys(nuevoObjeto).length
    );
    for (let i = 0; i < lengthborrar; i++) {
        series.pop();
    }
    return series;
};

module.exports = { combineArrayCount };
