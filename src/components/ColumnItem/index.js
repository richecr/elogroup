import { Draggable } from "react-beautiful-dnd";
import classNames from "classnames";
import "./style.css";

const ColumnItem = ({ item, index }) => {
  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={classNames("teste", {
            "color-is-dragging": snapshot.isDragging,
          })}
        >
          {item.content}
        </div>
      )}
    </Draggable>
  );
};

export default ColumnItem;
