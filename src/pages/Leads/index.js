import "./style.css";
import { DragDropContext } from "react-beautiful-dnd";
import { useHistory } from "react-router-dom";
import { useObserver } from "mobx-react";
import { useEffect } from "react";
import { Button } from "antd";

import { useUserStore } from "../../providers/User/UserProvider";
import Column from "../../components/Column";

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];

    if (
      (sourceColumn.name === "Cliente em Potencial" &&
        destColumn.name === "Dados Confirmados") ||
      (sourceColumn.name === "Dados Confirmados" &&
        destColumn.name === "Reunião Agendada")
    ) {
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    }
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};

const Leads = ({ setTitleHeader }) => {
  const UserStore = useUserStore();
  let history = useHistory();

  useEffect(() => {
    UserStore.verify_logged();
    if (UserStore.is_logged) {
      UserStore.find_leads();
    }
  }, [UserStore, history]);

  const new_lead = (e) => {
    e.preventDefault();
    setTitleHeader("Novo Lead");
    history.push("/new_lead");
  };

  return useObserver(() => (
    <>
      {UserStore.is_logged && (
        <div className="panel">
          <div>
            <Button
              type="primary"
              className="btn-new-lead"
              style={{ width: "30%" }}
              onClick={(e) => new_lead(e)}
            >
              Novo Lead
            </Button>

            <DragDropContext
              onDragEnd={(result) =>
                onDragEnd(result, UserStore.leads_, UserStore.setLeads)
              }
            >
              <div className="panel-leads">
                {Object.entries(UserStore.leads_).map(
                  ([columnId, column], index) => {
                    return <Column columnId={columnId} column={column} />;
                  }
                )}
              </div>
            </DragDropContext>
          </div>
        </div>
      )}
    </>
  ));
};

export default Leads;
