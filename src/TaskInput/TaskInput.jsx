
import React from 'react';
import PropTypes from 'prop-types';
import './input.css'
import {ReactComponent as Add} from './Add.svg'

class TaskInput extends React.Component {
  render() {
    const { input, handleChange, addTask } = this.props;
    return (
      <div className='input_button'>
        <input
          className='input_main'
          type="text"
          value={input}
          onChange={handleChange}
          placeholder="Добавить новую задачу..."
        />
        <button className='add_task_btn' onClick={addTask}><div>Добавить<Add/></div></button>
      </div>
    );
  }
}

TaskInput.propTypes = {
  input: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  addTask: PropTypes.func.isRequired,
};

export {TaskInput};
