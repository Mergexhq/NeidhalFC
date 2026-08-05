import { defineType, defineField } from 'sanity'
import { CalendarIcon } from '@sanity/icons/Calendar'

export const event = defineType({
  name: 'event',
  title: 'Event & Bootcamp',
  type: 'document',
  icon: CalendarIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Event Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Event Status',
      type: 'string',
      options: {
        list: [
          { title: 'Upcoming', value: 'upcoming' },
          { title: 'Registration Open', value: 'registration_open' },
          { title: 'Completed', value: 'completed' },
        ],
        layout: 'radio',
      },
      initialValue: 'registration_open',
    }),
    defineField({
      name: 'eventDate',
      title: 'Event Date & Time',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'badge',
      title: 'Badge Label (e.g. Summer Camp, Trials)',
      type: 'string',
    }),
    defineField({
      name: 'location',
      title: 'Location / Venue',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'image',
      title: 'Event Banner Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'registrationUrl',
      title: 'Registration Link',
      type: 'url',
    }),
  ],
})
