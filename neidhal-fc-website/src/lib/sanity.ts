import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "6u09poo0";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-08-05";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === "production",
});

const builder = imageUrlBuilder(client);

export type SanityImageSource = Parameters<typeof builder.image>[0];

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// GROQ Data Fetchers
export async function getSanityEvents() {
  try {
    const events = await client.fetch(
      `*[_type == "event"] | order(eventDate asc) {
        _id,
        title,
        status,
        eventDate,
        badge,
        location,
        description,
        image,
        registrationUrl
      }`
    );
    return events || [];
  } catch (error) {
    console.error("Error fetching Sanity events:", error);
    return [];
  }
}

export async function getSanityCoaches() {
  try {
    const coaches = await client.fetch(
      `*[_type == "coach"] | order(displayOrder asc) {
        _id,
        name,
        role,
        bio,
        qualifications,
        image
      }`
    );
    return coaches || [];
  } catch (error) {
    console.error("Error fetching Sanity coaches:", error);
    return [];
  }
}

export async function getSanityTestimonials() {
  try {
    const testimonials = await client.fetch(
      `*[_type == "testimonial"] {
        _id,
        author,
        role,
        quote,
        rating,
        avatar,
        featured
      }`
    );
    return testimonials || [];
  } catch (error) {
    console.error("Error fetching Sanity testimonials:", error);
    return [];
  }
}

export async function getSanityLocations() {
  try {
    const locations = await client.fetch(
      `*[_type == "location"] {
        _id,
        name,
        address,
        city,
        mapUrl,
        timings,
        contactPhone,
        image,
        status
      }`
    );
    return locations || [];
  } catch (error) {
    console.error("Error fetching Sanity locations:", error);
    return [];
  }
}

export async function getSanityAnnouncement() {
  try {
    const settings = await client.fetch(
      `*[_type == "siteSettings"][0] {
        announcementActive,
        announcementMessage,
        announcementLink
      }`
    );
    return settings || null;
  } catch (error) {
    console.error("Error fetching Sanity announcement:", error);
    return null;
  }
}
