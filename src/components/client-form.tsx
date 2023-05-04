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
  TouchableHighlight,
} from 'react-native';

import type {PropsWithChildren} from 'react';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

type ClientProps = PropsWithChildren<{
  id: string;
  name: string;
  editing: boolean;
  editMode: boolean;
  onDeleteClient: Function;
  onEditMode: Function;
}>;

const initClient = {
  id: '',
  name: '',
  editing: false,
  editMode: false,
  onDeleteClient: () => {},
  onEditMode: () => {},
};

function Client({
  id,
  name,
  editMode,
  editing,
  onEditMode,
  onDeleteClient,
}: ClientProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const actions = (
    <View style={styles.actionsContainer}>
      <TouchableHighlight
        style={styles.actions}
        activeOpacity={0.9}
        underlayColor="#DBE4ED"
        onPress={() => onEditMode(true)}>
        <Icon name="pencil" size={20} color="#147EFB" />
      </TouchableHighlight>
      <TouchableHighlight
        style={styles.actions}
        activeOpacity={0.9}
        underlayColor="#DBE4ED"
        onPress={() => onDeleteClient(id)}>
        <Icon name="trash" size={20} color="#147EFB" />
      </TouchableHighlight>
    </View>
  );

  const editFeedback = <Text style={styles.editingFeedback}>Editando...</Text>;

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
      {editing ? editFeedback : editMode ? null : actions}
    </View>
  );
}

function ClientForm(): JSX.Element {
  const [client, setClient] = useState<ClientProps>(initClient);
  const [clients, setClients] = useState<ClientProps[]>([]);
  const [warning, setWarning] = useState<string>('');
  const [editMode, setEditMode] = useState<boolean>(false);

  const valid = () => {
    if (!client.name) return false;
    const clientExists = clients.find(item => item.name === client.name);
    if (!!clientExists) {
      setWarning('Já existe um cliente com o nome informado.');
      return false;
    }
    return true;
  };

  const handleAddClient = () => {
    if (!valid()) return;
    const id = uuid.v4() as string;
    const clientList = [...clients, {...client, id}];
    clientList.sort((a, b) => a.name.localeCompare(b.name));
    setWarning('');
    setClient(initClient);
    setClients(clientList);
  };

  const handleChageText = (text: string) => {
    setClient({
      ...client,
      name: text.trim().charAt(0).toUpperCase() + text.slice(1),
    });
  };

  const handleDeleteClient = (id: string) => {
    const list = clients.filter(client => client.id !== id);
    setClients(list);
  };

  const handleEditClient = () => {
    if (!valid()) return;
    const items = clients.map(item => {
      if (item.id === client.id) {
        const newItem = {...client, name: client.name};
        return newItem;
      }
      return item;
    });
    setWarning('');
    setClient(initClient);
    setClients(items);
    setEditMode(false);
  };

  const handleCancelEditing = () => {
    setWarning('');
    setClient(initClient);
    setEditMode(false);
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={handleChageText}
          value={client.name}
          selectionColor={'#147EFB'}
        />
        {warning && <Text style={styles.warning}>{warning}</Text>}
        <TouchableOpacity
          style={styles.addButton}
          onPress={editMode ? handleEditClient : handleAddClient}>
          <Text style={styles.text}>{editMode ? 'Salvar' : 'Adicionar'}</Text>
        </TouchableOpacity>
        {editMode && (
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={handleCancelEditing}>
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
        )}
      </View>
      <FlatList
        data={clients}
        renderItem={({item}) => {
          return (
            <Client
              id={item.id}
              name={item.name}
              editing={client.id === item.id}
              editMode={editMode}
              onDeleteClient={handleDeleteClient}
              onEditMode={(value: boolean) => {
                setEditMode(value);
                setClient(item);
              }}
            />
          );
        }}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  editingFeedback: {
    color: '#666f88',
    fontSize: 14,
  },
  warning: {
    color: '#666f88',
    paddingTop: 5,
    fontSize: 12,
  },
  actions: {
    width: 35,
    height: 35,
    borderRadius: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionsContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
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
  },
  inputContainer: {
    paddingBottom: 20,
    marginTop: 10,
    marginHorizontal: 10,
  },
  addButton: {
    backgroundColor: '#147EFB',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  cancelButton: {
    borderColor: '#147EFB',
    borderWidth: 1.5,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  cancelButtonText: {
    display: 'flex',
    alignSelf: 'center',
    fontSize: 16,
    color: '#147EFB',
  },
  text: {
    display: 'flex',
    alignSelf: 'center',
    fontSize: 16,
    color: '#fff',
  },
  clientContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
