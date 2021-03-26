import React, {useContext} from 'react';
import Toggle from "../Toggle";
import {StartItemIcon, StartItemName} from "./styles";
import {FlexContainer} from "../../styles/Layout";
import {AppContext} from "../../Contexts";
import controlPanelImg from "../../media/control-panel-icon.jpg";
import newWindowImg from '../../media/new-window-icon.png';
import {addWindowItem} from "../../functions/helpers";

export function EditModeItem() {
    const {isMenuShowing, setIsMenuShowing} = useContext(AppContext);

    return (
        <FlexContainer
            onClick={() => {
                setIsMenuShowing(!isMenuShowing)
            }}
            width={"max-content"}
            cursor={"pointer"}
            padding={"0.5rem"}
            justifyContent={"flex-start"}>
            <Toggle stateVal={isMenuShowing}/>
            <StartItemName>Edit Mode</StartItemName>
        </FlexContainer>
    );
};

export function SettingsItem({setIsStartWindowShowing}) {
    const {setIsSettingsShowing} = useContext(AppContext);
    return (
        <FlexContainer
            cursor={"pointer"}
            padding={"0.5rem"}
            justifyContent={"flex-start"}
            width={"max-content"}
            onClick={() => {
                setIsSettingsShowing(true);
                setIsStartWindowShowing(false);
            }}
        >
            <StartItemIcon src={controlPanelImg}/>
            <StartItemName>Settings</StartItemName>
        </FlexContainer>
    );
}

export function CreateWindowItem() {
    const {windowData, setWindowData, setFocusedWindow} = useContext(AppContext);
    return (
        <FlexContainer
            cursor={"pointer"}
            padding={"0.5rem"}
            justifyContent={"flex-start"}
            width={"max-content"}
            onClick={() => {
                addWindowItem(windowData, setWindowData, setFocusedWindow)
            }}
        >
            <StartItemIcon width={"32px"} height={"32px"} src={newWindowImg}/>
            <StartItemName>Create A New Window</StartItemName>
        </FlexContainer>
    );
}



