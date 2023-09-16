import {
    Form,
    json,
    redirect,
    useActionData,
    useNavigate,
    useNavigation,
} from 'react-router-dom';

import classes from './EventForm.module.css';

function EventForm({method, event}) {
    //Used for navigate to cancel form submission
    const navigate = useNavigate();
    function cancelHandler() {
        navigate('..');
    }
    //Used For delaying to submitting form
    const navigation = useNavigation();
    const isSubmitting = navigation.state === 'submitting';

    //Used for Showing Error messages to the users from server side.
    const data = useActionData();

    return (
        <Form method={method} className={classes.form}>
            {data && data.errors && (
                <ul>
                    <h2>Errors</h2>
                    {Object.values(data.errors).map((err) => (
                        <li key={err}>{err}</li>
                    ))}
                </ul>
            )}
            <p>
                <label htmlFor='title'>Title</label>
                <input
                    id='title'
                    type='text'
                    name='title'
                    defaultValue={event ? event.title : ''}
                    required
                />
            </p>
            <p>
                <label htmlFor='image'>Image</label>
                <input
                    id='image'
                    type='url'
                    name='image'
                    defaultValue={event ? event.image : ''}
                    required
                />
            </p>
            <p>
                <label htmlFor='date'>Date</label>
                <input
                    id='date'
                    type='date'
                    name='date'
                    defaultValue={event ? event.date : ''}
                    required
                />
            </p>
            <p>
                <label htmlFor='description'>Description</label>
                <textarea
                    id='description'
                    name='description'
                    rows='5'
                    defaultValue={event ? event.description : ''}
                    required
                />
            </p>
            <div className={classes.actions}>
                <button
                    type='button'
                    onClick={cancelHandler}
                    disabled={isSubmitting}
                >
                    Cancel
                </button>
                <button disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting..' : 'Save'}
                </button>
            </div>
        </Form>
    );
}

export default EventForm;

export const action = async ({request, params}) => {
    const req_Method = request.method;
    const data = await request.formData();
    const eventData = {
        title: data.get('title'),
        image: data.get('image'),
        date: data.get('date'),
        description: data.get('description'),
    };

    let req_url = 'http://localhost:8080/events';

    if (req_Method === 'PATCH') {
        const id = params.eventId;
        req_url = `http://localhost:8080/events/${id}`;
    }

    const response = await fetch(req_url, {
        method: req_Method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
    });
    if (response.status === 422) {
        return response;
    }
    if (!response.ok) {
        throw json({message: 'Could Not Save Event Data!..'}, {status: 500});
    } else {
        return redirect('/events');
    }
};
