import React from 'react';
import EventForm from '../components/EventForm';
import {useRouteLoaderData} from 'react-router-dom';

const EditEventPage = () => {
    const data = useRouteLoaderData('event-details');
    return (
        <React.Fragment>
            <EventForm method='patch' event={data.event} />
        </React.Fragment>
    );
};

export default EditEventPage;
