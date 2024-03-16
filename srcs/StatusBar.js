import { StatusBar } from 'react-native';

export const setStatusBar = () => {
  StatusBar.setBarStyle('dark-content');
  StatusBar.setBackgroundColor('transparent');
  StatusBar.setTranslucent(true);
};


export default setStatusBar;
