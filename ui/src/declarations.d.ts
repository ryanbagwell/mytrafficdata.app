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
  speedLimit: string;
  isPublic: boolean;
}

export interface LocationPageProps {
  locationTitle: string;
  locationSlug: string;
  locationId: string;
  tabName?: string;
  navigate: Function;
}

export interface DailySummary {
  dateString: string;
  dateTimestamp: number;
  location: FirebaseFirestore.DocumentReference;
  totalVolume: number;
  speedsByHour: Record<number, number[]>
  volumeByHour: number[];
  averageSpeedByHour: number[];
  maxSpeed?: number;
}

export interface RawVehicleCount {
  correctedSpeed: number;
  countDateTime: string;
  countTimestamp: number;
  endTime: number;
  location: string;
  magnitude: number;
  measuredSpeed: number;
  startTime: number;
}