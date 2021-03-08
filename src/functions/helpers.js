export function getDefaultValue(localStorageProperty){
    let defaultValue = false;
    if(localStorageProperty === 'backgroundColor')
        defaultValue = "white"

    const propertyValue = window.localStorage.getItem(localStorageProperty)
    if(propertyValue !== null)
        defaultValue = propertyValue;
    return defaultValue
}