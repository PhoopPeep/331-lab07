export interface Event {
  id: number
  category: string
  title: string
  description: string
  location: string
  date: string
  time: string
  petsAllowed: boolean
  organizer: string
}

export interface Organizer {
    id: number
    title: string
    location: string
    organizer: string
}

export interface MessageState {
  message: string
}

export interface EventState {
  event: Event | null
}
