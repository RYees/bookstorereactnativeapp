import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

const API_KEY = 
"marlboro::stepzen.net+1000::9dea8efbb37fa0122107154e576b365346b2594b1e466fb30086f3c12a58a685";

const client = new ApolloClient({
  uri: "https://oneonta.stepzen.net/api/good-deer/__graphql",
  headers: {
    Authorization: `Apikey ${API_KEY}`,
  },
  cache: new InMemoryCache(),
});

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
      <ApolloProvider client={client}>
        <Navigation colorScheme={colorScheme} />   
      </ApolloProvider>
      <StatusBar />   
      </SafeAreaProvider>
    );
  }
}
