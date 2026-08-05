import { defineType, defineField } from 'sanity'
import { PinIcon } from '@sanity/icons/Pin'

export const location = defineType({
  name: 'location',
  title: 'Turf Location',
  type: 'document',
  icon: PinIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Location Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'address',
      title: 'Full Address',
      type: 'text',
      rows: 2,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
      initialValue: 'Chennai',
    }),
    defineField({
      name: 'mapUrl',
      title: 'Google Maps Link',
      type: 'url',
    }),
    defineField({
      name: 'timings',
      title: 'Batch Timings / Schedule Info',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'contactPhone',
      title: 'Contact Phone / WhatsApp',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Turf Photo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'status',
      title: 'Operational Status',
      type: 'string',
      options: {
        list: [
          { title: 'Active', value: 'active' },
          { title: 'Maintenance', value: 'maintenance' },
          { title: 'Coming Soon', value: 'coming_soon' },
        ],
        layout: 'radio',
      },
      initialValue: 'active',
    }),
  ],
})
