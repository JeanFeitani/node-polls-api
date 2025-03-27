import { cors } from '../middleware/cors'
import { app } from './app'

app.addHook('onRequest', cors)
