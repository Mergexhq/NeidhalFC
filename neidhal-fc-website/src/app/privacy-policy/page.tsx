import React from "react";
import type { Metadata } from "next";
import PrivacyPolicyContent from "@/modules/utility/PrivacyPolicyContent";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Official Privacy Policy of Neidhal Football Club. How we protect your data.",
};

export default function DirectPrivacyPolicyPage() {
  return <PrivacyPolicyContent />;
}
