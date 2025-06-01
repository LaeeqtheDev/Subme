import { type SchemaTypeDefinition } from 'sanity'
import siteSettings from './siteSettings'
import posts from './posts'
import comment from './comment'
import message from './message'


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [siteSettings, posts, comment, message],
}
