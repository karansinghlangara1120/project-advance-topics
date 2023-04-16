import {View, Text, Image} from 'react-native';
import React from 'react';
import {useRoute} from '@react-navigation/native';

const MovieDetail = () => {
  const route = useRoute();
  const data = route?.params?.data;
  console.log(data);
  return (
    <View style={{alignItems: 'center'}}>
      <Text style={{fontSize: 20, marginVertical: 20, fontWeight: 'bold'}}>
        {data?.original_title ? data?.original_title : data?.original_name}
      </Text>
      <Image
        style={{width: 250, height: 250}}
        source={{
          uri: 'https://image.tmdb.org/t/p/original/' + data.backdrop_path,
        }}
      />
      <Text style={{margin: 20}}>{data.overview}</Text>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={{fontSize: 11}}>{'Popularity: ' + data.popularity}</Text>
        <Text style={{fontSize: 11}}>
          {' | Release Date: ' + data.release_date}
        </Text>
      </View>
    </View>
  );
};

export default MovieDetail;
