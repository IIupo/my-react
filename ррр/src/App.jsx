import React, { useState } from "react";
import "./App.css";
import TaskForm from "./companents/MyTaskForm/TaskForm";
import TaskList from "./companents/MyTaskList/TaskList";
import ButtonGroup from "./companents/ButtonGroup/ButtonGroup";
import { ReactComponent as Logo } from "../src/companents/img/Logo.svg";
import PropTypes from "prop-types";

function App() {
  const [checked, setChecked] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [active, setActive] = useState(0);

  const filterButton = ["Все Задачи", "Завершенные", "В Процессе"];

  const counter = () => {
    return tasks.reduce((acc, cur) => {
      if (cur.checked === true) {
        acc++;
      }
      return acc;
    }, 0);
  };

  const createTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const removeTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const chekedBox = () => {
    setChecked(!checked);
  };

  const checkedTask = (e) => {
    setActive(e);
  };

  const sort = () => {
    setTasks([...tasks].filter((e) => e.checked === false));
  };

  return (
    <div>
      <Logo className="form" />
      <div>
        <TaskForm create={createTask} />
      </div>

      <div className="filter">
        <ButtonGroup
          active={active}
          checkedTask={checkedTask}
          sort={sort}
          tasks={tasks}
          buttons={filterButton}
        />
      </div>

      <div className="counter">
        <div>
          Всего задач <p>{tasks.length}</p>
        </div>
        <div>
          завершено <p>{`${counter()} из ${tasks.length}`}</p>
        </div>
      </div>

      {tasks.length !== 0 ? (
        <TaskList
          active={active}
          checked={chekedBox}
          remove={removeTask}
          tasks={tasks}
        />
      ) : (
        <div className="noTask">Список задач пуст</div>
      )}
    </div>
  );
}

export default App;
