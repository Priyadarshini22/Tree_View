import React, { useState, useEffect } from "react";
import {
  AiOutlineFolderAdd,
  AiOutlineFileAdd,
  AiOutlineFolder,
  AiOutlineFolderOpen,

} from "react-icons/ai";
import {
  ActionsWrapper,
  Collapse,
  StyledContainer,
  StyledLeaf,StyledName} from "./Tree.style";
import { useTreeContext } from "./TreeContext";
import { PlaceholderInput } from "./TreePlaceholderInput";

const ContainerName = ({ isOpen, name, handleClick }) => (
  <StyledName onClick={handleClick}>
    {isOpen ? <AiOutlineFolderOpen /> : <AiOutlineFolder />}
{name}
  </StyledName>
);

const Container = ({ id, name, level, children, parentPath }) => {
  const { state, dispatch, isImparative, onNodeClick } = useTreeContext();
  const [isEditing, setEditing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [childs, setChilds] = useState([]);


  useEffect(() => {
    const nestedChilds = React.Children.map(children, item => {
      if (item.type === Container) {
        return React.cloneElement(item, {
          level: level + 1,
          parentPath: `${parentPath}/${name}`
        });
      }
      return item;
    });
    setChilds(nestedChilds);
  }, [children]);

  const handleFileCreation = event => {
    event.stopPropagation();
    setIsOpen(true);
    setChilds([
      ...childs,
      <PlaceholderInput
        type="leaf"
     
      />
    ]);
  };

  const handleFolderCreation = event => {
    event.stopPropagation();
    setIsOpen(true);
    setChilds([
      ...childs,
      <PlaceholderInput
        type="container"
        folderLevel={level}
        handleSubmit={name => {
          dispatch({ type: "CREATE_FOLDER", payload: { id, name } });
        }}
      />
    ]);
  };


  return (
    <StyledContainer
      onClick={event => {
        event.stopPropagation();
        onNodeClick({
          state,
          name,
          level,
          path: `${parentPath}/${name}`,
          type: "container"
        });
      }}
      className="tree__folder"
      indent={level}
    >
        <ActionsWrapper>
          {isEditing ? (
            <PlaceholderInput
              type="container"
              style={{ marginLeft: 0 }}
              folderLevel={level - 2}
              defaultValue={name}
            
            />
          ) : (
            <ContainerName
              name={name}
              isOpen={isOpen}
              handleClick={() => setIsOpen(!isOpen)}
            />
          )}

          {isImparative && (
            <div className="actions">
              <AiOutlineFileAdd onClick={handleFileCreation} />
              <AiOutlineFolderAdd onClick={handleFolderCreation} />
            </div>
          )}
        </ActionsWrapper>
        <Collapse className="tree__folder--collapsible" isOpen={isOpen}>
          {childs}
        </Collapse>
    </StyledContainer>
  );
};
Container.defaultProps = { level: 1, parentPath: "" };

export { Container, ContainerName };
