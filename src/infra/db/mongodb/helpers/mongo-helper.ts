import { MongoClient, Db, type Collection } from 'mongodb'

export const MongoHelper = {
  client: null as unknown as MongoClient,
  db: null as unknown as Db,
  uri: null as unknown as string,

  async connect(uri: string): Promise<void> {
    this.uri = uri
    this.client = await MongoClient.connect(uri)
    this.db = this.client.db()
  },

  async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.close()
      this.client = null as unknown as MongoClient
      this.db = null as unknown as Db
    }
  },

  async getCollection(name: string): Promise<Collection> {
    if (!this.client || !this.pingClient()) {
      await this.connect(this.uri)
    }
    return this.client.db().collection(name)
  },

  async pingClient(): Promise<boolean> {
    try {
      await this.client.db().command({ ping: 1 })
      return true
    } catch (error) {
      console.log('Erro ao tentar conectar:', error)
      return false
    }
  },
}
