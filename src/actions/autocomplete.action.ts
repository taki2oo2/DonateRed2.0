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