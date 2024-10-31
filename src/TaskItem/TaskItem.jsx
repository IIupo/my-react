import React from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';
import './TaskItem.css'
import {ReactComponent as Edit} from './Edit.svg'
import {ReactComponent as Trash} from './Trash.svg'



class TaskItem extends React.Component {
  handleMouseEnter = () => {
    this.props.setHoveredTaskId(this.props.task.id);
  };

  handleMouseLeave = () => {
    this.props.setHoveredTaskId(null);
  };

  handleEditTask = () => {
    this.props.editTask(this.props.task.id);
  };

  handleDeleteTask = () => {
    this.props.deleteTask(this.props.task.id);
  };

  handleToggleCompletion = () => {
    this.props.toggleCompletion(this.props.task.id);
  };

  handleUpdateTask = (e) => {
    if (e.key === 'Enter') {
      this.props.updateTask(this.props.task.id);
    }
  };

  handleBlurEvent = () => {
    this.props.updateTask(this.props.task.id);
  }

  handleOnChangeEvent = (e) => {
    this.props.editTask(this.props.task.id, e.target.value);
  } 

  render() {
    const { task, editingId, editingText, hoveredTaskId} = this.props;
    return (
      <li
        key={task.id}
        className={'wholebody_taskitem'}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <div className='input_text_group'>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={this.handleToggleCompletion}
          />
          {editingId === task.id ? (
            <input
              className='input_taskitem_body'
              type="text"
              value={editingText}
              onChange={this.handleOnChangeEvent}
              onBlur={this.handleBlurEvent}
              onKeyDown={this.handleUpdateTask}
              autoFocus
            />
          ) : (
            <div>
              <div
                className={!task.completed ? '' : 'line_through'}
                onClick={this.handleEditTask}
              >
                {task.text}
              </div>
              {hoveredTaskId === task.id && (
                <div className='podskazka'>
                  {' '} Создана {formatDistanceToNow(new Date(task.createdAt), { addSuffix: true, locale: ru, includeSeconds: true })}
                </div>
              )}
            </div>
          )}
        </div>
        <div className='buttons_group'>
          {(!task.completed && <button className={(editingId === task.id) ? 'edit_btnOn' : 'edit_btnOff'} onClick={this.handleEditTask}><Edit /></button>)}
          <button className='delete_btn' onClick={this.handleDeleteTask}><Trash /></button>
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
  handleUpdateTask: PropTypes.any,
  handleOnChangeEvent: PropTypes.any,
};

TaskItem.defaultProps = {
  editingId: null,
  editingText: '',
  hoveredTaskId: null,
};

export {TaskItem};
