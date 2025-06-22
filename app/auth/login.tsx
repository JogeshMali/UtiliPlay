import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
} from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import Appwrite from '../appwrite/service';

export default function Login() {
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const appwrite = new Appwrite();

  const handleLogin = () => {
    if (!email || !password) {
      setError('All fields are required');
      return;
    }

    const user = { email, password };
    appwrite
      .login(user)
      .then((response) => {
        if (response) {
          router.replace('/(tabs)/product');
        }
      })
      .catch(() => {
        setError('Incorrect email or password');
      });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.inner}>
          <Text style={styles.title}>Welcome Back 👋</Text>
          <Text style={styles.subtitle}>Login to your account</Text>

          <TextInput
            placeholder="Email"
            placeholderTextColor="#fff"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            placeholder="Password"
            placeholderTextColor="#fff"
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <Pressable style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </Pressable>

          <Pressable onPress={() => router.push('/auth/signup')}>
            <Text style={styles.signupText}>
              Don't have an account?{' '}
              <Text style={styles.signupLink}>Create one</Text>
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // black background
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  inner: {
    width: '100%',
    maxWidth: 400,
  },
  title: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    color: '#aaa',
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    backgroundColor: '#1e1e1e',
    color: '#fff',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  button: {
    backgroundColor: '#22c55e', // Tailwind's green-500
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  error: {
    color: '#ff4d4d',
    textAlign: 'center',
    marginBottom: 8,
  },
  signupText: {
    color: '#fff',
    textAlign: 'center',
  },
  signupLink: {
    color: '#22c55e',
    fontWeight: 'bold',
  },
});
