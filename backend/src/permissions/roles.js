const ALL = ["view", "create", "edit", "delete", "approve", "publish", "export"];
const RESOURCE_TYPES = ["packages","tours","destinations","itineraries","activities","visas","hotels","offers","coupons","gallery","blogs","testimonials","reviews","bookings","inquiries","customers","collaborators","b2b-requests","payments","seo","users","settings"];
const full = Object.fromEntries(RESOURCE_TYPES.map((key) => [key, ALL]));
const roles = {
  super_admin: full,
  admin: Object.fromEntries(RESOURCE_TYPES.filter((key) => key !== "users").map((key) => [key, ALL])),
  "Booking Manager": { bookings: ALL, inquiries: ["view","create","edit","export"], customers: ["view","edit"], packages: ["view"], payments: ["view"] },
  "Package Manager": { packages: ALL, destinations: ALL, itineraries: ALL, activities: ALL, hotels: ["view","edit"], gallery: ["view","create","edit"] },
  "Content Manager": { destinations: ALL, blogs: ALL, testimonials: ALL, gallery: ALL, seo: ALL, packages: ["view","edit"] },
  "Visa Manager": { visas: ALL, inquiries: ["view","create","edit","export"], customers: ["view"] },
  "Finance Manager": { payments: ["view","edit","approve","export"], bookings: ["view","export"], customers: ["view"] },
  "Support Staff": { bookings: ["view","edit"], inquiries: ["view","create","edit"], customers: ["view","edit"] },
};
const can = (role, resource, action) => Boolean(roles[role]?.[resource]?.includes(action));
module.exports = { roles, can, RESOURCE_TYPES };
