import RxDB from 'rxdb'
import { timesSchema } from './models/times.schema'
import { usersSchema } from './models/users.schema'

export async function createDb () {
  RxDB.plugin(require('pouchdb-adapter-leveldb'))

  const db = await RxDB.create({
    name: './data/',
    adapter: 'leveldb',
  })

  await db.collection({
    name: 'times',
    schema: timesSchema,
  })

  await db.collection({
    name: 'users',
    schema: usersSchema,
  })

  return db
}