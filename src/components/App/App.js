import React, { Component } from 'react'
import Header from '../Header'
import TaskList from '../TaskList'
import Footer from '../Footer'
import NewTaskForm from '../NewTaskForm'
import './App.css'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.maxId = 100
    this.state = {
      todoData: [],
      activeFilter: 'All',
    }
  }

  addItem = (text) => {
    const trimmed = text.trim()
    if (!trimmed) return
    const newItem = this.createTodoItem(trimmed)
    this.setState(({ todoData }) => ({
      todoData: [...todoData, newItem],
    }))
  }

  editTask = (id, text) => {
    const trimmed = text.trim()
    if (!trimmed) return
    this.setState(({ todoData }) => ({
      todoData: todoData.map((task) => (task.id === id ? { ...task, text: trimmed } : task)),
    }))
  }

  deleteTask = (id) => {
    this.setState(({ todoData }) => ({
      todoData: todoData.filter((el) => el.id !== id),
    }))
  }

  toggleTaskDone = (id) => {
    this.setState(({ todoData }) => ({
      todoData: todoData.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)),
    }))
  }

  changeFilter = (filter) => {
    this.setState({ activeFilter: filter })
  }

  clearCompleted = () => {
    this.setState(({ todoData }) => ({
      todoData: todoData.filter((task) => !task.completed),
    }))
  }

  getFilteredTasks = () => {
    const { todoData, activeFilter } = this.state
    switch (activeFilter) {
      case 'All':
        return todoData
      case 'Active':
        return todoData.filter((task) => !task.completed)
      case 'Completed':
        return todoData.filter((task) => task.completed)
      default:
        return todoData
    }
  }

  createTodoItem(label) {
    this.maxId += 1
    return {
      text: label,
      id: this.maxId,
      completed: false,
      atCreatedTime: new Date(),
    }
  }

  render() {
    const { todoData, activeFilter } = this.state
    const filteredTasks = this.getFilteredTasks()

    return (
      <section className="todoapp">
        <Header>
          <NewTaskForm onItemAdded={this.addItem} />
        </Header>
        <section className="main">
          <TaskList
            todos={filteredTasks}
            onDeleteTask={this.deleteTask}
            onToggleTaskDone={this.toggleTaskDone}
            onEditTask={this.editTask}
          />
          <Footer
            tasksLeft={todoData.filter((task) => !task.completed).length}
            onFilterChange={this.changeFilter}
            onClearCompleted={this.clearCompleted}
            activeFilter={activeFilter}
          />
        </section>
      </section>
    )
  }
}
