// The order of rooms in the lab. Each room is a DOM <section> with this id and
// a camera shot in components/scene/layout.ts at the same index.

export const rooms = [
  { id: "entrance", name: "Entrance" },
  { id: "signal", name: "Signal" },
  { id: "omnidimension", name: "OmniDimension" },
  { id: "spyne", name: "Spyne" },
  { id: "ajnabee", name: "Ajnabee" },
  { id: "lab", name: "The Lab" },
  { id: "about", name: "About" },
  { id: "capabilities", name: "Capabilities" },
  { id: "record", name: "Record" },
  { id: "contact", name: "Contact" },
] as const;

export type RoomId = (typeof rooms)[number]["id"];

export const ROOM_COUNT = rooms.length;

export const roomIndex = (id: RoomId) => rooms.findIndex((r) => r.id === id);
