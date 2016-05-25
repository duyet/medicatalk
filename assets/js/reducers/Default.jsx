define (['redux', '../Actions'], 
function (Redux, Actions) {
    const { REDIRECT_TO } = Actions
    const initialState = {
    }

    return (state = initialState, action)  => {
        switch (action.type) {
            case REDIRECT_TO:
                console.log('Redirect to ', action.to)
                window.location.hash = action.to
                return state

            default:
                return state
            }
    }
})
