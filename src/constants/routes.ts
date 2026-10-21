const ROUTES = {
    POST_CAMP: "/postcamp",
    BLOOD_BANKS:"/blood-banks",
    DONATE:"/donateBlood",
    DONATION_CAMP:"/donationcamps",
    FIND_DONORS:"/finddonors",
    GET_STARTED:"/getStarted",
    PROFILE: (id: string) => `/profile/${id}`,
    USER_CAMPS: (id: string) => `/profile/${id}/camps`,
    FORGOTPASSWORD:"/forgotpassword"
}

export default ROUTES;