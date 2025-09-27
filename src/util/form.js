export function generateFormData(json) {
    const formData = new FormData();

    for (const key of Object.keys(json)) {        
        formData.set(key, json[key])
    }

    return formData;
}