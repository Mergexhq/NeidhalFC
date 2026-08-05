import React from "react";
import type { Metadata } from "next";
import PlayClient from "./PlayClient";

export const metadata: Metadata = {
  title: "Penalty Shootout | Neidhal FC",
  description: "Test your skills with Neidhal FC's interactive coastal penalty shootout game.",
};

export default function PlayPage() {
  return <PlayClient />;
}
