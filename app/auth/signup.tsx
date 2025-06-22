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

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const appwrite = new Appwrite();

  const handleSignup = () => {
    if (!name || !email || !password) {
      setError('All fields are required');
      return;
    }

    const user = { name, email, password };
    appwrite
      .createAccount(user)
      .then(() => {
        router.replace('/(tabs)/product'); // Redirect after success
      })
      .catch((e) => {
        setError('Sign up failed: ' + e.message || e.toString());
      });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.inner}>
          <Text style={styles.title}>Create Account 🚀</Text>
          <Text style={styles.subtitle}>Join and start your journey</Text>

          <TextInput
            placeholder="Name"
            placeholderTextColor="#fff"
            style={styles.input}
            value={name}
            onChangeText={(text) => {
              setError('');
              setName(text);
            }}
          />

          <TextInput
            placeholder="Email"
            placeholderTextColor="#fff"
            style={styles.input}
            value={email}
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={(text) => {
              setError('');
              setEmail(text);
            }}
          />

          <TextInput
            placeholder="Password"
            placeholderTextColor="#fff"
            style={styles.input}
            value={password}
            secureTextEntry
            onChangeText={(text) => {
              setError('');
              setPassword(text);
            }}
          />

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <Pressable style={styles.button} onPress={handleSignup}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </Pressable>

          <Pressable onPress={() => router.push('/auth/login')}>
            <Text style={styles.loginText}>
              Already have an account?{' '}
              <Text style={styles.loginLink}>Login</Text>
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
    backgroundColor: '#22c55e', // Tailwind green-500
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
  loginText: {
    color: '#fff',
    textAlign: 'center',
  },
  loginLink: {
    color: '#22c55e',
    fontWeight: 'bold',
  },
});
