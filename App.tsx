import React from 'react';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
} from 'react-native';

import ClientForm from './src/components/client-form';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={[backgroundStyle, {flex: 1}]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ClientForm />
    </SafeAreaView>
  );
}

export default App;
