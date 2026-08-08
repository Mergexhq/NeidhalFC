import React from "react";
import type { Metadata } from "next";
import TermsAndConditionsContent from "@/modules/utility/TermsAndConditionsContent";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Official Terms and Conditions of Neidhal Football Club. Rules governing academy memberships.",
};

export default function DirectTermsAndConditionsPage() {
  return <TermsAndConditionsContent />;
}
