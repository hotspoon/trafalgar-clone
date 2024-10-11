import {defineType, defineField, defineArrayMember} from 'sanity'

export default defineType({
  name: 'travelHighlights',
  title: 'Travel Highlights',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'highlights',
      title: 'Highlights',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
    }),
  ],
})
