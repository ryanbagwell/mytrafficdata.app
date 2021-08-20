interface FirebaseUserProfileData {
  displayName?: string
  photoURL?: string
  uid?: string | null
  email?: string
  phoneNumber?: string
}

interface ExtraUserProfileData {
  firstName?: string
  lastName?: string
  address?: string
  city?: string
  state?: string
  zip?: string
}

type UserProfileData = FirebaseUserProfileData & ExtraUserProfileData

interface Location {
  id: string
  name: string
  address: string
  city: string
  state: string
  zip: string
  ownerId: string
  speedLimit: number
}
