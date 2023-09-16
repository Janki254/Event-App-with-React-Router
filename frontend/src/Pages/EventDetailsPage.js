import React, {Suspense} from 'react';
import {
    Await,
    defer,
    json,
    redirect,
    useRouteLoaderData,
} from 'react-router-dom';
import EventItem from '../components/EventItem';
import EventsList from '../components/EventsList';

const EventDetailsPage = () => {
    //we can load data here using using useParam() and useEffect() hooks
    //const eventParam = useParams();
    // but instead we do that inside anothe loader() Fn

    // const data = useLoaderData();
    const {event, events} = useRouteLoaderData('event-details');
    return (
        <React.Fragment>
            <Suspense fallback={<h2>Loading Event Data!..</h2>}>
                <Await resolve={event}>
                    {(loadedEvent) => <EventItem event={loadedEvent} />}
                </Await>
            </Suspense>
            <Suspense fallback={<h2>Loading Events!..</h2>}>
                <Await resolve={events}>
                    {(loadedEvents) => <EventsList events={loadedEvents} />}
                </Await>
            </Suspense>
        </React.Fragment>
    );
};
export default EventDetailsPage;

// Loader Fn for Loadig Single Event Data
const loadEvent = async (id) => {
    const response = await fetch(`http://localhost:8080/events/${id}`);
    if (!response.ok) {
        return json(
            {message: 'Could Not Fetch Event Details!..'},
            {status: 500},
        );
    } else {
        const resData = await response.json();
        return resData.event;
    }
};
// Loader Fn for loading Multiple Events on these Page for defering
const loadEvents = async () => {
    const response = await fetch('http://localhost:8080/events');
    if (!response.ok) {
        //-------1st way
        //return {isError: true, message: 'Could Not Fetch Events Data!..'};

        //-----2nd way
        // throw {    message: 'Could Not Fetch Events Data!..'};

        //3rd way
        // throw new Response(
        //     JSON.stringify({message: 'Could Not Fetch Events Data!..'}),
        //     {
        //         status: 500,
        //     },
        // );
        //3rd way -but in simpler way
        throw json({message: 'Could Not Fetch Events Data!..'}, {status: 500});
    } else {
        // const resData = await response.json();
        // return resData.events;

        // const res = new Response('any Data', {state: 200});
        // return res;

        //return response; ///this will not work if we defer step in between.
        const resData = await response.json();
        return resData.events;
    }
};

//Defer Loader function
export const loader = async ({request, params}) => {
    const id = params.eventId;

    return defer({
        event: await loadEvent(id),
        events: loadEvents(),
    });
};

// Action Fn for Deleting Event
export const action = async ({request, params}) => {
    const event_id = params.eventId;

    const response = await fetch(`http://localhost:8080/events/${event_id}`, {
        method: request.method,
    });

    if (!response.ok) {
        throw json({message: 'Could Not Delete Event Data!..'}, {status: 500});
    }
    return redirect('/events');
};
