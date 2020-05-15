import { createStore } from 'redux'

const initalState = {
    initial: "state"
}

function reducer(state = initalState, action) {
    switch (action.type) {
        case '':

            break;

        default:
            return state
    }
}

const store = createStore(reducer)

export default store;