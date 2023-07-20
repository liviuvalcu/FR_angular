export interface SignUpRequest{
  firstName?: string

  lastName?: string

  email?: string

  password?: string
}

export interface UserBean{
  email?: string

  userPassword?: string

  gender?: any

  about?: string

  phone?: string

  address?: string

  fname?: string

  mInitial?: string

  lName?: string

  emEmail?: string

  emCountryCode?: string

  emPhone?: string
}

export interface PropertyBean{
  propertyName?: string

  zipcode?: number

  bathroomCnt?: number

  bedroomCnt?: number

  guestNum?: number

  pricePerNight?: number

  cleaningFee?: number

  created?: any

  checkInTime?: any

  checkOutTime?: any

  isRefundable?: any

  cancellationPeriod?: number

  cancellationType?: string

  refundRate?: number

  street?: string

  city?: string

  stateofResidence?: string

  country?: string

  taxRate?: number

  hostEmail?: string
}

export type UserType = string | 'GUEST' | 'HOST'

export default interface RegistrationDao{
  signUpRequest?: SignUpRequest

  userBean?: UserBean

  userType?: UserType

  propertyBean?: PropertyBean
}
