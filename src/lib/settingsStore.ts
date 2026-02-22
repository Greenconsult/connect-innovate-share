// Site-wide settings – stored as a single JSONB row in site_settings table

import { supabase } from "./supabase";

// ── Types ───────────────────────────────────────────────────────────

export interface FeatureItem {
  title: string;
  description: string;
  icon: string;        // Lucide icon name, e.g. "BookOpen"
}

export interface ObjectiveItem {
  title: string;
  description: string;
  icon: string;
}

export interface TravelOption {
  title: string;
  description: string;
}

export interface NavLinkItem {
  label: string;
  to: string;
  visible: boolean;
}

export interface SiteSettings {
  // Branding
  brandName: string;
  siteTitle: string;
  siteTagline: string;

  // Navigation
  navLinks: NavLinkItem[];

  // Home – Hero
  heroTitle: string;
  heroImageUrl: string;       // empty = use bundled default
  heroBadges: string[];
  heroButton1Label: string;
  heroButton1Link: string;
  heroButton2Label: string;
  heroButton2Link: string;

  // Home – About preview
  aboutPreviewHeading: string;
  aboutPreviewText: string;

  // Home – Features
  featuresHeading: string;
  features: FeatureItem[];

  // Home – CTA
  ctaHeading: string;
  ctaText: string;
  ctaButton1Label: string;
  ctaButton1Link: string;
  ctaButton2Label: string;
  ctaButton2Link: string;

  // Home – Editions
  editionsHeading: string;
  editionsSubtext: string;

  // About page
  aboutPageTitle: string;
  aboutPageSubtitle: string;
  aboutPageHeading: string;
  aboutPageParagraphs: string[];
  objectivesHeading: string;
  objectives: ObjectiveItem[];

  // Venue page
  venueAddress: string;
  venueAddressLine2: string;
  venuePostcode: string;
  venueMapUrl: string;
  travelOptions: TravelOption[];

  // Contact page
  contactEmail: string;
  contactPhone: string;
  contactDepartment: string;
  contactAddress: string;

  // Footer
  footerTitle: string;
  footerTagline: string;
  footerContactLines: string[];
  footerEmail: string;
  footerCopyright: string;
}

// ── Defaults (match current hardcoded content) ──────────────────────

export const DEFAULT_SETTINGS: SiteSettings = {
  // Branding
  brandName: "REC 2026",
  siteTitle: "Research and Employability Corner",
  siteTagline: "Showcasing Research. Shaping Careers.",

  // Navigation
  navLinks: [
    { label: "Home", to: "/", visible: true },
    { label: "Speakers", to: "/speakers", visible: true },
    { label: "Schedule", to: "/schedule", visible: true },
    { label: "Proceedings", to: "/proceedings", visible: true },
    { label: "Committee", to: "/committee", visible: true },
    { label: "Venue", to: "/venue", visible: true },
    { label: "Contact", to: "/contact", visible: true },
  ],

  // Home – Hero
  heroTitle: "Research and Employability Corner",
  heroImageUrl: "",
  heroBadges: ["Engaging Sessions", "City Campus", "Open to All Students"],
  heroButton1Label: "View Proceedings",
  heroButton1Link: "/proceedings",
  heroButton2Label: "View Schedule",
  heroButton2Link: "/schedule",

  // Home – About preview
  aboutPreviewHeading: "About the Initiative",
  aboutPreviewText:
    "Research Corner is a vibrant platform where undergraduate students, postgraduate students, and recent graduates can showcase their research, exchange ideas, and build lasting collaborations with peers, academics, and industry partners.",

  // Home – Features
  featuresHeading: "Why Attend?",
  features: [
    {
      icon: "BookOpen",
      title: "Present Your Research",
      description:
        "Share your findings with an engaged academic and industry audience and receive valuable feedback.",
    },
    {
      icon: "Briefcase",
      title: "Network & Collaborate",
      description:
        "Connect with peers, alumni, faculty, and industry professionals.",
    },
    {
      icon: "TrendingUp",
      title: "Build Your Profile",
      description:
        "Gain experience in academic presentation, work toward publications and connect with Industry for employment.",
    },
  ],

  // Home – CTA
  ctaHeading: "Ready to Participate?",
  ctaText:
    "Whether you want to present your research or attend as an audience member, Research Corner welcomes you.",
  ctaButton1Label: "View Proceedings",
  ctaButton1Link: "/proceedings",
  ctaButton2Label: "Get in Touch",
  ctaButton2Link: "/contact",

  // Home – Editions
  editionsHeading: "Editions",
  editionsSubtext:
    "Browse past and upcoming editions of the Research and Employability Corner.",

  // About page
  aboutPageTitle: "About",
  aboutPageSubtitle: "Learn more about the Research Corner initiative",
  aboutPageHeading: "About Research Corner",
  aboutPageParagraphs: [
    "Research Corner is a proposed initiative under the School of Computing and Mathematical Sciences at the University of Wolverhampton. The event aims to create a vibrant platform where undergraduate students, postgraduate students, and recent graduates can showcase their research, exchange ideas, and build lasting collaborations with peers, academics, and industry partners.",
    "Each session features research presentations, panel discussions, and networking opportunities designed to promote innovation, academic excellence, and professional growth.",
    "Sessions are held bi-monthly, each lasting 2–3 hours at the City Campus. The audience includes undergraduate and postgraduate students, recent graduates, academic staff and researchers, and industry representatives.",
  ],
  objectivesHeading: "Core Objectives",
  objectives: [
    {
      icon: "BookOpen",
      title: "Enhance Research Skills",
      description:
        "Foster a culture of inquiry and critical thinking by exposing students to diverse research methods, presentation styles, and emerging research areas.",
    },
    {
      icon: "Users",
      title: "Promote Collaboration",
      description:
        "Strengthen collaboration between students, alumni, and industry professionals, bridging the gap between academic research and real-world applications.",
    },
    {
      icon: "FileText",
      title: "Encourage Publications",
      description:
        "Motivate students to transform their projects and dissertations into conference papers or journal publications, with guidance from faculty.",
    },
    {
      icon: "Handshake",
      title: "Mentorship & Networking",
      description:
        "Create mentorship links between graduates and current students to encourage continued academic and professional development.",
    },
    {
      icon: "Lightbulb",
      title: "Showcase Innovation",
      description:
        "Provide a platform for sharing innovative ideas and research outcomes that can influence future projects or partnerships.",
    },
  ],

  // Venue page
  venueAddress: "City Campus, University of Wolverhampton",
  venueAddressLine2: "Wolverhampton, WV1 1LY, United Kingdom",
  venuePostcode: "WV1 1LY",
  venueMapUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2422.5!2d-2.1288!3d52.5886!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4870942d0e7a3c3b%3A0x5e3e5e3e5e3e5e3e!2sSpringfield%20Campus%2C%20University%20of%20Wolverhampton!5e0!3m2!1sen!2suk!4v1700000000000",
  travelOptions: [
    {
      title: "By Train",
      description:
        "Wolverhampton railway station is a 15-minute walk from City Campus. Regular services run from Birmingham New Street.",
    },
    {
      title: "By Bus",
      description:
        "Several bus routes serve the campus area. Check National Express West Midlands for timetables.",
    },
    {
      title: "By Car",
      description:
        "Limited parking is available on campus. We recommend using public transport where possible.",
    },
  ],

  // Contact page
  contactEmail: "researchcorner@wlv.ac.uk",
  contactPhone: "+44 (0)7438 023912",
  contactDepartment: "Department of Computing & Mathematical Sciences",
  contactAddress:
    "University of Wolverhampton\nCity Campus, Wolverhampton, WV1 1LY",

  // Footer
  footerTitle: "Research and Employability Corner",
  footerTagline: "Showcasing Research. Shaping Careers.",
  footerContactLines: [
    "Department of Computing & Mathematical Sciences",
    "University of Wolverhampton",
    "City Campus, Wolverhampton",
  ],
  footerEmail: "researchcorner@wlv.ac.uk",
  footerCopyright:
    "University of Wolverhampton. All rights reserved.",
};

// ── CRUD ────────────────────────────────────────────────────────────

export async function getSettings(): Promise<SiteSettings> {
  const { data, error } = await supabase
    .from("site_settings")
    .select("settings")
    .eq("id", "default")
    .maybeSingle();

  if (error) throw error;

  // Merge stored values over defaults so new keys always have a fallback
  return { ...DEFAULT_SETTINGS, ...((data?.settings as Partial<SiteSettings>) ?? {}) };
}

export async function saveSettings(settings: SiteSettings): Promise<void> {
  const { error } = await supabase.from("site_settings").upsert({
    id: "default",
    settings: settings as unknown as Record<string, unknown>,
    updated_at: new Date().toISOString(),
  });
  if (error) throw error;
}
