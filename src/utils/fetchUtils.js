export async function fetchScadaData(dataUrl) {
    try {
        const resp = await fetch(dataUrl);
        //console.log(resp);
        const jsonResp = await resp.json();
        //console.log(jsonResp);
        let result = {};
        if (jsonResp.length === undefined) {
            return { xVals: [], yVals: [], xLabels: [] };
        }
        // we assume that the first column is timestamp
        let xVals = [];
        let yVals = [];
        let xLabels = [];
        for (let rowIter = 0; rowIter < jsonResp.length; rowIter++) {
            const row = jsonResp[rowIter];
            xVals[rowIter] = Number(row['timestamp']);
            xLabels[rowIter] = row['timestamp'];
            yVals[rowIter] = Number(row['dval']);
        }
        result.xVals = xVals;
        result.yVals = yVals;
        result.xLabels = xLabels;
        return result;
    } catch (e) {
        console.log(e);
        return {};
    }
}