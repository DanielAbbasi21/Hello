import TasksModel from '../model/TasksModel.js'

export const controller = {}

// GET /tasks
controller.getTasks = async (req, res, next) => {
  try {
    const rows = await TasksModel.getAll()
    res.json(rows)
  } catch (err) {
    next(err)
  }
}

// GET /tasks/:id
controller.getTaskById = async (req, res, next) => {
  try {
    const task = await TasksModel.getById(req.params.id)
    if (!task) return res.status(404).json({ error: 'Task not found' })
    res.json(task)
  } catch (err) {
    next(err)
  }
}

// POST /tasks
controller.createTask = async (req, res, next) => {
  try {
    const { title, completed = false } = req.body

    if (!title || typeof title !== 'string') {
      return res.status(400).json({ error: 'title is required' })
    }

    const id = await TasksModel.create({ title, completed })
    const created = await TasksModel.getById(id)
    res.status(201).json(created)
  } catch (err) {
    next(err)
  }
}

// PATCH /tasks/:id
controller.updateTask = async (req, res, next) => {
  try {
    // PATCH: tillåt att man skickar bara title eller completed
    const existing = await TasksModel.getById(req.params.id)
    if (!existing) return res.status(404).json({ error: 'Task not found' })

    const title =
      req.body.title !== undefined ? req.body.title : existing.title

    const completed =
      req.body.completed !== undefined ? req.body.completed : existing.completed

    const ok = await TasksModel.update(req.params.id, { title, completed })
    if (!ok) return res.status(404).json({ error: 'Task not found' })

    const updated = await TasksModel.getById(req.params.id)
    res.json(updated)
  } catch (err) {
    next(err)
  }
}

// PUT /tasks/:id
controller.replaceTask = async (req, res, next) => {
  try {
    const { title, completed = false } = req.body

    if (!title || typeof title !== 'string') {
      return res.status(400).json({ error: 'title is required' })
    }

    const ok = await TasksModel.update(req.params.id, { title, completed })
    if (!ok) return res.status(404).json({ error: 'Task not found' })

    const updated = await TasksModel.getById(req.params.id)
    res.json(updated)
  } catch (err) {
    next(err)
  }
}

// DELETE /tasks/:id
controller.deleteTask = async (req, res, next) => {
  try {
    const ok = await TasksModel.delete(req.params.id)
    if (!ok) return res.status(404).json({ error: 'Task not found' })
    res.status(204).send()
  } catch (err) {
    next(err)
  }
}