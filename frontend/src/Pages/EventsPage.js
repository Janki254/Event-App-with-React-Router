import React, {Suspense} from 'react';
import EventsList from '../components/EventsList';
import {Await, defer, json, useLoaderData} from 'react-router-dom';

function EventsPage() {
    const {events} = useLoaderData();
    // // console.log(data);//Outout: any Data => the data will
    // // automatically extracted by useLoaderData()
    // const fetchedEvents = data.events;

    // if (data.isError) {
    //     return <h3>{data.message}</h3>;
    // }

    return (
        <React.Fragment>
            {/*Using Defer */}
            <Suspense fallback={<h2>Loading!...</h2>}>
                {/* fallback for this component until events data fetched*/}

                <Await resolve={events}>
                    {/* Outputting dynamic componemt once we get the events data */}
                    {(loadedEvents) => <EventsList events={loadedEvents} />}
                </Await>
            </Suspense>
            {/* <EventsList events={fetchedEvents} /> */}
        </React.Fragment>
    );
}

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

export const loader = () => {
    return defer({
        events: loadEvents(),
    });
};
export default EventsPage;
