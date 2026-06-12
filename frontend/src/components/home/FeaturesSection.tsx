"use client";

import SectionTitle from "@/components/common/SectionTitle";
import FeatureCard from "@/components/home/FeatureCard";
import { useI18n } from "@/components/common/I18nProvider";

export default function FeaturesSection() {
  const { t } = useI18n();

  const features = [
    {
      title: t("features.audio.title"),
      description: t("features.audio.desc"),
      icon: "waveform",
    },
    {
      title: t("features.video.title"),
      description: t("features.video.desc"),
      icon: "video",
    },
    {
      title: t("features.fusion.title"),
      description: t("features.fusion.desc"),
      icon: "layers",
    },
    {
      title: t("features.privacy.title"),
      description: t("features.privacy.desc"),
      icon: "shield",
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <SectionTitle
        eyebrow={t("features.eyebrow")}
        title={t("features.title")}
        subtitle={t("features.subtitle")}
      />

      <div className="mt-12 grid gap-6 overflow-hidden sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f, i) => (
          <FeatureCard key={f.title} {...f} index={i} total={features.length} />
        ))}
      </div>
    </section>
  );
}
