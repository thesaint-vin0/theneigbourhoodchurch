import type { Role } from '../types'

export type Permission =
  | 'dashboard'
  | 'sermons'
  | 'events'
  | 'gallery'
  | 'media'
  | 'forms'
  | 'giving'
  | 'pastors'
  | 'home-content'
  | 'settings'
  | 'admin-management'
  | 'account'

export const roleLabels: Record<Role, string> = {
  super_admin: 'Super Admin',
  admin: 'Admin',
  editor: 'Editor',
}

const permissions: Record<Role, Permission[]> = {
  super_admin: [
    'dashboard', 'sermons', 'events', 'gallery', 'media', 'forms', 'giving',
    'pastors', 'home-content', 'settings', 'admin-management', 'account',
  ],
  admin: [
    'dashboard', 'sermons', 'events', 'gallery', 'media', 'forms', 'giving',
    'pastors', 'home-content', 'settings', 'account',
  ],
  editor: [
    'dashboard', 'sermons', 'events', 'gallery', 'media', 'pastors', 'account',
  ],
}

export function hasPermission(role: Role | null | undefined, permission: Permission) {
  return !!role && permissions[role]?.includes(permission)
}

export function getRolePermissions(role: Role | null | undefined) {
  return role ? permissions[role] ?? [] : []
}
