import { useEffect, useState } from "react";
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { Navbar, CalendarEvent, CalendarModal, FabAddNew, FabDelete } from "../";

import { localizer, getMessagesEs } from '../../helpers';
import { useAuthStore, useCalendarStore, useUiStore } from "../../hooks";


export const CalendarPage = () => {

    const { user } = useAuthStore();
    const { openDateModal } = useUiStore();
    const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();
    const [lasView, setLasView] = useState(localStorage.getItem('lasView') || 'week');

    const eventStyleGetter = ( event, start, end, isSelected ) => {

        const isMyEvent = ( user.uid === event.user._id ) || ( user.uid === event.user.uid );

        const style = {
            backgroundColor: isMyEvent ? '#347CF7': '#465660',
            borderRadius: '0px',
            opacity: 0.8,
            color: 'white'
        }

        return {
            style
        }
    }

    const onDoubleClick = ( event ) => {
        // console.log({ doubleClick: event })
        openDateModal();
    }

    const onSelect = ( event ) => {
        // console.log({ click: event })
        setActiveEvent( event );
    }

    const onViewChange = ( event ) => {
        localStorage.setItem( 'lasView', event );
        setLasView( event );
    }

    useEffect(() => {
        startLoadingEvents();
    }, []);
    

    return (
        <>
            <Navbar />

            <Calendar
                culture="es"
                localizer={ localizer }
                events={ events }
                defaultView={ lasView }
                startAccessor="start"
                endAccessor="end"
                style={{ height: 'calc( 100vh - 80px )' }}
                messages={ getMessagesEs() }
                eventPropGetter={ eventStyleGetter }
                components={{
                    event: CalendarEvent
                }}
                onDoubleClickEvent={ onDoubleClick }
                onSelectEvent={ onSelect }
                onView={ onViewChange }
            />

            <CalendarModal />
            <FabAddNew />
            <FabDelete />
        </>
    )
}
