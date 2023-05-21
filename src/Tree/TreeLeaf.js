import React, { useRef, useState } from "react";
import { AiOutlineFile} from "react-icons/ai";

import { StyledLeaf } from "./Tree.style";
import { useTreeContext } from "./TreeContext";
import { ActionsWrapper, StyledName } from "./Tree.style.js";
import { PlaceholderInput } from "./TreePlaceholderInput";

const Leaf = ({ name, id, parent }) => {
  const [isEditing, setEditing] = useState(false);
  const { state, dispatch, isImparative, onNodeClick } = useTreeContext();
  const ext = useRef("");

  let splitted = name && name.split(".");
  ext.current = splitted && splitted[splitted.length - 1];

  return (
    <StyledLeaf
      onClick={event => {
        event.stopPropagation();
        onNodeClick({
          state,
          name,
          parent,
          type: "leaf"
        });
      }}
      className="tree__file"
    >
      {isEditing ? (
        <PlaceholderInput
          defaultValue={name}
          type="file"
          style={{ marginLeft: 0 }}
      
        />
      ) : (
        <ActionsWrapper>
          <StyledName>
           
          {name}
          </StyledName>
         
        </ActionsWrapper>
      )}
    </StyledLeaf>
  );
};

export { Leaf };
