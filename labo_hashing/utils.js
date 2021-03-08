
const time = (f) => {
    return (...params) => {
        let start = (new Date()).getTime()
        let result = f(...params);
        let end = (new Date()).getTime()

        console.log(`[DEBUG] ${f.name}(${[...params]}) took ${end - start} ms`);

        return result;
    }
}

exports.time = time;