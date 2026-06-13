import { motion } from "framer-motion";
import { FadeUp, FeatureCard, SectionLabel, stagger } from "./components";
import { BodyContainer, WrapperContainer } from "@/components/containers/Container";

const FEATURES = [
  {
    iconBg: "#FAECE7",
    iconColor: "#993C1D",
    title: "Map discovery",
    description:
      "See what's happening near you on a live map. Filter by category, distance, and date.",
    icon: (
      <>
        <path d="M8 2C5.2 2 3 4.2 3 7c0 3.5 5 8 5 8s5-4.5 5-8c0-2.8-2.2-5-5-5z" />
        <circle cx="8" cy="7" r="1.5" />
      </>
    ),
  },
  {
    iconBg: "#E1F5EE",
    iconColor: "#0F6E56",
    title: "Event creation",
    description:
      "Create public or private events, sell tickets, add co-hosts, and manage attendees.",
    icon: (
      <>
        <rect x="2" y="3" width="12" height="11" rx="2" />
        <path d="M5 1v3M11 1v3M2 7h12" />
      </>
    ),
  },
  {
    iconBg: "#EEEDFE",
    iconColor: "#534AB7",
    title: "Community",
    description:
      "Follow organisers, get invited to private events, and build your local network.",
    icon: (
      <>
        <circle cx="6" cy="6" r="2.5" />
        <path d="M1.5 14c0-2.5 2-4.5 4.5-4.5" />
        <circle cx="12" cy="6" r="2.5" />
        <path d="M9.5 10a4.5 4.5 0 0 1 5 4" />
      </>
    ),
  },
];

const FeaturesSection = () => (
  <section id="features" className="pt-6 sm:pt-12 pb-8 sm:pb-16">
    <BodyContainer>
      <FadeUp className="mb-5 sm:mb-8">
        <SectionLabel>What I'm building</SectionLabel>
      </FadeUp>

      <motion.div
        variants={stagger(0.08)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-3"
      >
        {FEATURES.map((f) => (
          <FeatureCard key={f.title} {...f} />
        ))}
      </motion.div>
    </BodyContainer>
  </section>
);

export default FeaturesSection;
