import {Booking} from "./property.component";

export interface Property {
    propertyName?: string;
    pricePerNight?: string;
    checkInTime?: string;
    checkOutTime?: string;

    isRefundable?: boolean;
    cleaningFee?: number;
    bathroomCnt?: number;
    bookings?: Booking[];
}
