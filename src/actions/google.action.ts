"use server"

import { v1 } from '@googlemaps/places';
const { PlacesClient } = v1;

const placesClient = new PlacesClient({
  apiKey: process.env.GOOGLE_MAPS_API_KEY,
});



export const autocomplete = async (input: string): Promise<PlaceData[]> => {
    
    if (!input) return [];
    const regionCode = 'IN';
    const includedRegionCodes = ['in'];
    try {
        const req = {
            input,
            includedPrimaryTypes: ['(cities)'],
            languageCode: 'en',
            regionCode,
            includedRegionCodes,
        }
        const response = await placesClient.autocompletePlaces(req);
        const suggestions = response[0].suggestions || [];
        return suggestions.map((s) => ({
            place_id: s.placePrediction?.placeId || s.placePrediction?.place || "",
            formatted_address: s.placePrediction?.text?.text || "",
        }));
    } catch (error) {
        console.error("Autocomplete error:", error);
        return [];
    }
}


export const callSearchText = async(city:string) => {
    const textQuery = `blood bank in ${city}`;

    const request = {
      textQuery,
      maxResultCount: 20,
      
    };

    const callOptions = {
      otherArgs: {
        headers: {
          'X-Goog-FieldMask':
            'places.displayName,places.formattedAddress,' +
            'places.internationalPhoneNumber,places.googleMapsUri',
        },
      },
    };


    try {
        const [response] = await placesClient.searchText(request, callOptions);
        const places = response.places || [];

        if (places.length === 0) {
        console.log(`No blood banks found for "${textQuery}".`);
        return}

        return places.map((place) => ({
        name: place.displayName?.text || null,
        address: place.formattedAddress || null,
        contactNo: place.internationalPhoneNumber || null,
        link: place.googleMapsUri || null,
      }));


    } catch (error) {
        console.error('Places API request failed:');
      return [];
    }
}