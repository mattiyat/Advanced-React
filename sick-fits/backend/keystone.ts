import { createAuth } from '@keystone-next/auth'
import { password } from '@keystone-next/fields'
import { config, createSchema } from '@keystone-next/keystone/schema'
import 'dotenv/config'
import {
  withItemData,
  statelessSessions,
} from '@keystone-next/keystone/session'
import { User } from './schemas/User'
import { Product } from './schemas/Product'
import { ProductImage } from './schemas/productImage'
import { insertSeedData } from './seed-data'

const databaseURL =
  process.env.DATABASE_URL || 'mongodb://localhost/keystone-sick-fits-tutorial'

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360, // Sign in duration
  secret: process.env.COOKIE_SECRET,
}

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
  initFirstItem: {
    fields: ['name', 'email', 'password'],
    // TODO: Add roles
  },
})

export default withAuth(
  config({
    server: {
      cors: {
        origin: [process.env.FRONTEND_URL],
        credentials: true,
      },
    },
    db: {
      adapter: 'mongoose',
      url: databaseURL,
      // TODO: add data seeding here
      async onConnect(keystone) {
        console.log('Connected to Database!!!!!!')
        if (process.argv.includes('--seed-data')) {
          await insertSeedData(keystone)
        }
      },
    },
    lists: createSchema({
      // Schema items go here
      User,
      Product,
      ProductImage,
    }),
    ui: {
      // Show Ui for passed test
      isAccessAllowed: ({ session }) =>
        // console.log(session)
        !!session?.data,
    },

    session: withItemData(statelessSessions(sessionConfig), {
      User: 'id name email',
    }),
  }),
)
