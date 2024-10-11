import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'dayByDayItinerary',
  title: 'Day by Day Itinerary',
  type: 'document',
  fields: [
    defineField({
      name: 'day',
      title: 'Day',
      type: 'number',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
    }),
    defineField({
      name: 'locations',
      title: 'Locations',
      type: 'string',
    }),
    defineField({
      name: 'activities',
      title: 'Activities',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'badge',
      title: 'Badge',
      type: 'object',
      fields: [
        {name: 'text', title: 'Text', type: 'string'},
        {name: 'variant', title: 'Variant', type: 'string'},
      ],
    }),
  ],
})
