import React, {useState, useContext} from 'react'
import styled from 'styled-components'
import {ResizableBox} from 'react-resizable'
import "react-resizable/css/styles.css";
import {FlexContainer} from "../../styles/Layout";
import {TextAlignOptions} from "../ComponentOptions";
import {AppContext} from "../../Contexts";

function Image({windowItem, item}) {
    const [imageWidth, setImageWidth] = useState(300);
    const [imageHeight, setImageHeight] = useState(175);
    const {isMenuShowing} = useContext(AppContext);

    function onResize(e, {element, size, handle}) {
        setImageWidth(size.width)
        setImageHeight(size.height);
    }

    function handleOptions() {
        if (isMenuShowing) {
            return <TextAlignOptions item={item} windowItem={windowItem}/>
        }
    }

    // TODO: Get window size so that image can be resized correctly if the window size is changed.

    return (
        <div>
            <FlexContainer margin={isMenuShowing ? '0 0 .5rem 0' : '0'}>
                {handleOptions()}

            </FlexContainer>
            <FlexContainer justifyContent={item["justifyContent"]}>
                <ResizableBox
                    width={imageWidth}
                    height={imageHeight}
                    onResize={onResize}
                    maxConstraints={[350, 500]}
                    lockAspectRatio
                    resizeHandles={isMenuShowing ? item["justifyContent"] === 'flex-end' ? ['sw'] : ['se'] : []}
                >
                    <ImageComponent src={item["src"]} width={imageWidth} height={imageHeight}/>
                </ResizableBox>

            </FlexContainer>
        </div>
    );
}

const ImageComponent = styled.img`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
`;

export default Image;