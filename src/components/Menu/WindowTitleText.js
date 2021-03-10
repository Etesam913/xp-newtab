import React, {useState} from 'react';
import styled from 'styled-components';
import {updateWindowTitle, handleEnter} from './helper';
import {setHidden} from "../Window/helper";

function WindowTitleText({text, id, windowData, windowItem, disabled, setWindowData}) {
    const [isEditing, setIsEditing] = useState(false);

    return (
        <li>
            {isEditing ? (
                <WindowInput
                    defaultValue={text}
                    autoFocus
                    onKeyDown={(e) => {
                        handleEnter(e, id, windowData, setWindowData, setIsEditing);
                    }}
                    onBlur={(e) => {
                        setIsEditing(false);
                        updateWindowTitle(e.target.value, id, windowData, setWindowData);
                    }}
                />
            ) : (
                <WindowTitle
                    disabled={disabled}
                    onClick={() => {
                        !disabled && setIsEditing(true);
                        disabled && setHidden(windowData, setWindowData, windowItem, false)
                    }}
                >
                    {text ? text : '*ERROR NO TEXT SHOWN*'}
                </WindowTitle>
            )}
        </li>
    );
}

const WindowTitle = styled.p`
  cursor: ${props=>props.disabled ? "pointer" : "text"};
  margin: 0.35rem 0 !important;
  color: ${props => props.disabled ? 'gray' : 'black'};
  font-size: 0.75rem;
`;

const WindowInput = styled.input`
  width: 5.5rem;
  height: 0.75rem;
  margin-top: 0rem;
`;

export default WindowTitleText;
