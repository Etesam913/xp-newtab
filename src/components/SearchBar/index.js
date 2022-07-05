import React from "react";
import styled from "styled-components";
import { FlexContainer } from "../../styles/Layout";
import { MagnifyingGlass } from "../SvgMaster";
import { replaceDesiredWindowItem } from "../../functions/helpers";
import { handleDelete } from "../Window/helper";
import { useStore } from "../../Store";

function SearchBar({ windowItem, windowObj }) {
  const windowData = useStore((state) => state.windowData);
  const setWindowData = useStore((state) => state.setWindowData);

  const isEditModeOn = useStore((store) => store.isEditModeOn);
  function handleDropdown(e) {
    const dropdownValue = e.target.value;
    let tempWindowData = [...windowData];
    let tempWindowObj = { ...windowObj };
    let tempWindowItem = { ...windowItem };
    tempWindowItem["engine"] = dropdownValue;
    if (dropdownValue === "Google") {
      tempWindowItem["action"] = "https://www.google.com/search";
    } else if (dropdownValue === "DuckDuckGo") {
      tempWindowItem["action"] = "https://www.duckduckgo.com";
    } else if (dropdownValue === "Bing") {
      tempWindowItem["action"] = "https://www.bing.com/search";
    }
    replaceDesiredWindowItem(tempWindowObj["items"], tempWindowItem);
    replaceDesiredWindowItem(tempWindowData, tempWindowObj);
    setWindowData(tempWindowData);
  }

  return (
    <SearchForm method="get" action={windowItem["action"]}>
      <FlexContainer alignItems="center">
        <SearchInput
          type="text"
          name="q"
          placeholder={"Search " + windowItem["engine"]}
        />
        <SearchButton>
          <MagnifyingGlass />
        </SearchButton>
      </FlexContainer>
      {isEditModeOn && (
        <FlexContainer
          justifyContent="space-between"
          alignItems="center"
          margin="0.5rem 0 0"
        >
          <span>
            <label htmlFor="search-engine">Search Engine:</label>

            <SearchDropdown
              id="search-engine"
              onChange={handleDropdown}
              value={windowItem["engine"]}
            >
              <option>Google</option>
              <option>DuckDuckGo</option>
              <option>Bing</option>
            </SearchDropdown>
          </span>
          <button
            type="button"
            onClick={() => {
              handleDelete(
                windowData,
                setWindowData,
                windowObj,
                windowItem["id"]
              );
            }}
          >
            Delete
          </button>
        </FlexContainer>
      )}
    </SearchForm>
  );
}

const SearchForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 1.8rem !important;
  padding: 0.15rem 1.6rem 0.15rem 0.25rem;
  box-sizing: content-box;
  font-size: 0.9rem;
`;

const SearchButton = styled.button`
  border: 0;
  padding: 0;
  background: transparent;
  box-shadow: none !important;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  :hover {
    background: transparent;
  }

  :active {
    background: transparent !important;
    padding: 0 !important;
  }

  :focus {
    background: transparent;
    outline: 0 !important;
  }

  position: absolute;
  right: 1.25rem;
  min-width: 0;
  min-height: 0;
  width: 16px !important;
  height: 16px !important;
`;

const SearchDropdown = styled.select`
  width: min-content;
  margin-left: 0.35rem;
`;
export default SearchBar;
