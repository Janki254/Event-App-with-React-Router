import React from 'react';
import {Outlet} from 'react-router-dom';
import EventsNavigation from '../components/EventsNavigation';

const EventRootLayout = () => {
    return (
        <React.Fragment>
            <EventsNavigation />
            <main>
                <Outlet />
            </main>
        </React.Fragment>
    );
};

export default EventRootLayout;
