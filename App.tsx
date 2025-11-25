import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Button, TextInput, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Constants from 'expo-constants';
import axios from 'axios';

type ExpoExtra = {
  apiBaseUrl?: string;
  api?: {
    baseUrl?: string;
  };
};

const expoConfig = Constants.expoConfig ?? Constants.manifest ?? {};
const expoExtra = (expoConfig.extra ?? {}) as ExpoExtra;

const FALLBACK_HOST = Platform.select({
  ios: 'localhost',
  android: '10.0.2.2',
  default: '127.0.0.1'
});

const envApiBaseUrl = (process.env.EXPO_PUBLIC_API_BASE_URL ??
  process.env.EXPO_PUBLIC_API_URL) as string | undefined;

const FALLBACK_PORT = (process.env.EXPO_PUBLIC_API_PORT as string | undefined) ?? '3001';

const API_BASE_URL =
  envApiBaseUrl ??
  expoExtra.apiBaseUrl ??
  expoExtra.api?.baseUrl ??
  `http://${FALLBACK_HOST}:${FALLBACK_PORT}/api`;

if (__DEV__) {
  console.log('[HydroApp] Using API base URL:', API_BASE_URL);
}

// Configured axios instance with timeout and headers
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
});

interface DataItem {
  id: number;
  name: string;
  value: number;
}

export default function App() {
  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newItemName, setNewItemName] = useState('');
  const [newItemValue, setNewItemValue] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/data');
      setData(response.data.data);
      setError(null);
    } catch (err) {
      const errorMessage = axios.isAxiosError(err)
        ? `Failed to fetch data: ${err.response?.data?.error || err.message}`
        : 'Failed to fetch data from server';
      setError(errorMessage);
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const addItem = async () => {
    if (!newItemName.trim()) {
      alert('Please enter a name');
      return;
    }
    if (newItemValue.trim() === '') {
      alert('Please enter a value');
      return;
    }

    const parsedValue = parseFloat(newItemValue);
    if (isNaN(parsedValue) || !isFinite(parsedValue)) {
      alert('Please enter a valid number for value');
      return;
    }

    try {
      const response = await apiClient.post('/data', {
        name: newItemName,
        value: parsedValue
      });

      setData([...data, response.data.data]);
      setNewItemName('');
      setNewItemValue('');
      setError(null);
    } catch (err) {
      const errorMessage = axios.isAxiosError(err)
        ? `Failed to add item: ${err.response?.data?.error || err.message}`
        : 'Failed to add item';
      setError(errorMessage);
      console.error('Error adding item:', err);
    }
  };

  const renderItem = ({ item }: { item: DataItem }) => (
    <View style={styles.item}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemValue}>Value: {item.value}</Text>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading data...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>HydroApp</Text>
      <Text style={styles.subtitle}>React Native + Backend Demo</Text>

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <Button title="Retry" onPress={fetchData} />
        </View>
      )}

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Item name"
          value={newItemName}
          onChangeText={setNewItemName}
        />
        <TextInput
          style={styles.input}
          placeholder="Item value"
          value={newItemValue}
          onChangeText={setNewItemValue}
          keyboardType="numeric"
        />
        <Button title="Add Item" onPress={addItem} />
      </View>

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.list}
        contentContainerStyle={styles.listContent}
      />

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
  },
  formContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 20,
  },
  item: {
    backgroundColor: 'white',
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  itemValue: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  errorContainer: {
    backgroundColor: '#ffebee',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  errorText: {
    color: '#c62828',
    textAlign: 'center',
    marginBottom: 10,
  },
});
