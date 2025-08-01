/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

import { Route as rootRouteImport } from './routes/__root'
import { Route as IndexRouteImport } from './routes/index'
import { Route as AuthAuthRouteImport } from './routes/auth/_auth'
import { Route as AuthTrainingIdRouteImport } from './routes/auth/training/$id'
import { Route as AuthAuthSuccessRouteImport } from './routes/auth/_auth.success'
import { Route as AuthAuthOnlineSessionRouteImport } from './routes/auth/_auth.online-session'
import { Route as AuthAuthDashboardRouteImport } from './routes/auth/_auth.dashboard'

const AuthRouteImport = createFileRoute('/auth')()

const AuthRoute = AuthRouteImport.update({
  id: '/auth',
  path: '/auth',
  getParentRoute: () => rootRouteImport,
} as any)
const IndexRoute = IndexRouteImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRouteImport,
} as any)
const AuthAuthRoute = AuthAuthRouteImport.update({
  id: '/_auth',
  getParentRoute: () => AuthRoute,
} as any)
const AuthTrainingIdRoute = AuthTrainingIdRouteImport.update({
  id: '/training/$id',
  path: '/training/$id',
  getParentRoute: () => AuthRoute,
} as any)
const AuthAuthSuccessRoute = AuthAuthSuccessRouteImport.update({
  id: '/success',
  path: '/success',
  getParentRoute: () => AuthAuthRoute,
} as any)
const AuthAuthOnlineSessionRoute = AuthAuthOnlineSessionRouteImport.update({
  id: '/online-session',
  path: '/online-session',
  getParentRoute: () => AuthAuthRoute,
} as any)
const AuthAuthDashboardRoute = AuthAuthDashboardRouteImport.update({
  id: '/dashboard',
  path: '/dashboard',
  getParentRoute: () => AuthAuthRoute,
} as any)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/auth': typeof AuthAuthRouteWithChildren
  '/auth/dashboard': typeof AuthAuthDashboardRoute
  '/auth/online-session': typeof AuthAuthOnlineSessionRoute
  '/auth/success': typeof AuthAuthSuccessRoute
  '/auth/training/$id': typeof AuthTrainingIdRoute
}
export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/auth': typeof AuthAuthRouteWithChildren
  '/auth/dashboard': typeof AuthAuthDashboardRoute
  '/auth/online-session': typeof AuthAuthOnlineSessionRoute
  '/auth/success': typeof AuthAuthSuccessRoute
  '/auth/training/$id': typeof AuthTrainingIdRoute
}
export interface FileRoutesById {
  __root__: typeof rootRouteImport
  '/': typeof IndexRoute
  '/auth': typeof AuthRouteWithChildren
  '/auth/_auth': typeof AuthAuthRouteWithChildren
  '/auth/_auth/dashboard': typeof AuthAuthDashboardRoute
  '/auth/_auth/online-session': typeof AuthAuthOnlineSessionRoute
  '/auth/_auth/success': typeof AuthAuthSuccessRoute
  '/auth/training/$id': typeof AuthTrainingIdRoute
}
export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/auth'
    | '/auth/dashboard'
    | '/auth/online-session'
    | '/auth/success'
    | '/auth/training/$id'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/auth'
    | '/auth/dashboard'
    | '/auth/online-session'
    | '/auth/success'
    | '/auth/training/$id'
  id:
    | '__root__'
    | '/'
    | '/auth'
    | '/auth/_auth'
    | '/auth/_auth/dashboard'
    | '/auth/_auth/online-session'
    | '/auth/_auth/success'
    | '/auth/training/$id'
  fileRoutesById: FileRoutesById
}
export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AuthRoute: typeof AuthRouteWithChildren
}

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/auth': {
      id: '/auth'
      path: '/auth'
      fullPath: '/auth'
      preLoaderRoute: typeof AuthRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/auth/_auth': {
      id: '/auth/_auth'
      path: '/auth'
      fullPath: '/auth'
      preLoaderRoute: typeof AuthAuthRouteImport
      parentRoute: typeof AuthRoute
    }
    '/auth/training/$id': {
      id: '/auth/training/$id'
      path: '/training/$id'
      fullPath: '/auth/training/$id'
      preLoaderRoute: typeof AuthTrainingIdRouteImport
      parentRoute: typeof AuthRoute
    }
    '/auth/_auth/success': {
      id: '/auth/_auth/success'
      path: '/success'
      fullPath: '/auth/success'
      preLoaderRoute: typeof AuthAuthSuccessRouteImport
      parentRoute: typeof AuthAuthRoute
    }
    '/auth/_auth/online-session': {
      id: '/auth/_auth/online-session'
      path: '/online-session'
      fullPath: '/auth/online-session'
      preLoaderRoute: typeof AuthAuthOnlineSessionRouteImport
      parentRoute: typeof AuthAuthRoute
    }
    '/auth/_auth/dashboard': {
      id: '/auth/_auth/dashboard'
      path: '/dashboard'
      fullPath: '/auth/dashboard'
      preLoaderRoute: typeof AuthAuthDashboardRouteImport
      parentRoute: typeof AuthAuthRoute
    }
  }
}

interface AuthAuthRouteChildren {
  AuthAuthDashboardRoute: typeof AuthAuthDashboardRoute
  AuthAuthOnlineSessionRoute: typeof AuthAuthOnlineSessionRoute
  AuthAuthSuccessRoute: typeof AuthAuthSuccessRoute
}

const AuthAuthRouteChildren: AuthAuthRouteChildren = {
  AuthAuthDashboardRoute: AuthAuthDashboardRoute,
  AuthAuthOnlineSessionRoute: AuthAuthOnlineSessionRoute,
  AuthAuthSuccessRoute: AuthAuthSuccessRoute,
}

const AuthAuthRouteWithChildren = AuthAuthRoute._addFileChildren(
  AuthAuthRouteChildren,
)

interface AuthRouteChildren {
  AuthAuthRoute: typeof AuthAuthRouteWithChildren
  AuthTrainingIdRoute: typeof AuthTrainingIdRoute
}

const AuthRouteChildren: AuthRouteChildren = {
  AuthAuthRoute: AuthAuthRouteWithChildren,
  AuthTrainingIdRoute: AuthTrainingIdRoute,
}

const AuthRouteWithChildren = AuthRoute._addFileChildren(AuthRouteChildren)

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AuthRoute: AuthRouteWithChildren,
}
export const routeTree = rootRouteImport
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()
