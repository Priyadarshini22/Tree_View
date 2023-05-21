import React, { useReducer, useLayoutEffect } from "react";
import { v4 } from "uuid";
import _cloneDeep from "lodash.clonedeep";

import { TreeContext } from "./TreeContext";
import { StyledTree } from "./Tree.style";
import { Container } from "./TreeContainer";
import { Leaf } from "./TreeLeaf";
import {
  searchDFS,
  createLeaf,
  createContainer,
  useDidMountEffect
} from "../utils";

const reducer = (state, action) => {
  let newState = _cloneDeep(state);
  let node = null;
  let parent = null;
  if (action.payload && action.payload.id) {
    let foundNode = searchDFS({
      data: newState,
      cond: item => {
        return item.id === action.payload.id;
      }
    });
    parent = foundNode.parent;
    node = foundNode.item;
  }

  switch (action.type) {
    case "SET_DATA":
      return action.payload;
    case "CREATE_LEAF":
      node.files.push(createLeaf({ name: action.payload.name }));
      return newState;
    case "CREATE_CONTAINER":
      node.files.push(createContainer({ name: action.payload.name }));
      return newState;
    default:
      return state;
  }
};

const Tree = ({ children, data, onNodeClick, onUpdate }) => {
  const [state, dispatch] = useReducer(reducer, data);

  useLayoutEffect(() => {
    dispatch({ type: "SET_DATA", payload: data });
  }, [data]);

  useDidMountEffect(() => {
    onUpdate && onUpdate(state);
  }, [state]);

  const makeComponents = React.useCallback(
    data => {
      return data.map(item => {
        item.id = v4();

        if (item.type === "leaf") {
          return <Leaf key={item.id} id={item.id} name={item.name} />;
        }
        return (
          <Container id={item.id} name={item.name}>
            {item.files &&
              item.files.map(file => {
                file.id = v4();
                file.parent = item; 
                if (file.type === "container") {
                  return makeComponents([file]);
                }
                return (
                  <Leaf
                    parent={item}
                    id={file.id}
                    key={file.id}
                    name={file.name}
                  />
                );
              })}
          </Container>
        );
      });
    },
    [state]
  );

  const isImparative = data && !children;

  return (
    <TreeContext.Provider
      value={{
        isImparative,
        state,
        dispatch,
        onNodeClick: path => {
          onNodeClick && onNodeClick(path);
        }
      }}
    >
      <StyledTree>{isImparative ? makeComponents(state) : children}</StyledTree>
    </TreeContext.Provider>
  );
};

Tree.Leaf = Leaf;
Tree.Container = Container;

export default Tree;
