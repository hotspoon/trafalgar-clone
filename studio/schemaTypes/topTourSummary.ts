import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'topTourSummary',
  title: 'Top Tour Summary',
  type: 'document',
  fields: [
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
      name: 'tripYears',
      title: 'Trip Years',
      type: 'array',
      of: [{type: 'number'}],
    }),
    defineField({
      name: 'travel',
      title: 'Travel',
      type: 'object',
      fields: [
        {name: 'days', title: 'Days', type: 'number'},
        {name: 'countries', title: 'Countries', type: 'number'},
        {name: 'cities', title: 'Cities', type: 'number'},
      ],
    }),
    defineField({
      name: 'meals',
      title: 'Meals',
      type: 'object',
      fields: [
        {name: 'breakfasts', title: 'Breakfasts', type: 'number'},
        {name: 'dinners', title: 'Dinners', type: 'number'},
      ],
    }),
    defineField({
      name: 'accommodation',
      title: 'Accommodation',
      type: 'object',
      fields: [{name: 'nights', title: 'Nights', type: 'number'}],
    }),
    defineField({
      name: 'tripCode',
      title: 'Trip Code',
      type: 'string',
    }),
    defineField({
      name: 'highlights',
      title: 'Highlights',
      type: 'array',
      of: [{type: 'string'}],
    }),
  ],
})
