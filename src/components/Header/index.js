import React, {useContext, useState, useRef} from 'react'
import {Header1} from "../../styles/Headers";
import {convertJustifyContentToTextAlign, getSelectionText} from "../../functions/helpers";
import {AppContext} from "../../Contexts";
import {FlexContainer} from "../../styles/Layout";
import {TextAlignOptions, LinkOptions} from "../ComponentOptions";
import {changeItemProperty} from "../Window/helper";


function Header({windowItem, item}) {
    const {windowData, setWindowData, isMenuShowing} = useContext(AppContext);
    const [isTextSelected, setIsTextSelected] = useState(false);
    const header = useRef(null);

    function createLink(e) {
        if (getSelectionText() !== "") {
            setIsTextSelected(true)

        } else {
            setIsTextSelected(false)
        }
    }

    function handleOptions(){
        if(isMenuShowing){
            if(isTextSelected)
                return <LinkOptions setIsTextSelected={setIsTextSelected}/>
            else
                return <TextAlignOptions item={item} windowItem={windowItem}/>
        }
    }

    return (
        <div>
            <FlexContainer margin={'0 0 .5rem 0'}>
                {handleOptions()}
            </FlexContainer>
            <Header1
                ref={header}
                tabIndex={0}
                key={"header-" + windowItem["id"] + "-" + item["id"]}
                as={'h1'}
                contentEditable={isMenuShowing ? 'true' : 'false'}
                width={'100%'}
                onClick={(e) => {
                    createLink(e)
                }}
                onBlur={()=>{changeItemProperty(
                    windowItem,
                    windowData,
                    setWindowData,
                    item,
                    "text",
                    header.current.innerText
                )}}
                textAlign={convertJustifyContentToTextAlign(item["justifyContent"])}
                margin={'0'}
                suppressContentEditableWarning={true}
            >{item["text"]}</Header1>
        </div>
    )
}

export default Header