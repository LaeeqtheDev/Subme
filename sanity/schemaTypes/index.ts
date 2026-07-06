import { type SchemaTypeDefinition } from 'sanity'
import siteSettings from './siteSettings'
import posts from './posts'
import comment from './comment'
import message from './message'
import creator from './creator'


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [siteSettings, posts, comment, message, creator],
}
