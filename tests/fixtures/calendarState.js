
export const events = [
    {
        id: '1',
        title: 'Cumpleanos del Simon',
        notes: 'Hay que comprar pastel uwu',
        start: new Date('2022-10-21 13:00:00'),
        end: new Date('2022-10-21 15:00:00')
    },
    {
        id: '2',
        title: 'Cumpleanos del Paulo',
        notes: 'Hay que comprar pastel',
        start: new Date('2022-11-09 13:00:00'),
        end: new Date('2022-11-09 15:00:00')
    }
]

export const initialState = {
    isLoadingEvents: true,
    events: [],
    activeEvent: null
}

export const calendarWithEventsState = {
    isLoadingEvents: false,
    events: [ ...events ],
    activeEvent: null
}

export const calendarWithActiveEventState = {
    isLoadingEvents: false,
    events: [ ...events ],
    activeEvent: { ...events[0] }
}