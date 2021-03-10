import React, {useContext} from 'react'
import {Header1} from "../../styles/Headers";
import {convertJustifyContentToTextAlign, getDesiredItem} from "../../functions/helpers";
import {AppContext} from "../../Contexts";
import {FlexContainer} from "../../styles/Layout";
import {TextAlignOptions} from "../ComponentOptions";
import {changeItemProperty} from "../Window/helper";


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
        <>
            {isMenuShowing
                ?
                <div>
                    <FlexContainer margin={'0 0 .5rem 0'}>
                        <TextAlignOptions item={item} windowItem={windowItem}/>
                    </FlexContainer>
                    <Header1
                        as={'input'}
                        width={'100%'}
                        value={item["text"]}
                        textAlign={convertJustifyContentToTextAlign(item["justifyContent"])}
                        margin={'0'}
                        onChange={(e) => {
                            changeItemProperty(
                                windowItem,
                                windowData,
                                setWindowData,
                                item,
                                "text",
                                e.target.value
                            )
                        }}
                    />
                </div>

                :
                <Header1
                    width={'100%'}
                    margin={'0'}
                    textAlign={convertJustifyContentToTextAlign(item["justifyContent"])}
                >
                    {item["text"]}
                </Header1>
            }
        </>
    )
}

export default Header