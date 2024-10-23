import * as React from 'react';
import { Alert, useWindowDimensions,View } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
// import DoubtPage from '../DoubtPage/DoubtPage';
// import MyIsuueListScreen from 'src/Screens/MyIssueListScreen/MyIssueListScreen';
import scaler from '../components/scaler';
// import useAuthValue, { resetAuthValue } from 'src/Modules/AuthModule/Hooks/useAuthValue';
// import useGetDevideidQuery from 'src/Modules/ConceptVideoModule/Hooks/useGetDevideidQuery';
import { useEffect, useState } from 'react';
// import { queryClient } from 'src/Utils/ReactQueryConfig';
import Events from './Events';
import InActiveEvents from './InActiveEvents';



const renderScene = SceneMap({
  first: Events,
  second: InActiveEvents,
});

export default function EventTopBar() {

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Active' },
    { key: 'second', title: 'Upcoming' },
  ]);
const renderTabBar = (props) => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: 'blue' }}
    style={{ backgroundColor: '#fff' }}
    labelStyle={{color:"black",fontSize:scaler(15)}}
  />
);
  return (
    <View style={{marginTop:scaler(20),flex:1}}>
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      sceneContainerStyle={{backgroundColor:"#fff"}}
      renderTabBar={renderTabBar}
    />
    </View>
  );
}