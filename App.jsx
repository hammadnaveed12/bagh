import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import StackNavigator from './screens/navigations/StackNavigator'
import { QueryClientProvider,QueryClient } from 'react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {


      cacheTime: Infinity,
    },
    mutations: {
 
    },
  },
});

const App = () => {

  return (
    <QueryClientProvider client={queryClient}>
    <StackNavigator />
    </QueryClientProvider>
  )
}

export default App

const styles = StyleSheet.create({})