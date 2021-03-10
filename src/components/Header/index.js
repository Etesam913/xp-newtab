import React, {useContext} from 'react'
import {Header1} from "../../styles/Headers";
import {getDesiredItem} from "../../functions/helpers";
import {AppContext} from "../../Contexts";

function Header({windowItem, item}) {
    const {windowData, setWindowData, isMenuShowing} = useContext(AppContext);

    function handleChange(e) {
        const windowId = windowItem["id"];
        const textValue = e.target.value;
        let newWindowData = [...windowData];
        // Gets the current window
        let desiredWindow = getDesiredItem(windowData, windowId);
        const items = desiredWindow["items"];
        // Gets the current item
        let desiredItem = getDesiredItem(items, item["id"]);
        // Changes text of the item to match the new text
        desiredItem["text"] = textValue;
        newWindowData['items'] = items;
        setWindowData(newWindowData);
    }

    return (
        <Header1
            margin={'0'}
            value={item["text"]}
            as={isMenuShowing ? 'input' : 'h1'}
            width={'100%'}
            onChange={(e) => {
                handleChange(e)
            }}
        >
            {isMenuShowing ? null : item["text"]}
        </Header1>
    );
}

export default Header