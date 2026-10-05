import React from 'react'
import PropTypes from 'prop-types'

import Task from '../Task'
import './TaskList.css'

function TaskList({ todos, onDeleteTask, onToggleTaskDone, onEditTask }) {
  return (
    <ul className="todo-list">
      {todos.map(({ id, text, completed, atCreatedTime }) => (
        <Task
          key={id}
          id={id}
          text={text}
          completed={completed}
          atCreatedTime={atCreatedTime}
          onDeleteTask={onDeleteTask}
          onToggleTaskDone={onToggleTaskDone}
          onEditTask={onEditTask}
        />
      ))}
    </ul>
  )
}

TaskList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      atCreatedTime: PropTypes.instanceOf(Date).isRequired,
    })
  ),
  onDeleteTask: PropTypes.func.isRequired,
  onEditTask: PropTypes.func.isRequired,
  onToggleTaskDone: PropTypes.func.isRequired,
}

TaskList.defaultProps = {
  todos: [],
}

export default TaskList
