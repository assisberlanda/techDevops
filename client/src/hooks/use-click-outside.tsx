import { RefObject, useEffect } from 'react';

/**
 * Hook that detects clicks outside of the specified element
 * @param ref - Reference to the element to detect clicks outside of
 * @param handler - Callback function to run when a click outside is detected
 */
export function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (event: MouseEvent | TouchEvent) => void
): void {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      // If the ref doesn't exist or if the click was inside the element, do nothing
      const el = ref?.current;
      if (!el || el.contains((event?.target as Node) || null)) {
        return;
      }

      // Otherwise, call the handler
      handler(event);
    };

    // Add event listeners for both mouse and touch events
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    // Cleanup function to remove event listeners when component unmounts
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]); // Only re-run effect if ref or handler changes
}