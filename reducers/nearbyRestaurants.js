import axios from "axios"

export const LOAD_ALL_VENUES = "LOAD_ALL_VENUES"

export const loadAllVenues = (allVenues) => {
    return {
        type: LOAD_ALL_VENUES,
        allVenues
    }
}
export default function reducer(state = [], action){
    switch(action.type){
        case LOAD_ALL_VENUES:
            return action.allVenues
    }
}

export const allVenues = () => dispatch => {
    axios.get("https://api.foursquare.com/v2/venues/search")
    .then(res => res.data)
    .then(allThings => {
        console.log("Inside allVenues thunk")
        dispatch(loadAllVenues(allThings))
    })

}
