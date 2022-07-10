// export const url = `${process.env.PAYMENTS_SERVICE_HOST}:${process.env.PAYMENTS_SERVICE_PORT}`
const url = "http://localhost:8080"
const api = `${url}/api`

export const threadController = `${api}/thread`
export const stringController = `${api}/string`