import React from 'react';

const SignUp1 = React.lazy(() => import('.'));
const Signin1 = React.lazy(() => import('.'));

const route = [
    { path: '/auth/signup-1', exact: true, name: 'Signup 1', component: SignUp1 },
    { path: '/auth/signin-1', exact: true, name: 'Signin 1', component: Signin1 }
];

export default route;