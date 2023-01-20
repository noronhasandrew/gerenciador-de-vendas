import React, {useState} from 'react';
import uuid from 'react-native-uuid';
import {
  TextInput,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  FlatList,
} from 'react-native';

import type {PropsWithChildren} from 'react';

import {Colors} from 'react-native/Libraries/NewAppScreen';

type ClientProps = PropsWithChildren<{
  id: string;
  name: string;
}>;

function Client({name}: ClientProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.clientContainer}>
      <Text
        style={[
          styles.clientName,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {name}
      </Text>
    </View>
  );
}

function ClientForm(): JSX.Element {
  const [client, setClient] = useState<ClientProps>({id: '', name: ''});
  const [clients, setClients] = useState<ClientProps[]>([]);

  const handleAddClient = () => {
    if (!client.name) return;
    const id = uuid.v4() as string;
    const clientList = [...clients, {...client, id}];
    clientList.sort((a, b) => a.name.localeCompare(b.name));
    setClients(clientList);
  };

  const handleChageText = (text: string) => {
    setClient({
      ...client,
      name: text.trim().charAt(0).toUpperCase() + text.slice(1),
    });
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.inputContainer}>
        <Text style={styles.screenTitle}>Clientes</Text>
        <TextInput
          style={styles.input}
          onChangeText={handleChageText}
          value={client.name}
          selectionColor={'#147EFB'}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddClient}>
          <Text style={styles.text}>Adicionar</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={clients}
        renderItem={({item}) => {
          return <Client id={item.id} name={item.name} />;
        }}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screenTitle: {
    display: 'flex',
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
    color: '#000',
  },
  input: {
    height: 40,
    borderColor: '#000',
    borderWidth: 2,
    padding: 10,
    fontSize: 16,
    borderRadius: 5,
    marginBottom: 10,
  },
  inputContainer: {
    paddingBottom: 20,
    marginHorizontal: 10,
  },
  addButton: {
    backgroundColor: '#147EFB',
    padding: 10,
    borderRadius: 5,
  },
  text: {
    display: 'flex',
    alignSelf: 'center',
    fontSize: 16,
    color: '#fff',
  },
  clientContainer: {
    padding: 14,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  clientName: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ClientForm;
