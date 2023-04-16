import {View, Image, StyleSheet} from 'react-native';
import React from 'react';
import {movieLogo} from '../assets';

const Splash = () => {
  return (
    <View style={styles.mainContainer}>
      <Image source={movieLogo} />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

export default Splash;
