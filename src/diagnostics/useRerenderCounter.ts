import { useCallback, useEffect, useRef } from "react";

// let renderCounter = { current: 0 };
// let callCounter = { current: 0 };

export interface UseRerenderCounterOptions {
    printWhenCalled?: boolean;
    printWhenRendered?: boolean;
    fruit?: string;
}
export const useRerenderCounter = (name = 'Component', options: UseRerenderCounterOptions = { }) => {
    const { printWhenCalled = true, printWhenRendered = false, fruit = '🍑' } = options;
    const renderCounter = useRef(0);
    const callCounter = useRef(0);
    callCounter.current++;

    const getStats = useCallback((reason: string = 'debug') => {
        return `${fruit} [${name}]-[${reason}]: called ${callCounter.current}×, rendered ${renderCounter.current}×`;
    }, [ callCounter.current, renderCounter.current ]);

    if (printWhenCalled) {
        console.log(getStats('called'));
    }

    useEffect(() => {
        renderCounter.current++;
        if (printWhenRendered) {
            console.log(getStats('render'));
        }
    });

    return {
        renderCounter: renderCounter.current,
        callCounter: callCounter.current,
        getStats
    };
}