import { defineType, defineField } from 'sanity'
import { CogIcon } from '@sanity/icons/Cog'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings & Announcements',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'announcementActive',
      title: 'Enable Announcement Bar',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'announcementMessage',
      title: 'Announcement Message',
      type: 'string',
    }),
    defineField({
      name: 'announcementLink',
      title: 'Announcement CTA Link (optional)',
      type: 'string',
    }),
  ],
})
