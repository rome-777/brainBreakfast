import { useEffect, useRef } from 'react'

export default function useTimeout(callback, delay) {
    const timeoutRef = useRef(null);
    const savedCallback = useRef(callback);
    
    // Remember the latest callback if it changes.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);
    
    // Set up the timeout.
    useEffect(() => {
        if (delay === null) return; // Don't schedule if no delay is specified.
        const id = setTimeout(() => savedCallback.current(), delay);
        return () => clearTimeout(id);
    }, [delay])
};
