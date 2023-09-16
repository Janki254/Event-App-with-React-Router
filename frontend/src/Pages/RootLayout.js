import React from 'react';
import {Outlet} from 'react-router-dom';
// import {Outlet, useNavigation} from 'react-router-dom';
import MainNavigation from '../components/MainNavigation';

const RootLayout = () => {
    // const navigation = useNavigation();
    // --------navigation.state value--------
    //navigation.state === 'loading';
    // navigation.state === 'idle';
    // navigation.state === 'submitting';
    return (
        <React.Fragment>
            <MainNavigation />
            <main>
                {/* {navigation.state === 'loading' && <h3>LOADING!...</h3>} */}
                <Outlet />
            </main>
        </React.Fragment>
    );
};

export default RootLayout;
