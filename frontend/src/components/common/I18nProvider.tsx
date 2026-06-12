"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export type Lang = "en" | "bn";

// Key translations — extend freely.
const DICT = {
  en: {
    // Nav
    "nav.home": "Home",
    "nav.predict": "Predict",
    "nav.about": "About",
    "nav.try": "Try Demo",

    // Hero
    "hero.badge": "Research demo · Powered by multimodal deep learning",
    "hero.titlePrefix": "Multimodal ",
    "hero.titleGradient": "Depression Detection System",
    "hero.description":
      "Multimodal depression detection using audio and video signals. Our model fuses vocal, facial, and emotional cues to deliver a fast, research-grade assessment — in a privacy-conscious interface.",
    "hero.start": "Start Prediction",
    "hero.learn": "Learn More",
    "hero.latency": "Latency",
    "hero.latencyValue": "~2s",
    "hero.modalities": "Modalities",
    "hero.modalitiesValue": "Audio + Video",
    "hero.storage": "Storage",
    "hero.storageValue": "In-memory only",

    // Features
    "features.eyebrow": "Capabilities",
    "features.title": "Built on multimodal intelligence",
    "features.subtitle":
      "Our system fuses audio and visual signals through state-of-the-art deep learning models to deliver nuanced mental health insights.",
    "features.audio.title": "Audio Analysis",
    "features.audio.desc":
      "Extracts tone, pitch, speech rate, and prosodic features to detect emotional patterns.",
    "features.video.title": "Video Analysis",
    "features.video.desc":
      "Captures facial expressions, gaze direction, and micro-movements using deep vision models.",
    "features.fusion.title": "Multimodal Fusion",
    "features.fusion.desc":
      "Combines audio and visual cues through cross-modal attention for higher accuracy.",
    "features.privacy.title": "Privacy First",
    "features.privacy.desc":
      "Uploaded media is processed in-memory and discarded immediately after inference. Nothing is persisted.",

    // How It Works
    "how.eyebrow": "How it works",
    "how.title": "Three steps from clip to assessment",
    "how.subtitle":
      "A transparent, low-friction pipeline — no account, no storage, no waiting.",
    "how.step1.title": "Upload a video",
    "how.step1.text":
      "Drop in a 10–30 second clip of a single speaker. One file powers both modalities.",
    "how.step2.title": "Multimodal analysis",
    "how.step2.text":
      "OpenSMILE extracts acoustic features and MediaPipe tracks facial cues — in parallel.",
    "how.step3.title": "Get your result",
    "how.step3.text":
      "Cross-modal attention fuses the signals and returns a depression-likelihood assessment.",

    // Testimonials
    "testimonials.eyebrow": "Testimonials",
    "testimonials.title": "Trusted by researchers & educators",

    // FAQ
    "faq.eyebrow": "FAQ",
    "faq.title": "Frequently asked questions",
    "faq.subtitle":
      "Quick answers to the things researchers, students, and curious users ask most.",

    // CTA
    "cta.badge": "Live Demo",
    "cta.title": "Ready to try the",
    "cta.titleAccent": "multimodal demo",
    "cta.description":
      "Upload a short video clip — the model extracts audio and facial features from the same file and fuses them into a depression-likelihood assessment.",
    "cta.check1": "No account required",
    "cta.check2": "Nothing stored",
    "cta.check3": "Result in ~2 seconds",
    "cta.button": "Start Prediction",

    // Feedback widget
    "feedback.button": "Feedback",
  },
  bn: {
    // Nav
    "nav.home": "হোম",
    "nav.predict": "প্রেডিক্ট",
    "nav.about": "সম্পর্কে",
    "nav.try": "ডেমো দেখুন",

    // Hero
    "hero.badge": "গবেষণা ডেমো · মাল্টিমোডাল ডিপ লার্নিং দ্বারা চালিত",
    "hero.titlePrefix": "মাল্টিমোডাল ",
    "hero.titleGradient": "ডিপ্রেশন সনাক্তকরণ সিস্টেম",
    "hero.description":
      "অডিও এবং ভিডিও সিগনাল ব্যবহার করে মাল্টিমোডাল ডিপ্রেশন সনাক্তকরণ। আমাদের মডেল কণ্ঠস্বর, মুখভঙ্গি এবং আবেগজনিত সংকেত একত্রিত করে দ্রুত, গবেষণা-মানের মূল্যায়ন প্রদান করে — একটি গোপনীয়তা-সচেতন ইন্টারফেসে।",
    "hero.start": "প্রেডিকশন শুরু করুন",
    "hero.learn": "আরও জানুন",
    "hero.latency": "লেটেন্সি",
    "hero.latencyValue": "~২সে",
    "hero.modalities": "মোডালিটি",
    "hero.modalitiesValue": "অডিও + ভিডিও",
    "hero.storage": "সংরক্ষণ",
    "hero.storageValue": "শুধু মেমোরিতে",

    // Features
    "features.eyebrow": "সক্ষমতা",
    "features.title": "মাল্টিমোডাল ইন্টেলিজেন্সের উপর নির্মিত",
    "features.subtitle":
      "আমাদের সিস্টেম অত্যাধুনিক ডিপ লার্নিং মডেলের মাধ্যমে অডিও এবং ভিজ্যুয়াল সংকেত একত্রিত করে সূক্ষ্ম মানসিক স্বাস্থ্য অন্তর্দৃষ্টি প্রদান করে।",
    "features.audio.title": "অডিও বিশ্লেষণ",
    "features.audio.desc":
      "কণ্ঠস্বর, পিচ, কথা বলার গতি এবং প্রসোডিক বৈশিষ্ট্য বিশ্লেষণ করে আবেগজনিত প্যাটার্ন সনাক্ত করে।",
    "features.video.title": "ভিডিও বিশ্লেষণ",
    "features.video.desc":
      "ডিপ ভিশন মডেল ব্যবহার করে মুখের অভিব্যক্তি, দৃষ্টিভঙ্গি এবং ক্ষুদ্র চলন ধারণ করে।",
    "features.fusion.title": "মাল্টিমোডাল ফিউশন",
    "features.fusion.desc":
      "উচ্চতর নির্ভুলতার জন্য ক্রস-মোডাল অ্যাটেনশনের মাধ্যমে অডিও এবং ভিজ্যুয়াল সংকেত একত্রিত করে।",
    "features.privacy.title": "প্রাইভেসি ফার্স্ট",
    "features.privacy.desc":
      "আপলোড করা মিডিয়া মেমোরিতে প্রক্রিয়া করা হয় এবং অনুমানের পরপরই বাতিল হয়ে যায়। কিছুই সংরক্ষিত থাকে না।",

    // How It Works
    "how.eyebrow": "কিভাবে কাজ করে",
    "how.title": "ভিডিও থেকে মূল্যায়ন — তিনটি ধাপে",
    "how.subtitle":
      "একটি স্বচ্ছ, কম-ঝামেলার পাইপলাইন — কোনো অ্যাকাউন্ট নেই, সংরক্ষণ নেই, অপেক্ষা নেই।",
    "how.step1.title": "একটি ভিডিও আপলোড করুন",
    "how.step1.text":
      "একক বক্তার ১০–৩০ সেকেন্ডের ক্লিপ দিন। একটি ফাইল উভয় মোডালিটি চালায়।",
    "how.step2.title": "মাল্টিমোডাল বিশ্লেষণ",
    "how.step2.text":
      "OpenSMILE অ্যাকোস্টিক বৈশিষ্ট্য বের করে এবং MediaPipe মুখভঙ্গি ট্র্যাক করে — সমান্তরালে।",
    "how.step3.title": "ফলাফল পান",
    "how.step3.text":
      "ক্রস-মোডাল অ্যাটেনশন সংকেত একত্রিত করে এবং ডিপ্রেশন-সম্ভাবনা মূল্যায়ন প্রদান করে।",

    // Testimonials
    "testimonials.eyebrow": "প্রশংসাপত্র",
    "testimonials.title": "গবেষক ও শিক্ষকদের আস্থা",

    // FAQ
    "faq.eyebrow": "প্রশ্নোত্তর",
    "faq.title": "প্রায়শই জিজ্ঞাসিত প্রশ্ন",
    "faq.subtitle":
      "গবেষক, শিক্ষার্থী এবং কৌতূহলী ব্যবহারকারীদের সবচেয়ে বেশি জিজ্ঞাসিত প্রশ্নগুলির দ্রুত উত্তর।",

    // CTA
    "cta.badge": "লাইভ ডেমো",
    "cta.title": "প্রস্তুত",
    "cta.titleAccent": "মাল্টিমোডাল ডেমোর জন্য",
    "cta.description":
      "একটি ছোট ভিডিও ক্লিপ আপলোড করুন — মডেল একই ফাইল থেকে অডিও এবং মুখভঙ্গির বৈশিষ্ট্য বের করে ডিপ্রেশন-সম্ভাবনার মূল্যায়নে একত্রিত করে।",
    "cta.check1": "কোনো অ্যাকাউন্ট প্রয়োজন নেই",
    "cta.check2": "কিছুই সংরক্ষিত হয় না",
    "cta.check3": "~২ সেকেন্ডে ফলাফল",
    "cta.button": "প্রেডিকশন শুরু করুন",

    // Feedback widget
    "feedback.button": "মতামত",
  },
} as const;

type Key = keyof (typeof DICT)["en"];

interface I18nCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: Key) => string;
}

const Ctx = createContext<I18nCtx>({
  lang: "en",
  setLang: () => {},
  t: (k) => k,
});

const STORAGE_KEY = "mdds-lang";

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY) as Lang | null;
    if (saved === "en" || saved === "bn") setLangState(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    window.localStorage.setItem(STORAGE_KEY, l);
  }, []);

  const t = useCallback(
    (key: Key) => DICT[lang][key] ?? DICT.en[key] ?? key,
    [lang],
  );

  return <Ctx.Provider value={{ lang, setLang, t }}>{children}</Ctx.Provider>;
}

export function useI18n() {
  return useContext(Ctx);
}
