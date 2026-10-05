import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'
import './Task.css'

function Task({ id, text, atCreatedTime, completed, onToggleTaskDone, onDeleteTask, onEditTask }) {
  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState(text)
  const inputRef = useRef(null)
  useEffect(() => {
    if (isEditing) inputRef.current?.focus()
  }, [isEditing])
  const save = (event) => {
    event.preventDefault()
    if (!draft.trim()) return
    onEditTask(id, draft.trim())
    setIsEditing(false)
  }
  const taskCreationTime = formatDistanceToNow(new Date(atCreatedTime), { includeSeconds: true })

  return (
    <li className={`${completed ? 'completed' : ''} ${isEditing ? 'editing' : ''}`} data-id={id}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          id={`task-${id}`}
          aria-label={`Выполнить: ${text}`}
          checked={completed}
          onChange={() => onToggleTaskDone(id)}
        />
        <label htmlFor={`task-${id}`}>
          <span className="description">{text}</span>
          <span className="created">created {taskCreationTime} ago</span>
        </label>
        <button
          type="button"
          className="icon icon-edit"
          aria-label={`Редактировать: ${text}`}
          onClick={() => {
            setDraft(text)
            setIsEditing(true)
          }}
        />
        <button
          type="button"
          className="icon icon-destroy"
          aria-label={`Удалить: ${text}`}
          onClick={() => onDeleteTask(id)}
        />
      </div>
      {isEditing && (
        <form onSubmit={save}>
          <input
            ref={inputRef}
            className="edit"
            aria-label="Текст задачи"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Escape') {
                event.preventDefault()
                setIsEditing(false)
              }
            }}
          />
          <div className="edit-actions">
            <button type="submit" disabled={!draft.trim()}>
              Сохранить
            </button>
            <button type="button" onClick={() => setIsEditing(false)}>
              Отмена
            </button>
          </div>
        </form>
      )}
    </li>
  )
}

Task.propTypes = {
  id: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  atCreatedTime: PropTypes.instanceOf(Date).isRequired,
  onToggleTaskDone: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
  onEditTask: PropTypes.func.isRequired,
}

export default Task
