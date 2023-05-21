import React, { useEffect, useRef, useState } from "react";
import { v4 } from "uuid";
import { AiOutlineFile } from "react-icons/ai";

import { StyledLeaf, StyledContainer } from "./Tree.style";
import { ContainerName } from "./TreeContainer";

const PlaceholderInput = ({
  type,
  name,
  folderLevel,
  handleSubmit,
  defaultValue,
  style
}) => {
  const [ext, setExt] = useState("");
  const inputRef = useRef();

  const updateExt = e => {
    let splitted = e.target.value.split(".");
    let ext = splitted && splitted[splitted.length - 1];
    setExt(ext);
  };

  useEffect(() => {
    if (!inputRef.current) return;
    inputRef.current.focus();
    inputRef.current.addEventListener("keypress", e => {
      if (e.key === "Enter") {
        handleSubmit(e.target.value);
      }
      if (e.key === "Esc") {
        return;
      }
    });
  }, [inputRef, handleSubmit]);

  return type === "file" ? (
    <StyledLeaf className="tree__file" style={style}>
      {/* {FILE_ICONS[ext] ? FILE_ICONS[ext] : <AiOutlineFile />}
      &nbsp;&nbsp; */}
      <input
        className="tree__input"
        defaultValue={defaultValue}
        ref={inputRef}
        onChange={updateExt}
      />
    </StyledLeaf>
  ) : (
    <StyledContainer id={v4()} name={name} indent={folderLevel + 1} style={style}>
      <ContainerName
        isOpen={true}
        handleClick={() => {}}
        name={
          <input
            ref={inputRef}
            className="tree__input"
            defaultValue={defaultValue}
          />
        }
      />
    </StyledContainer>
  );
};

export { PlaceholderInput };
