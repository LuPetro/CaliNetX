// src/navigation/ProfileNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../screens/profile/ProfileScreen';
import EditProfileScreen from '../screens/profile/EditProfileScreen';

export type ProfileStackParamList = {
  ProfileHome: undefined;
  EditProfile: undefined;
};

const Stack = createStackNavigator<ProfileStackParamList>();

const ProfileNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="ProfileHome"
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen 
        name="ProfileHome" 
        component={ProfileScreen} 
        options={{ 
          title: "Mein Profil",
          headerShown: false 
        }} 
      />
      <Stack.Screen 
        name="EditProfile" 
        component={EditProfileScreen} 
        options={{ 
          title: "Profil bearbeiten" 
        }} 
      />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;