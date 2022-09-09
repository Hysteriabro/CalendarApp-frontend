import { calendarSlice, onAddNewEvent, onDeleteEvent, onLoadEvents, onLogoutCalendar, onSetActiveEvent, onUpdateEvent } from "../../../src/store/calendar/calendarSlice"
import { calendarWithActiveEventState, calendarWithEventsState, events, initialState } from "../../fixtures/calendarState";

describe('Pruebas en calendarSlice', () => {

    test('debe de regresar el estado por defecto', () => {
        const state = calendarSlice.getInitialState();
        expect( state ).toEqual( initialState );
    });

    test('onSetActiveEvent debe de activar el evento', () => {
        const state = calendarSlice.reducer( calendarWithEventsState, onSetActiveEvent( events[0] ) );
        expect( state.activeEvent ).toEqual( events[0] );
    });

    test('onAddNewEvent debe de agregar el evento', () => {
        const newEvent = {
            id: '3',
            title: 'Cumpleanos del Cesar',
            notes: 'Hay que comprar pastel!',
            start: new Date('2022-11-09 13:00:00'),
            end: new Date('2022-11-09 15:00:00')
        }
        const state = calendarSlice.reducer( calendarWithEventsState, onAddNewEvent( newEvent ) );
        expect( state.events ).toEqual([ ...events, newEvent]);
    });

    test('onUpdateEvent debe de actualizar el evento', () => {
        const setEvent = {
            id: '1',
            title: 'Cumpleanos del Cesar se viene!!!',
            notes: 'Hay que comprar pastel!',
            start: new Date('2022-11-09 13:00:00'),
            end: new Date('2022-11-09 15:00:00')
        }
        const state = calendarSlice.reducer( calendarWithEventsState, onUpdateEvent( setEvent ) );
        expect( state.events ).toContain( setEvent );
    });

    test('onDeleteEvent debe de eliminar el evento activo', () => {
        const state = calendarSlice.reducer( calendarWithActiveEventState, onDeleteEvent() );
        expect( state.events ).not.toContain( events[0] );
        expect( state.activeEvent ).toBe( null );
    });

    test('onLoadEvents debe de establecer los eventos', () => {
        const state = calendarSlice.reducer( initialState, onLoadEvents(events));
        expect( state.isLoadingEvents ).toBeFalsy();
        expect( state.events ).toEqual( events );

        const newState = calendarSlice.reducer( state, onLoadEvents(events));
        expect( newState.events.length ).toBe( events.length );
    });

    test('onLogoutCalendar debe de limpiar el estado', () => {
        const state = calendarSlice.reducer( calendarWithActiveEventState, onLogoutCalendar() );
        expect( state ).toEqual( initialState );
    });

});