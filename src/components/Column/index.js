import { Droppable } from "react-beautiful-dnd";
import { Typography } from "antd";
import ColumnItem from "../ColumnItem";
import "./style.css";

const { Title } = Typography;

const Column = ({ columnId, column }) => {
  return (
    <div className="column" key={columnId}>
      <Title level={4}>{column.name}</Title>
      <div className="column-content">
        <Droppable droppableId={columnId} key={columnId}>
          {(provided, snapshot) => (
            <div
              {...provided.droppablelProps}
              ref={provided.innerRef}
              style={{
                background: snapshot.isDraggingOver ? "lightblue" : "lightgrey",
                padding: 4,
                width: 250,
                minHeight: 500,
              }}
            >
              {column.items.map((item, index) => (
                <ColumnItem item={item} index={index} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </div>
  );
};

export default Column;
