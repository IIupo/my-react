import React from 'react';
import PropTypes from 'prop-types';
import './buttons.css'

class TaskFilters extends React.Component {
  handleSetFilter = (filter) => () => {
  this.props.setFilter(filter);
  };

  handleDeleteAllCompletedTasks = () => {
    this.props.deleteAllCompletedTasks();
  };

  render() {
    const { filter } = this.props;
    return (
      <div className='btn_group'>
        <div className='btn_group_left'>
          <button className={filter === 'all' ? 'filter_btn' : 'filter_btn_off'} onClick={this.handleSetFilter('all')}><div>Все задачи</div></button>
          <button className={filter === 'active' ? 'filter_btn' : 'filter_btn_off'} onClick={this.handleSetFilter('active')}><div>В процессе</div></button>
          <button className={filter === 'completed' ? 'filter_btn' : 'filter_btn_off'} onClick={this.handleSetFilter('completed')}><div>Выполненные</div></button>
        </div>
        <div>
          {filter === 'completed' && (
            <button className='filter_btn' onClick={this.handleDeleteAllCompletedTasks}><div>Очистить</div></button>
          )}
        </div>
      </div>
    );
  }
}

TaskFilters.propTypes = {
  filter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
  deleteAllCompletedTasks: PropTypes.func.isRequired,
  handleDeleteAllCompletedTasks: PropTypes.func,
};


export {TaskFilters};
