import React, {useEffect} from 'react';
import classes from './NewsletterSignup.module.css';
import {useFetcher} from 'react-router-dom';

const NewsletterSignup = () => {
    const fetcher = useFetcher();
    const {data, state} = fetcher;

    useEffect(() => {
        if (state === 'idle' && data && data.message) {
            window.alert(data.message);
        }
    }, [state, data]);

    return (
        <React.Fragment>
            <fetcher.Form
                method='post'
                action='/newsletter'
                className={classes.newsletter}
            >
                <input
                    type='email'
                    placeholder='Sign up for newsletter...'
                    aria-label='Sign up for newsletter'
                />
                <button>Sign up</button>
            </fetcher.Form>
        </React.Fragment>
    );
};

export default NewsletterSignup;
