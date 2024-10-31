import React from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';
import './TaskItem.css'
import {ReactComponent as Edit} from './Edit.svg'
import {ReactComponent as Trash} from './Trash.svg'



class TaskItem extends React.Component {
  render() {
    const {
      task,
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
      <li
        key={task.id}
        className={'wholebody_taskitem'}
        onMouseEnter={() => setHoveredTaskId(task.id)}
        onMouseLeave={() => setHoveredTaskId(null)}
      >
        {editingId === task.id ? (
          <input
            className='input_taskitem_body'
            type="text"
            value={editingText}
            onChange={(e) => editTask(task.id, e.target.value)}
            onBlur={() => updateTask(task.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                updateTask(task.id);
              }
            }}
          />
        ) : (
          <div className='taskitem_body'>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleCompletion(task.id)}
            />
            <div onClick={() => editTask(task.id)}>
              {task.text}
            </div>
            {hoveredTaskId === task.id && (
              <div className='podskazka'>
                {' '} (Создана {formatDistanceToNow(new Date(task.createdAt), { addSuffix: true, locale: ru, includeSeconds: true })})
              </div>
            )}
          </div>
        )}
        <div className='buttons_group'>
         {(!task.completed &&<button className='edit_btn' onClick={() => editTask(task.id)}><Edit /></button>)}
        <button className='delete_btn' onClick={() => deleteTask(task.id)}><Trash /></button> 
        </div>
      </li>
    );
  }
}

TaskItem.propTypes = {
  task: PropTypes.object.isRequired,
  editingId: PropTypes.number,
  editingText: PropTypes.string,
  hoveredTaskId: PropTypes.number,
  deleteTask: PropTypes.func.isRequired,
  editTask: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
  toggleCompletion: PropTypes.func.isRequired,
  setHoveredTaskId: PropTypes.func.isRequired,
};

TaskItem.defaultProps = {
  editingId: null,
  editingText: '',
  hoveredTaskId: null,
};

export {TaskItem};
