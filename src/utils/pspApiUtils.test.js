import {fetchPspLabelData} from './csvUtils.js'
it('tests the psp api label fetch function', async () => {
    const res = await fetchPspLabelData('http://localhost:61238/api/psp?label=gujarat_thermal_mu&from_time=20180810&to_time=20180818');
    console.log(res);
    expect(res).not.toBeUndefined();
    expect(res.xVals).not.toBeUndefined();
    expect(res.yVals).not.toBeUndefined();
    expect(res.xLabels).not.toBeUndefined();
    console.log(res);
});