import { Router } from 'express'
import employees from './employees'
import { create404Error } from './util'


const router = new Router()


/*
 * Create an employee and respond to request
 */

const createEmployee = (req, res, next) => {
  try {
    const name     = req.body.name
    const company  = req.body.company
    const id       = employees.length
    const employee = {
      _id: id,
      name,
      company
    }

    employees[id]  = employee

    if(req.xhr) {
      res.location(`/employees/${id}`)
      res.status(201).json(employee)
    }
    else res.redirect('/')
  }
  catch(e) {
    next(e)
  }
}


/*
 * Update details for an employee and respond to request
 */

const updateEmployee = (req, res, next) => {
  try {
    const name    = req.body.name
    const company = req.body.company

    req.employee.name    = name || req.employee.name
    req.employee.company = company || req.employee.company

    if (req.xhr) {
      res.location(`/employees/${req.params.id}`)

      /*
       * server successfully processed request but
       * doesn't have anything to return
       */
      res.sendStatus(204)
    }
    else res.redirect('/')
  }
  catch(e) {
    next(e)
  }
}


/*
 * Delete an employee and respond to request
 */

const deleteEmployee = (req, res, next) => {
  try {
    const id = req.params.id

    // delete employee with given id
    employees.splice(id, 1)

    if (req.xhr) res.sendStatus(204)
    else res.redirect('/')
  }
  catch(e) {
    next(e)
  }
}


/*
 * GET home page
 */

router.get('/', (req, res) => res.render('index', { employees }))


/*
 * ALL setup employee on req object
 * GET get details for employee with given id
 * PUT/POST update details for employee with given id
 * DELETE delete employee with given id
 */

router
  .route('/employees/:id')
  .all((req, res, next) => {
    const id       = req.params.id
    const employee = employees[id]

    if (!employee) next(create404Error('Employee not found'))
    else {
      req.employee = employee
      next()
    }
  })
  .get((req, res, next) => {
    try {
      const payload = req.employee

      if (req.xhr) res.json(payload)
      else res.render('employee', payload)
    }
    catch(e) {
      next(e)
    }
  })
  .post(updateEmployee)
  .put(updateEmployee)
  .delete(deleteEmployee)


/*
 * GET list of employees
 * POST to create new employee
 */

router
  .route('/employees')
  .get((req, res) => {
    if (req.xhr) res.json(employees)
    else res.redirect('/')
  })
  .post(createEmployee)


/*
 * GET edit employee page
 */

router.get('/edit/:id', (req, res, next) => {
  try {
    const id = req.params.id
    const employee = employees[id] || {}

    if (req.xhr) next(create404Error('This end point cannot be accessed via xhr'))
    else res.render('edit', { id, employee })
  }
  catch(e) {
    next(e)
  }
})


/*
 * GET create employee page
 */

router.get('/create', (req, res, next) => {
  try {
    if (req.xhr) next(create404Error('This end point cannot be accessed via xhr'))
    else res.render('create')
  }
  catch(e) {
    next(e)
  }
})

export default router
