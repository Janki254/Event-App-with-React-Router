import React from 'react';
import PageContent from '../components/PageContent';
import MainNavigation from '../components/MainNavigation.js';
import {useRouteError} from 'react-router-dom';

const ErrorPage = () => {
    const errorObj = useRouteError();

    let errorTitle = 'An Error occured!.';
    let errorMessage = 'Somthing went wrong!.';

    if (errorObj.status === 500) {
        // errorMessage = JSON.parse(errorObj.data).message; //without usuing json()
        errorMessage = errorObj.data.message; // with using json() utility Fn For throwing response
    }
    if (errorObj.status === 404) {
        errorTitle = 'Not Found!.';
        errorMessage = 'Coud not found Resource or Page!..';
    }
    return (
        <React.Fragment>
            <MainNavigation />
            <PageContent title={errorTitle}>
                <main>
                    <h2>{errorMessage}&#128533;</h2>
                </main>
            </PageContent>
        </React.Fragment>
    );
};

export default ErrorPage;
