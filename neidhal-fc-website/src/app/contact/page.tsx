import React from "react";
import type { Metadata } from "next";
import SmoothScroll from "@/components/common/SmoothScroll";
import ContactHero from "@/modules/contact/ContactHero";

export const metadata: Metadata = {
  title: "Contact Us | Start Your Football Journey",
  description: "Connect with Neidhal FC. Book a free coached trial, ask a question via WhatsApp, or locate our training grounds in ECR Chennai.",
};

export default function ContactPage() {
  return (
    <SmoothScroll>
      <ContactHero />
    </SmoothScroll>
  );
}
