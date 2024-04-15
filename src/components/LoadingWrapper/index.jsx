import React, { Suspense } from 'react';

const LoadingWrapper = ({Child}) => {
    return (
        <Suspense fallback={<h1>Loading...</h1>}>
            <Child />
        </Suspense>
    );
}

export default LoadingWrapper;