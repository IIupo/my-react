import React from 'react';
import PropTypes from 'prop-types';
import {TaskItem} from '../TaskItem/TaskItem';
import './TaskList.css'
class TaskList extends React.Component {
  render() {
    const {
      tasks,
      editingId,
      editingText,
      hoveredTaskId,
      deleteTask,
      editTask,
      updateTask,
      toggleCompletion,
      setHoveredTaskId,
    } = this.props;

    return (
      <ul>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            editingId={editingId}
            editingText={editingText}
            hoveredTaskId={hoveredTaskId}
            deleteTask={deleteTask}
            editTask={editTask}
            updateTask={updateTask}
            toggleCompletion={toggleCompletion}
            setHoveredTaskId={setHoveredTaskId}
          />
        ))}
      </ul>
    );
  }
}

TaskList.propTypes = {
  tasks: PropTypes.array.isRequired,
  editingId: PropTypes.number,
  editingText: PropTypes.string,
  hoveredTaskId: PropTypes.number,
  deleteTask: PropTypes.func.isRequired,
  editTask: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
  toggleCompletion: PropTypes.func.isRequired,
  setHoveredTaskId: PropTypes.func.isRequired,
};

TaskList.defaultProps = {
  editingId: null,
  editingText: '',
  hoveredTaskId: null,
};

export {TaskList};
