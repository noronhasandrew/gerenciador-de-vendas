import React from 'react';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ClientForm from './src/components/client-form';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {
  Button,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

//check link to solve typescript type problem: https://reactnavigation.org/docs/typescript/

const Tab = createBottomTabNavigator();

function myTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={DetailsScreen} />
    </Tab.Navigator>
  );
}

function HomeScreen({navigation}: {navigation: any}) {
  return <ClientForm />;
}

function DetailsScreen({route, navigation}: {navigation: any; route: any}) {
  const {id, data} = (route || {}).params || {};
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Details Screen</Text>
      {id && <Text>{id}</Text>}
      {data && Object.keys(data).length && data.name && (
        <Text>{data.name}</Text>
      )}
      <Button
        title="Go to Details... again"
        onPress={() => navigation.push('Details')}
      />
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      />
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            if (route.name === 'Carteira') {
              return <FontAwesome5 name={'wallet'} size={20} color="#F97B22" />;
            }
            if (route.name === 'Vendas') {
              return (
                <FontAwesome5 name={'dollar-sign'} size={20} color="#F97B22" />
              );
            }
            if (route.name === 'Estoque') {
              return (
                <FontAwesome5 name={'box-open'} size={20} color="#F97B22" />
              );
            }
          },
        })}>
        <Tab.Screen name="Carteira" component={HomeScreen} />
        <Tab.Screen name="Vendas" component={DetailsScreen} />
        <Tab.Screen name="Estoque" component={HomeScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
