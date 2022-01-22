import { useState } from "react";

export function useComplexState<T>(initialState: T): [T, (newState: Partial<T>) => void] {
    const [state, setState] = useState(initialState);
    const setMergedState = (newState: Partial<T>) =>
        setState(prevState => Object.assign({}, prevState, newState)
    );

    return [state, setMergedState];
}