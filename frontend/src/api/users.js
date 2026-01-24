import http from './http'
import { USERS, USER_BY_ID } from './endpoints'

export const fetchUsers = () => http(USERS)

export const createUser = (name) =>
    http(USERS, { method: 'POST', body: { name } })

export const deleteUser = (id) =>
    http(USER_BY_ID(id), { method: 'DELETE' })

export const updateUser = (id, name) =>
    http(USER_BY_ID(id), { method: 'PUT', body: { name } })
