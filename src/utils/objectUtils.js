export function equipDefaultProp(sourceObj, propName, defaultPropVal) {
    /*
    https://stackoverflow.com/questions/6600868/set-default-value-of-javascript-object-attributes
     */
    let obj = Object.assign({}, sourceObj);
    if (!obj.hasOwnProperty(propName)) {
        obj[propName] = defaultPropVal;
    }
    return obj;
}

export function keepSpecifiedPropsOnly(sourceObj, propList) {
    // remove all the props of the object that are not in the propList
    let obj = Object.assign({}, sourceObj);
    let objProps = Object.keys(obj);
    for (let i = 0; i < objProps.length; i++) {
        if (propList.indexOf(objProps[i]) == -1) {
            //remove prop if it is not in propList
            delete obj[objProps[i]];
        }
    }
    return obj;
}