import * as React from 'react';

import {
    Text,
    View,
    StyleSheet,
    StatusBar,
    Dimensions,
    Pressable
} from 'react-native';

{/* The space of screen  */ }
const { width, height } = Dimensions.get('window')

{/* import navigation libarary */ }
import { NavigationContainer } from '@react-navigation/native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

{/* import paths of Tab screens */ }

import Explorepopular from '../Screens/Explore/Explore'
import Repositories from '../Screens/Repositories/Repositories'

{/*imports of react native icons  */ }

import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'


const Tab = createMaterialTopTabNavigator();


const TOPNAVIGATION = () => {


    return (
        <>
            <StatusBar barStyle={'dark-content'} backgroundColor={"#FFF"} />

            <View style={styles.Header}>
                <Pressable onPress={() => { }}>
                    <IconMaterialCommunityIcons
                        name="magnify"
                        style={styles.Search}
                    />
                </Pressable>

            </View>
            <NavigationContainer>
                <Tab.Navigator
                    tabBarPosition='top'
                    screenOptions={{
                        tabBarContentContainerStyle: {
                            flexDirection: "row",
                            flex: 1,
                            justifyContent: 'space-around',
                            paddingRight: 120,
                            // backgroundColor: "#ff0",
                        },
                        tabBarActiveTintColor: "#68DDBA",
                        tabBarInactiveTintColor: "#7B848D",

                    }}
                >
                    <Tab.Screen
                        name='Explore'
                        component={Explorepopular}
                        options={{
                            tabBarIndicatorStyle: {
                                width: (width / 2) - 110,
                                marginLeft: 25,
                                backgroundColor: "#68DDBA",
                                overflow: "hidden"
                            },
                            tabBarLabelStyle: {
                                fontSize: 12,
                                fontWeight: "bold",
                                marginBottom: 10,

                            },
                            tabBarPressOpacity: 1 //Only supported on iOS.
                        }}
                    />
                    <Tab.Screen
                        name='Repositories'
                        component={Repositories}
                        options={{
                            tabBarIndicatorStyle: {
                                width: (width / 2) - 70,
                                marginLeft: -40,
                                backgroundColor: "#68DDBA",
                                overflow: "hidden"

                            },
                            tabBarLabelStyle: {
                                fontSize: 12,
                                fontWeight: "bold",
                                marginBottom: 10,
                                marginLeft: 35
                            },
                            tabBarPressOpacity: 1 //Only supported on iOS.

                        }}
                    />
                </Tab.Navigator>
            </NavigationContainer>


        </>

    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FAFCFE"
    },
    Header: {
        width: "100%",
        height: 70,
        backgroundColor: "#FFF",
        justifyContent: "center"

    },
    Search: {
        fontSize: 25,
        color: "#000",
        marginRight: 25,
        textAlign: "right"
    }

});

export default TOPNAVIGATION;
