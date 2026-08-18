type Camp = {
  _id: string;
  title: string;
  organizer: string;
  description: string;
  city: string;
  locationlink: string;
  imageurl: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  owner: string;
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
  name?: string | null
  address?: string | null
  contactNo?: string | null
  link?: string | null
}

type BloodBankCardProps = {
  bloodBank?: BloodBank
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

interface PaginationSearchParams{
  page?:number;
  pageSize?:number;
}

interface GetCampsParams extends PaginationSearchParams{
    city?:string;
}