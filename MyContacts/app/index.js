import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { FAB, List, Dialog, Portal, TextInput, Button, Avatar, Text, Chip } from 'react-native-paper';
import { useRouter } from 'expo-router'; 

export default function Home() {
  const router = useRouter();
  const [contacts, setContacts] = useState([]);
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('pessoal');
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const showDialog = () => setVisible(true);
  const hideDialog = () => {
    setVisible(false);
    setName('');
    setPhone('');
    setCategory('pessoal');
    setEditId(null);
  };

  const handleAddContact = () => {
    if (name && phone) {
      if (editId) {
        setContacts(contacts.map(contact => 
          contact.id === editId ? { ...contact, name, phone, category } : contact
        ));
      } else {
        setContacts([...contacts, {
          id: Date.now().toString(),
          name,
          phone,
          category
        }]);
      }
      hideDialog();
    }
  };

  const handleEdit = (contact) => {
    setName(contact.name);
    setPhone(contact.phone);
    setCategory(contact.category);
    setEditId(contact.id);
    showDialog();
  };

  const handleDelete = (id) => {
    setContacts(contacts.filter(contact => contact.id !== id));
    setDeleteId(null);
  };

  return (
    <View style={styles.container}>
      {contacts.length === 0 ? (
        <Text style={styles.emptyText}>Nenhum contato adicionado ainda</Text>
      ) : (
        <List.Section>
          {contacts.map(contact => (
            <List.Item
              key={contact.id}
              title={contact.name}
              description={`${contact.phone} • ${contact.category}`}
              left={() => (
                <Avatar.Text 
                  size={48} 
                  label={contact.name.charAt(0).toUpperCase()} 
                  style={{ backgroundColor: getCategoryColor(contact.category) }}
                />
              )}
              right={() => (
                <View style={styles.actions}>
                  <Button mode="text" onPress={() => handleEdit(contact)}>
                    Editar
                  </Button>
                  <Button 
                    mode="text" 
                    textColor="#FF3B30"
                    onPress={() => setDeleteId(contact.id)}
                  >
                    Excluir
                  </Button>
                </View>
              )}
            />
          ))}
        </List.Section>
      )}

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={showDialog}
      />

      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>{editId ? 'Editar Contato' : 'Adicionar Contato'}</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Nome"
              value={name}
              onChangeText={setName}
              style={styles.input}
            />
            <TextInput
              label="Telefone"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              style={styles.input}
            />
            <View style={styles.chipContainer}>
              {['pessoal', 'trabalho', 'família'].map((cat) => (
                <Chip
                  key={cat}
                  selected={category === cat}
                  onPress={() => setCategory(cat)}
                  style={styles.chip}
                >
                  {cat}
                </Chip>
              ))}
            </View>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Cancelar</Button>
            <Button onPress={handleAddContact}>
              {editId ? 'Salvar' : 'Adicionar'}
            </Button>
          </Dialog.Actions>
        </Dialog>

        <Dialog visible={!!deleteId} onDismiss={() => setDeleteId(null)}>
          <Dialog.Title>Confirmar exclusão</Dialog.Title>
          <Dialog.Content>
            <Text>Tem certeza que deseja excluir este contato?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setDeleteId(null)}>Cancelar</Button>
            <Button textColor="#FF3B30" onPress={() => handleDelete(deleteId)}>
              Excluir
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}

function getCategoryColor(category) {
  switch (category) {
    case 'trabalho': return '#6200EE';
    case 'família': return '#03DAC6';
    default: return '#FF9800';
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#000FF',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  input: {
    marginBottom: 16,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  chip: {
    marginRight: 8,
    marginBottom: 8,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 32,
    fontSize: 16,
    color: '#666',
  },
});