export interface FirebaseUserProfileData {
  displayName?: string
  photoURL?: string
  uid?: string | null
  email?: string
  phoneNumber?: string
}

export interface ExtraUserProfileData {
  firstName?: string
  lastName?: string
  address?: string
  city?: string
  state?: string
  zip?: string
}

type UserProfileData = FirebaseUserProfileData & ExtraUserProfileData

export interface Location {
  id: string
  name: string
  address: string
  city: string
  state: string
  zip: string
  ownerId: string
  owner: string // a firebase reference field
  slug: string
  speedLimit: number
  isPublic: boolean;
}

export interface LocationPageProps {
  locationTitle: string
  locationSlug: string
  locationId: string
}
