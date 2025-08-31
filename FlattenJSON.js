function FlattenJSONObject(jsonObj, addNestedNames=true) {
    const result = {};

    function ProcessValue(value, name) {
        if (Array.isArray(value)) {
            ProcessArray(value, name);
        }
        else if (typeof value === 'object' && value !== null) {
            ProcessObject(value, name);
        } else {
            result[name] = value;
        }
    }

    function ProcessObject(obj, name) {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const newName = name ? `${addNestedNames ? `${name}_` : ''}${key}` : key;
                ProcessValue(obj[key], newName);
            }
        }
    }

    function ProcessArray(arr, name) {
        arr.forEach((item, index) => {
            const newName = `${addNestedNames ? name : ''}${index}`;
            ProcessValue(item, newName);
        });
    }

    if (Array.isArray(jsonObj)) {
        jsonObj.forEach((item, index) => {
            ProcessValue(item, `${index}`);
        });
    }
    else if (typeof jsonObj === 'object' && jsonObj !== null) {
        for (const key in jsonObj) {
            if (jsonObj.hasOwnProperty(key)) {
                ProcessValue(jsonObj[key], key);
            }
        }
    }
    else {
        throw new Error("Input must be a JSON object or array");
    }

    return result;
}