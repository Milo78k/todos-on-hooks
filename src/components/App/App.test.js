/* eslint-env jest */
import React, { act } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

global.IS_REACT_ACT_ENVIRONMENT = true
let root
let container
let app
beforeEach(() => {
  container = document.createElement('div')
  document.body.append(container)
  root = createRoot(container)
  act(() =>
    root.render(
      <App
        ref={(instance) => {
          app = instance
        }}
      />
    )
  )
})
afterEach(() => {
  act(() => root.unmount())
  container.remove()
})
test('blank tasks are ignored and renaming preserves identity and completion', () => {
  act(() => {
    app.addItem('   ')
    app.addItem('  Read docs  ')
  })
  expect(app.state.todoData).toHaveLength(1)
  const { id } = app.state.todoData[0]
  act(() => {
    app.toggleTaskDone(id)
    app.editTask(id, '  Review docs  ')
  })
  expect(app.state.todoData[0]).toMatchObject({ id, text: 'Review docs', completed: true })
  act(() => app.editTask(id, '   '))
  expect(app.state.todoData[0].text).toBe('Review docs')
})
test('edit opens a focused input and cancel leaves the task intact', () => {
  act(() => app.addItem('Read docs'))
  act(() => container.querySelector('[aria-label="Редактировать: Read docs"]').click())
  expect(document.activeElement.getAttribute('aria-label')).toBe('Текст задачи')
  const cancel = [...container.querySelectorAll('button')].find((button) => button.textContent === 'Отмена')
  act(() => cancel.click())
  expect(container.querySelector('[aria-label="Текст задачи"]')).toBeNull()
  expect(app.state.todoData[0].text).toBe('Read docs')
})
