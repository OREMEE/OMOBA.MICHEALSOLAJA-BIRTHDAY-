// Central place for all event content. Edit this file to re-purpose the
// site for a different celebrant/date without touching component code.

export const EVENT = {
  honoreeName: "Omoba. Micheal Olusola Solaja",
  honoreeFirstName: "Micheal",
  age: 80,
  tagline: "A life well lived. A legacy we celebrate.",
  date: "Saturday, 14 November 2026",
  isoDate: "2026-11-14T16:00:00",
  time: "12:00 PM till 6:00 PM",
  venueName: "Grand Heritage Hall",
  venueAddress: "123 Jubilee Avenue, Ikeja, Lagos",
  mapUrl: "https://maps.google.com",
  dressCode: "Smart & Elegant — Touch of Gold",
  rsvpDeadline: "10th October 2026",
  guestName: "Guest",
  // accessLevel: "VIP",
  uniqueCode: "SAM80-VIP-0128",
};

export const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Event Details", to: "/event-details" },
  { label: "Schedule", to: "/schedule" },
  { label: "Gallery", to: "/gallery" },
  { label: "RSVP", to: "/rsvp" },
  { label: "Contact", to: "/contact" },
];

export const HIGHLIGHTS = [
  { icon: "Utensils", text: "Dinner & Drinks" },
  { icon: "Music", text: "Music & Entertainment" },
  { icon: "Mic2", text: "Speeches & Tributes" },
  { icon: "Heart", text: "Memories to Treasure" },
];

export const SCHEDULE = [
  { time: "12:00 PM", title: "Opening Prayer & Welcoming Of Guest", desc: "Guests are received with drinks and live acoustic music." },
  { time: "1:00 PM", title: "Grand Entrance", desc: "The celebrant's grand entrance and opening toast." },
  { time: "2:30 PM", title: "Dinner is Served", desc: "A curated three-course dinner for all guests." },
  { time: "3:45 PM", title: "Tributes & Speeches", desc: "Family and friends share memories and blessings." },
  { time: "4:30 PM", title: "Cake Cutting", desc: "The celebrant cuts the 80th birthday cake." },
  { time: "5:00 PM", title: "Dancing & Entertainment", desc: "Live band, DJ, and dancing till 6:00 PM." },
];

export const GALLERY_IMAGES = Array.from({ length: 9 }).map((_, i) => ({
  id: i + 1,
  caption: `Memory ${i + 1}`,
  src: `/gallery-${i + 1}.jpg`,
}));

export const HERO_IMAGE = "/hero.jpg";

export const CONTACTS = [
  { label: "Event Coordinator", name: "Miss. Oreoluwa Ogundairo", phone: "+234 701 860 7818", email: "oreoluwaogundairo1@gmail.com" },
  { label: "RSVP Enquiries", name: "Tunde Bello", phone: "+234 802 345 6789", email: "rsvp@adeyemi80.com" },
];