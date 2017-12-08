import RxDB from 'rxdb'
import { timesSchema } from './models/times.schema'

export async function createDb () {
  RxDB.plugin(require('pouchdb-adapter-leveldb'))
  const db = await RxDB.create({
    name: './data/',
    adapter: 'leveldb',
  })
  await db.collection({
    name: 'times',
    schema: timesSchema
  })
  return db
}