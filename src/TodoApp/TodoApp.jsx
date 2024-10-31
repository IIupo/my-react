import React from 'react';
import {TaskInput} from '../TaskInput/TaskInput';
import {TaskList} from '../TaskList/TaskList';
import {TaskFilters} from '../TaskFilters/TaskFilters';
import './TodoApp.css'

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: this.getTasksFromLocalStorage(),
      input: '',
      filter: 'all',
      editingId: null,
      editingText: '',
      hoveredTaskId: null,
    };
  }

  getTasksFromLocalStorage() {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
  }

  saveTasksToLocalStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  handleChange = (event) => {
    this.setState({ input: event.target.value });
  };

  addTask = () => {
    if (this.state.input) {
      const newTask = {
        id: Date.now(),
        text: this.state.input,
        completed: false,
        createdAt: new Date(),
        completedAt: null,
      };

      this.setState((prevState) => {
        const updatedTasks = [...prevState.tasks, newTask];
        this.saveTasksToLocalStorage(updatedTasks);
        return { tasks: updatedTasks, input: '' };
      });
    }
  };

  deleteTask = (id) => {
    this.setState((prevState) => {
      const updatedTasks = prevState.tasks.filter((task) => task.id !== id);
      this.saveTasksToLocalStorage(updatedTasks);
      return { tasks: updatedTasks };
    });
  };

  deleteAllCompletedTasks = () => {
    this.setState((prevState) => {
      const updatedTasks = prevState.tasks.filter((task) => !task.completed);
      this.saveTasksToLocalStorage(updatedTasks);
      this.setFilter('all');
      return { tasks: updatedTasks };
    });
  };

  editTask = (id, text) => {
    this.setState({
      editingId: id,
      editingText: text || this.state.tasks.find(task => task.id === id).text
    });
  }

  updateTask = (id) => {
    this.setState((prevState) => {
      const updatedTasks = prevState.tasks.map((task) =>
        task.id === id ? { ...task, text: this.state.editingText } : task
      );
      this.saveTasksToLocalStorage(updatedTasks);
      return { tasks: updatedTasks, editingId: null, editingText: '' };
    });
  };

  toggleCompletion = (id) => {
    this.setState((prevState) => {
      const updatedTasks = prevState.tasks.map((task) => {
        if (task.id === id) {
          const completed = !task.completed;
          return {
            ...task,
            completed,
            completedAt: completed ? new Date() : null,
          };
        }
        return task;
      });
      this.saveTasksToLocalStorage(updatedTasks);
      return { tasks: updatedTasks };
    });
  };

  setFilter = (filter) => {
    this.setState({ filter });
  };

  render() {
    const { tasks, input, filter, editingId, editingText, hoveredTaskId } = this.state;

    const filteredTasks = tasks
      .filter((task) => {
        if (filter === 'completed') return task.completed;
        if (filter === 'active') return !task.completed;
        return true; // 'all'
      })
      .sort((a, b) => {
        if (a.completed === b.completed) {
          if (a.completedAt && b.completedAt) {
            return b.completedAt - a.completedAt;
          }
          return a.createdAt - b.createdAt;
        }
        return a.completed ? 1 : -1;
      });

    return (
      <div className='main_div'>
       <div className='notsomain_main_div'>
        <h1>
          to<span>do</span>
        </h1>
        <TaskInput
          input={input}
          handleChange={this.handleChange}
          addTask={this.addTask}
        />
        
        <TaskFilters
          filter={filter}
          setFilter={this.setFilter}
          deleteAllCompletedTasks={this.deleteAllCompletedTasks}
        />
        <div className='counter'>
          <strong>{'Всего задач: '}<div>{tasks.length}</div></strong>
          <strong>{'Завершено: '}<div>{tasks.filter(task => task.completed).length}{' из '}{tasks.length}</div></strong>
        </div>
        <TaskList
          tasks={filteredTasks}
          editingId={editingId}
          editingText={editingText}
          hoveredTaskId={hoveredTaskId}
          deleteTask={this.deleteTask}
          editTask={this.editTask}
          updateTask={this.updateTask}
          toggleCompletion={this.toggleCompletion}
          setHoveredTaskId={(id) => this.setState({ hoveredTaskId: id })}
        />
        
      </div> 
      </div>
      
    );
  }
}

export {TodoApp};
