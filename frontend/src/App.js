// BONUS: Add another (nested) layout route that adds the <EventNavigation> component above all /events... page components

import React from 'react';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import HomePage from './Pages/HomePage';
import RootLayout from './Pages/RootLayout';
import EventsPage, {loader as events_Loader} from './Pages/EventsPage';
import NewEventPage from './Pages/NewEventPage';
import EventDetailsPage, {
    loader as eventDetail_Loader,
    action as deleteEvent_Action,
} from './Pages/EventDetailsPage';
import EditEventPage from './Pages/EditEventPage';
import ErrorPage from './Pages/ErrorPage';
import EventRootLayout from './Pages/EventRootLayout';
import {action as changeEvent_Action} from './components/EventForm'; 
import NewsletterPage, {
    action as newsletter_Action,
} from './Pages/NewsletterPage';

const App = () => {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <RootLayout />,
            errorElement: <ErrorPage />,
            children: [
                {index: true, element: <HomePage />},
                {
                    path: 'events',
                    element: <EventRootLayout />,
                    children: [
                        {
                            index: true,
                            element: <EventsPage />,
                            loader: events_Loader,
                        },
                        {
                            path: ':eventId',
                            id: 'event-details',
                            loader: eventDetail_Loader, //now u can use loader in both children route
                            children: [
                                {
                                    index: true,
                                    element: <EventDetailsPage />,
                                    action: deleteEvent_Action,
                                },
                                {
                                    path: 'edit',
                                    element: <EditEventPage />,
                                    action: changeEvent_Action,
                                },
                            ],
                        },
                        {
                            path: 'new',
                            element: <NewEventPage />,
                            action: changeEvent_Action,
                        },
                    ],
                },
                {
                    path: 'newsletter',
                    element: <NewsletterPage />,
                    action: newsletter_Action,
                },
            ],
        },
    ]);

    return (
        <React.Fragment>
            <RouterProvider router={router}></RouterProvider>
        </React.Fragment>
    );
};

export default App;
