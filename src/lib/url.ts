// query-string is a library that helps convert URLs into Objects and vice versa
import qs from 'query-string';

/** * INTERFACE: Defines the structure of the data needed to build a URL 
 * params: The current URL string (e.g., "?query=react&page=1")
 * key: The specific parameter name we want to change (e.g., "query")
 * value: The new value for that key (e.g., "nextjs")
 */
interface QueryProps {
    params: string;
    key: string;
    value: string;
}

/** * INTERFACE: Defines data needed to remove parameters
 * KeysToRemove: An array of strings representing the keys we want to delete
 */
interface RemoveQueryProps {
    params: string;
    KeysToRemove: string[];
}

/**
 * FUNCTION: formUrlQuery
 * Purpose: Takes the current URL, adds or updates a specific key/value, and returns a string
 */
export const formUrlQuery = ({ params, key, value }: QueryProps) => {
    // 1. Convert the string (params) into a JavaScript Object (e.g., {query: 'react'})
    const QueryUrl = qs.parse(params);

    // 2. Add or update the key in that object with our new value
    QueryUrl[key] = value;

    // 3. Convert that object back into a clean URL string including the current path
    return qs.stringifyUrl({
        url: window.location.pathname, // Keeps the user on the same page (e.g., /community)
        query: QueryUrl               // Appends the updated object as ?key=value
    })
}

/**
 * FUNCTION: removeKeysFromQuery
 * Purpose: Removes specific parameters from the URL when they are no longer needed
 */
export const removeKeysFromQuery = ({ params, KeysToRemove }: RemoveQueryProps) => {
    // 1. Parse the current parameters into an Object
    const QueryUrl = qs.parse(params);

    // 2. Loop through the array of keys provided and delete them from the object
    KeysToRemove.map((key) => {
        delete QueryUrl[key]
    })

    // 3. Rebuild the URL, skipping any null or undefined values to keep it clean
    return qs.stringifyUrl({
        url: window.location.pathname,
        query: QueryUrl
    },
    { skipNull: true } // Ensures we don't end up with "?query=null"
    )
}