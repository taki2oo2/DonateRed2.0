"use server"

import { v1 } from "@googlemaps/places";
const { PlacesClient } = v1;
import { NotFoundError } from "@/lib/errors";
import handleError from "@/lib/errHandler";

const placesClient = new PlacesClient({
  apiKey: process.env.GOOGLE_MAPS_API_KEY,
});

export const autocomplete = async (
  input: string
): Promise<ActionResponse<PlaceData[]>> => {
  if (!input.trim()) {
    return { success: true, data: [] };
  }

  const regionCode = "IN";
  const includedRegionCodes = ["in"];

  try {
    const req = {
      input,
      includedPrimaryTypes: ["(cities)"],
      languageCode: "en",
      regionCode,
      includedRegionCodes,
    };

    const response = await placesClient.autocompletePlaces(req);
    const suggestions = response[0].suggestions || [];

    const data = suggestions.map((s) => ({
      place_id:
        s.placePrediction?.placeId || s.placePrediction?.place || "",
      formatted_address: s.placePrediction?.text?.text || "",
    }));

    return { success: true, data };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
};

export const callSearchText = async (
  city: string
): Promise<ActionResponse<BloodBank[]>> => {
  if (!city.trim()) {
    return { success: false, error: { message: "City name is required" } };
  }

  const textQuery = `blood bank in ${city}`;

  const request = {
    textQuery,
    maxResultCount: 20,
  };

  const callOptions = {
    otherArgs: {
      headers: {
        "X-Goog-FieldMask":
          "places.displayName,places.formattedAddress," +
          "places.internationalPhoneNumber,places.googleMapsUri",
      },
    },
  };

  try {
    const [response] = await placesClient.searchText(request, callOptions);
    const places = response.places || [];

    if (places.length === 0) {
      throw new NotFoundError(textQuery);
    }

    const data = places.map((place) => ({
      name: place.displayName?.text || "",
      address: place.formattedAddress || "",
      contactNo: place.internationalPhoneNumber || "",
      link: place.googleMapsUri || "",
    }));

    return { success: true, data };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
};