import SectionTitle from "@/components/common/SectionTitle";
import FeatureCard from "@/components/home/FeatureCard";
import { features } from "@/data/siteContent";

export default function FeaturesSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <SectionTitle
        eyebrow="Capabilities"
        title="Built on multimodal intelligence"
        subtitle="Our system fuses audio and visual signals through state-of-the-art deep learning models to deliver nuanced mental health insights."
      />

      <div className="mt-12 grid gap-6 overflow-hidden sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f, i) => (
          <FeatureCard key={f.title} {...f} index={i} total={features.length} />
        ))}
      </div>
    </section>
  );
}
