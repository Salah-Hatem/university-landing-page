import sharp from 'sharp'
import {lexicalEditor} from '@payloadcms/richtext-lexical'
import {vercelBlobStorage} from '@payloadcms/storage-vercel-blob'
import {vercelPostgresAdapter} from '@payloadcms/db-vercel-postgres'
import {buildConfig} from 'payload'
import {collections} from './payload/collections'
import {globals} from './payload/globals'

export default buildConfig({
    editor: lexicalEditor(),

    collections,
    globals,

    secret: process.env.PAYLOAD_SECRET || '',
    db: vercelPostgresAdapter({
        pool: {connectionString: process.env.POSTGRES_URL || ''},
    }),
    sharp,
    plugins: [
        vercelBlobStorage({
            enabled: !!process.env.BLOB_READ_WRITE_TOKEN,   // off locally when no token → falls back to disk
            collections: {media: true},                    // matches your slug "media"
            token: process.env.BLOB_READ_WRITE_TOKEN,
        }),
    ],
})
