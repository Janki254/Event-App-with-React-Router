import React from 'react';
import PageContent from '../components/PageContent';
import NewsletterSignup from '../components/NewsletterSignup ';

const NewsletterPage = () => {
    return (
        <React.Fragment>
            <PageContent title='Join our awesome newsletter!'>
                <NewsletterSignup />
            </PageContent>
        </React.Fragment>
    );
};

export default NewsletterPage;

export const action = async({ request }) => {
    const data = await request.formData();
    const email = data.get('email');

    // send to backend newsletter server ...
    console.log(email);
    return { message: 'Signup successful!' };
  }
