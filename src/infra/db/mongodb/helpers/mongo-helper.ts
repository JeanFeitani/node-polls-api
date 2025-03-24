import { MongoClient, Db, type Collection } from 'mongodb'

export const MongoHelper = {
  client: null as unknown as MongoClient,
  db: null as unknown as Db,

  async connect(uri: string): Promise<void> {
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

  getCollection(name: string): Collection {
    return this.client.db().collection(name)
  },
}
