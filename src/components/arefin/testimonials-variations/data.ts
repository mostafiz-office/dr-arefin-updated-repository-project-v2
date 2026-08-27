/**
 * Real Stories — Google Reviews data source (Phase 1: hardcoded)
 *
 * Schema mirrors Google Places API `place.reviews[]` so a Phase 2 swap
 * (Featurable / Google Places API via Lovable Cloud) is a one-file change.
 *
 * Source business: Hepatobiliary Surgeon Dr. Murshidul Arefin
 * Google CID: 15108412135090448897 · kgmid: /g/11xv4xzykl
 *
 * NOTE: These are PLACEHOLDER reviews modelled on Dr. Arefin's specialty
 * (hepatobiliary, pancreatic & liver-transplant surgery). Replace with the
 * real review text from the Google Maps listing before going live. The
 * structure must NOT change — only the field values.
 */

export type GoogleReview = {
  author_name: string;
  author_initial: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  relative_time_description: string;
  language: "en" | "bn";
  source_url: string;
};

export type AggregateRating = {
  rating: number;
  total: number;
  source_url: string;
  business_name: string;
};

export const GOOGLE_AGGREGATE: AggregateRating = {
  rating: 5.0,
  total: 42,
  source_url:
    "https://www.google.com/maps/place/Hepatobiliary+Surgeon+Dr.+Murshidul+Arefin/data=!4m2!3m1!1s0x0:0xd1abdcca00446a01",
  business_name: "Hepatobiliary Surgeon Dr. Murshidul Arefin",
};

export const GOOGLE_REVIEWS: GoogleReview[] = [
  {
    author_name: "Sadia Rahman",
    author_initial: "S",
    rating: 5,
    text: "Dr. Arefin saved my father's life. After being told his liver condition was beyond hope at two other hospitals, Dr. Arefin's team performed a complex surgery and explained every step with patience. Six months on, my father is back to morning walks. Forever grateful.",
    relative_time_description: "2 weeks ago",
    language: "en",
    source_url: GOOGLE_AGGREGATE.source_url,
  },
  {
    author_name: "Mohammad Karim",
    author_initial: "M",
    rating: 5,
    text: "অসাধারণ একজন সার্জন। আমার পিত্তথলির জটিল অপারেশন উনি অত্যন্ত দক্ষতার সাথে সম্পন্ন করেছেন। হাসপাতালে থাকাকালীন প্রতিদিন নিজে এসে দেখে গেছেন। এমন মানবিক ডাক্তার বিরল।",
    relative_time_description: "1 month ago",
    language: "bn",
    source_url: GOOGLE_AGGREGATE.source_url,
  },
  {
    author_name: "Rashed Iqbal",
    author_initial: "R",
    rating: 5,
    text: "I came to Dr. Arefin for a pancreatic mass that other surgeons refused to operate on. He took the time to study every scan, consulted with the family in clear language, and the surgery was a complete success. Truly world-class hepatobiliary expertise in Dhaka.",
    relative_time_description: "3 weeks ago",
    language: "en",
    source_url: GOOGLE_AGGREGATE.source_url,
  },
  {
    author_name: "Nasreen Akter",
    author_initial: "N",
    rating: 5,
    text: "Highly skilled and very kind. My mother had a liver tumour and Dr. Arefin handled the entire process — diagnosis, surgery, and follow-up — with deep care. The whole team is professional. Recovery was much faster than we expected.",
    relative_time_description: "2 months ago",
    language: "en",
    source_url: GOOGLE_AGGREGATE.source_url,
  },
  {
    author_name: "Tariq Hasan",
    author_initial: "T",
    rating: 5,
    text: "Best hepatobiliary surgeon I have met. Performed minimally invasive bile duct surgery on me. Two small incisions, home in three days, no chronic pain. The follow-up calls from the team made me feel like family.",
    relative_time_description: "1 month ago",
    language: "en",
    source_url: GOOGLE_AGGREGATE.source_url,
  },
  {
    author_name: "Farhana Begum",
    author_initial: "F",
    rating: 5,
    text: "ডা. আরেফিন স্যার আমার ভাইয়ের লিভার ট্রান্সপ্ল্যান্ট সফলভাবে সম্পন্ন করেছেন। অপারেশনের আগে এবং পরে সবসময় পাশে ছিলেন। তাঁর দলের প্রতিটি সদস্য অসাধারণ। ধন্যবাদ স্যার।",
    relative_time_description: "5 weeks ago",
    language: "bn",
    source_url: GOOGLE_AGGREGATE.source_url,
  },
  {
    author_name: "Imran Chowdhury",
    author_initial: "I",
    rating: 5,
    text: "Compassionate, precise, and incredibly knowledgeable. Dr. Arefin treated my chronic gallbladder issue after years of misdiagnosis elsewhere. His explanation was clear, the surgery was smooth, and recovery was remarkable. A true gift to Bangladesh's medical community.",
    relative_time_description: "6 weeks ago",
    language: "en",
    source_url: GOOGLE_AGGREGATE.source_url,
  },
  {
    author_name: "Ayesha Sultana",
    author_initial: "A",
    rating: 5,
    text: "Trusted Dr. Arefin with my husband's liver surgery and could not have made a better decision. He answered every question with patience, the operation was successful, and the post-op care was outstanding. Honest, skilled, and genuinely caring.",
    relative_time_description: "3 months ago",
    language: "en",
    source_url: GOOGLE_AGGREGATE.source_url,
  },
];
