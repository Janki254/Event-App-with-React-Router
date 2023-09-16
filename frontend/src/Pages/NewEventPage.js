import React from 'react';
import EventForm from '../components/EventForm';

const NewEventPage = () => {
    return (
        <React.Fragment>
            <EventForm method='post' />
        </React.Fragment>
    );
};

export default NewEventPage;
