import React, { useState, useEffect } from 'react';
import LoadingBar from 'react-top-loading-bar';
import { useProgress } from '../features/ProgressContext';

const ProgressBar = () => {
    const { progress } = useProgress();
    const [currentProgress, setCurrentProgress] = useState(0);

    return (
        <div className="progress">
            <LoadingBar
                height={'3px'}
                color='#f11946'
                progress={Math.max(progress, currentProgress)} 
                onLoaderFinished={() => { }}
            />
        </div>
    );
}

export default ProgressBar;
