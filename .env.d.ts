/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly APP_NATS_WS: string
  readonly APP_NATS_USER: string
  readonly APP_NATS_PASS: string
  readonly APP_BACKEND_SERVICE: string
  readonly APP_SECRET_COOKIE: string
}