import React from 'react';
import PropTypes from 'prop-types';
import './buttons.css'

class TaskFilters extends React.Component {
  render() {
    const { filter, setFilter, deleteAllCompletedTasks } = this.props;
    return (
      <div className='btn_group'>
        <button className='filter_btn' onClick={() => setFilter('all')}><div>Все задачи</div></button>
        <button className='filter_btn' onClick={() => setFilter('active')}><div>В процессе</div></button>
        <button className='filter_btn' onClick={() => setFilter('completed')}><div>Выполненные</div></button>
        {filter === 'completed' && (
          <button className='filter_btn' onClick={deleteAllCompletedTasks}><div>Очистить</div></button>
        )}
      </div>
    );
  }
}

TaskFilters.propTypes = {
  filter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
  deleteAllCompletedTasks: PropTypes.func.isRequired,
};

export {TaskFilters};
