import tasksModel from '../model/TasksModel.js'

class TasksWebController {
  async index (req, res) {
    const tasks = await tasksModel.getAll()
    res.render('tasks/index', { tasks })
  }

  async show (req, res) {
    const task = await tasksModel.getById(req.params.id)
    if (!task) {
      req.session.flashMessage = 'Task not found.'
      return res.redirect('/crud/tasks')
    }
    res.render('tasks/show', { task })
  }

  createForm (req, res) {
    res.render('tasks/form', {
      mode: 'create',
      task: { title: '', completed: 0 }
    })
  }

  async create (req, res) {
    const title = (req.body.title || '').trim()
    const completed = req.body.completed === 'on'

    if (!title) {
      req.session.flashMessage = 'Title is required.'
      return res.redirect('/crud/tasks/create')
    }

    const id = await tasksModel.create({ title, completed })
    req.session.flashMessage = `Task created (#${id}).`
    res.redirect('/crud/tasks')
  }

  async editForm (req, res) {
    const task = await tasksModel.getById(req.params.id)
    if (!task) {
      req.session.flashMessage = 'Task not found.'
      return res.redirect('/crud/tasks')
    }
    res.render('tasks/form', { mode: 'edit', task })
  }

  async update (req, res) {
    const title = (req.body.title || '').trim()
    const completed = req.body.completed === 'on'

    if (!title) {
      req.session.flashMessage = 'Title is required.'
      return res.redirect(`/crud/tasks/${req.params.id}/edit`)
    }

    const ok = await tasksModel.update(req.params.id, { title, completed })
    req.session.flashMessage = ok ? 'Task updated.' : 'Task not found.'
    res.redirect('/crud/tasks')
  }

  async delete (req, res) {
    const ok = await tasksModel.delete(req.params.id)
    req.session.flashMessage = ok ? 'Task deleted.' : 'Task not found.'
    res.redirect('/crud/tasks')
  }
}

export default new TasksWebController()