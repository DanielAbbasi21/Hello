import dbs from '../service/DatabaseService.js'

class TasksModel {
  #table = 'tasks' // ändra om din tabell heter annat

  async getAll () {
    let sql = 'SELECT id, title, completed FROM ?? ORDER BY id DESC'
    sql = dbs.format(sql, [this.#table])
    return await dbs.query(sql)
  }

  async getById (id) {
    let sql = 'SELECT id, title, completed FROM ?? WHERE id = ?'
    sql = dbs.format(sql, [this.#table, id])
    const [row] = await dbs.query(sql)
    return row || false
  }

  async create ({ title, completed }) {
    let sql = 'INSERT INTO ?? (title, completed) VALUES (?, ?)'
    sql = dbs.format(sql, [this.#table, title, completed ? 1 : 0])
    const result = await dbs.query(sql)
    return result.insertId
  }

  async update (id, { title, completed }) {
    let sql = 'UPDATE ?? SET title = ?, completed = ? WHERE id = ?'
    sql = dbs.format(sql, [this.#table, title, completed ? 1 : 0, id])
    const result = await dbs.query(sql)
    return result.affectedRows > 0
  }

  async delete (id) {
    let sql = 'DELETE FROM ?? WHERE id = ?'
    sql = dbs.format(sql, [this.#table, id])
    const result = await dbs.query(sql)
    return result.affectedRows > 0
  }
}

export default new TasksModel()