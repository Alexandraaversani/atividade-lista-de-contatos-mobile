import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

export default function Settings() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Configurações</Text>
            <Text style={styles.text}>Aqui você pode configurar suas preferências</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    text: {
        fontSize: 16, 
    }
});
