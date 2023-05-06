import getDisplayName from "./getDisplayName";

const NOMINATIM_BASE_URI = 'https://photon.komoot.io/api/?' // must have "https:"

export default function autoCompleteDestinationOptions(destination, setDestinationOptions) {
    const delayDebounceFn = setTimeout(() => {
        // Send Axios request here
        const params = {
            q: destination,
            limit: 5
        };
        const queryString = new URLSearchParams(params).toString();
        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
        }
        fetch(`${NOMINATIM_BASE_URI}${queryString}`, requestOptions)
            .then((response) => {
                return response.text()
            })
            .then((result) => {
                const result_json = JSON.parse(result)
                if(getDisplayName(result_json.features[0]) !== destination){
                    setDestinationOptions(result_json.features)
                }
            })
            .catch((err) => console.log("getting coordinates err:", err))
    }, 1000)

    return () => clearTimeout(delayDebounceFn)
}