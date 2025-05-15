import { View, StyleSheet } from 'react-native';
import { List, Avatar, Text } from 'react-native-paper';

export default function ContactItem({ contact, onEdit, onDelete }) {
  return (
    <List.Item
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
          <Button mode="text" onPress={() => onEdit(contact)}>
            Editar
          </Button>
          <Button 
            mode="text" 
            textColor="#FF3B30"
            onPress={() => onDelete(contact.id)}
          >
            Excluir
          </Button>
        </View>
      )}
    />
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
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});