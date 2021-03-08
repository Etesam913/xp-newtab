export function getDefaultValue(localStorageProperty){
    let defaultValue = false;
    if(localStorageProperty === 'backgroundColor')
        defaultValue = "#ffffff"
    if(localStorageProperty === 'backgroundImage')
        defaultValue = ""
    const propertyValue = window.localStorage.getItem(localStorageProperty)
    if(propertyValue !== null)
        defaultValue = propertyValue;
    return defaultValue
}