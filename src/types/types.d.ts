type Camp = {
  id: number;
  title: string;
  organizer: string;
  date: string;
  time: string;
  desc: string;
  status: string;
  imageUrl: string;
}

type Donor = {
  name: string
  bloodGroup: string
  location: string
  email: string
  phone: string
}

type DonorCardProps = {
  donor?: Donor
}

type PlaceData = {
  place_id: string;
  formatted_address: string;
}

type BloodBank = {
  name:string;
  address:string;
  contactNo:string;
  link:string;
}

type ActionResponse<T = null> = {
  success: boolean;     
  data?: T;             
  error?: {             
    message: string;   
    details?: Record<string, string[]>; 
  },
  status?: number       
}

type ErrorResponse = ActionResponse<undefined> & { success: false };
type SuccessResponse<T = null> = ActionResponse<T> & { sucess: true };
type APIErrorResponse = NextResponse<ErrorResponse>
type APISuccessResponse<T> = NextResponse<SuccessResponse<T>>
type APIResponse<T = null> = NextResponse<SuccessResponse<T> | ErrorResponse>;

type User = {
  clerkid: string;
  fullname: string;
  email: string;
  contactno: string;
  city: string;
  isDonar: boolean;
}