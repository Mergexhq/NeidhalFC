import { defineType, defineField } from 'sanity'
import { UserIcon } from '@sanity/icons/User'

export const coach = defineType({
  name: 'coach',
  title: 'Coach & Technical Staff',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Coach Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Profile Photo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order Number',
      type: 'number',
      initialValue: 0,
    }),
  ],
})
