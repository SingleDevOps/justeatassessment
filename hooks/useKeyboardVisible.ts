import { useState, useEffect } from 'react';
import { Keyboard } from 'react-native';

/**
 * Custom hook to track keyboard visibility.
 * @returns {boolean} - True if the keyboard is visible, false if not.
 */

export const useKeyboardVisible = (): boolean => {
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove(); // Clean up listeners when unmounting
      keyboardDidHideListener.remove();
    };
  }, []);

  return keyboardVisible;
};
