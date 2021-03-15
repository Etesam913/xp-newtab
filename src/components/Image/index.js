import React, {useState, useContext, useRef} from 'react'
import styled from 'styled-components'
import {ResizableBox} from 'react-resizable'
import "react-resizable/css/styles.css";
import {FlexContainer} from "../../styles/Layout";
import {TextAlignOptions} from "../ComponentOptions";
import {AppContext} from "../../Contexts";
import {changeItemProperty} from "../Window/helper";

function Image({windowItem, item}) {
    const [imageWidth, setImageWidth] = useState(300);
    const [imageHeight, setImageHeight] = useState(175);
    const [isImageFocused, setIsImageFocused] = useState(false);
    const [isRedirectClicked, setIsRedirectClicked] = useState(false);
    const srcInput = useRef(null);
    const redirectInput = useRef(null);
    const {isMenuShowing, windowData, setWindowData} = useContext(AppContext);

    function onResize(e, {element, size, handle}) {
        setImageWidth(size.width)
        setImageHeight(size.height);
    }

    function handleOptions() {
        function setImageUrl() {
            if (srcInput.current.value.trim() !== '') {
                changeItemProperty(
                    windowItem,
                    windowData,
                    setWindowData,
                    item,
                    "src",
                    srcInput.current.value
                )
                setIsImageFocused(false)
            }
        }

        function setRedirectUrl() {
            if (redirectInput.current.value.trim() !== '') {
                changeItemProperty(
                    windowItem,
                    windowData,
                    setWindowData,
                    item,
                    "href",
                    redirectInput.current.value
                )
                setIsRedirectClicked(false)
            }
        }


        if (!isImageFocused && !isRedirectClicked) {
            return (
                <FlexContainer width={"100%"}>
                    <TextAlignOptions item={item} windowItem={windowItem}/>
                    <OptionsButton>Fit Size To Window</OptionsButton>
                    <OptionsButton
                        width={"125px"}
                        onClick={() => {
                            setIsRedirectClicked(true)
                        }}
                    >
                        Redirect to Website
                    </OptionsButton>
                </FlexContainer>
            );
        } else if (isImageFocused) {
            return (
                <FlexContainer width={"100%"}>
                    <input ref={srcInput} style={{width: "100%"}} placeholder={"Enter image url"}
                           defaultValue={item["src"]}/>
                    <OptionsButton
                        onClick={setImageUrl}
                    >
                        Set Image Url
                    </OptionsButton>
                </FlexContainer>
            );
        } else if (isRedirectClicked) {
            return (
                <FlexContainer width={"100%"}>
                    <input ref={redirectInput} style={{width: "100%"}}
                           placeholder={"Enter website url to redirect to on image click"}
                           defaultValue={item["href"] !== null ? item["href"] : ''}/>
                    <OptionsButton
                        width={"125px"}
                        onClick={setRedirectUrl}
                    >
                        Set Redirect Url
                    </OptionsButton>
                </FlexContainer>
            );
        }
    }


    function handleBlur() {
        // Timeout is needed to allow for enough time to check if the user clicked on the src input after the blur.
        // If they did, do not count that as removing image focus
        setTimeout(function () {
            if (srcInput.current !== document.activeElement) {
                setIsImageFocused(false)
            }
        }, 200)
    }

// TODO: Get window size so that image can be resized correctly if the window size is changed.

    return (
        <div>
            {isMenuShowing &&
            <FlexContainer margin={'0 0 .5rem 0'}>
                {handleOptions()}
            </FlexContainer>
            }

            <FlexContainer justifyContent={item["justifyContent"]}>
                <ResizableBox
                    width={imageWidth}
                    height={imageHeight}
                    onResize={onResize}
                    maxConstraints={[350, 500]}
                    lockAspectRatio
                    resizeHandles={isMenuShowing ? item["justifyContent"] === 'flex-end' ? ['sw'] : ['se'] : []}
                >
                    <ImageWrapper
                        href={isMenuShowing ? null : item["href"]}
                        onFocus={() => {
                            setIsRedirectClicked(false);
                            setIsImageFocused(true);
                        }}
                        onBlur={() => {
                            handleBlur();
                        }}
                        tabIndex={0}
                        width={imageWidth}
                        height={imageHeight}>
                        <ImageComponent src={item["src"]}/>
                    </ImageWrapper>

                </ResizableBox>

            </FlexContainer>
        </div>
    );
}

const ImageComponent = styled.img`
  width: 100%;
  height: 100%;

  :focus {
    border: 1px solid blue;
  }
`;

const OptionsButton = styled.button`
  margin-left: 0.5rem;
  width: ${props => props.width ? props.width : "117px"};
`;

const ImageWrapper = styled.a`
  :focus {
    outline: 2px dotted gray;
  }
;
  display: block;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
`;

export default Image;