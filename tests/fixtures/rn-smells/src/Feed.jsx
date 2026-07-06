import { ScrollView, KeyboardAvoidingView, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
export function Feed() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch('https://api.example.com/feed').then((r) => r.json()).then(setData);
  }, []);
  const save = (t) => AsyncStorage.setItem('auth_token', t);
  Animated.timing(v, { toValue: 1, useNativeDriver: false }).start();
  return (
    <KeyboardAvoidingView>
      <ScrollView>{data.map((d) => <Item key={d.id} {...d} />)}</ScrollView>
    </KeyboardAvoidingView>
  );
}
