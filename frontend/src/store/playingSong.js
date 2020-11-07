
const playingSong = {

    state : {
        playingSong : null,
        playingSongObject : {},
        minutesDuration: "00",
        secondsDuration: "00",
        minutesCurrent: "00",
        secondsCurrent: "00",
    },
    getters : {
        getPlayingSong : (state) => {
            return state.playingSong
        },
        getPlayingSongPaused : (state) => {
            if(state.playingSong != null){
                return state.playingSong.paused
            } else {
                return true
            }
        },
        getPlayingSongObject : (state) => {
            return state.playingSongObject
        },
        getMinutesDuration : (state) => {
            return state.minutesDuration
        },
        getSecondsDuration : (state) => {
            return state.secondsDuration
        },
        getMinutesCurrent : (state) => {
            return state.minutesCurrent
        },
        getSecondsCurrent : (state) => {
            return state.secondsCurrent
        },
    },
    mutations : {
        setPlayingSong : (state,song) => {
            state.playingSong = song
        },
        setPlayingSongObject : (state,song) => {
            state.playingSongObject = song
        },
        setMinutesDuration : (state,duration) => {
            state.minutesDuration = duration
        },
        setSecondsDuration : (state,duration) => {
            state.secondsDuration = duration
        },
        setMinutesCurrent : (state,current) => {
            state.minutesCurrent = current
        },
        setSecondsCurrent : (state,current) => {
            state.secondsCurrent = current
        },
        pauseSong : (state) => {
            if(state.playingSong !== null)
            state.playingSong.pause()
        },
        stopSong : (state) => {
            if(state.playingSong !== null)
            state.playingSong.pause()
            state.playingSong.currentTime = 0
        },
        playSong : (state) => {
            if(state.playingSong !== null)
            state.playingSong.play()
        }
    },
    actions : {
        pauseSong({commit}) {
            commit('pauseSong')
        },
        stopSong({commit}) {
            commit('stopSong')
        },
        playSong({commit}) {
            commit('playSong')
        }
    }

}


export default playingSong