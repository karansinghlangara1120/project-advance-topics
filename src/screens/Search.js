import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import {searchWhite} from './../assets/index';
import {Dropdown} from 'react-native-element-dropdown';
import {search as searchIcon} from './../assets/index';
import {search} from '../network/request';
import {useNavigation} from '@react-navigation/native';

const SearchResults = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [query, setQuery] = useState(undefined);
  const [isLoad, setLoad] = useState(true);
  const [valid, setValid] = useState(true);
  const [searchString, setSearchString] = useState();
  const dropDownData = [
    {label: 'Movie', value: {id: '1', api: 'movie'}},
    {label: 'Multi', value: {id: '2', api: 'multi'}},
    {label: 'TV', value: {id: '3', api: 'tv'}},
  ];
  const [value, setValue] = useState(dropDownData[0]);

  const requestAPI = async change => {
    search({api: value.value.api, page: 1, query: query}).then(async res => {
      setData(res.results);

      setLoad(false);
      setQuery('');
    });
  };

  const moreDetailsClick = item => {
    navigation.navigate('Movies Details', {
      data: item,
    });
  };
  //   const renderFooter = () => (
  //     <View style={styles.footerText}>
  //       {isLoad && <ActivityIndicator />}
  //       {!isLoad && <Text>No more articles at the moment</Text>}
  //     </View>
  //   );

  //   const renderEmpty = () => (
  //     <View style={styles.emptyText}>
  //       <Text>No Data at the moment</Text>
  //       <Button onPress={() => requestAPI()} title="Refresh" />
  //     </View>
  //   );
  const renderList = ({item}) => {
    return (
      <View style={{flexDirection: 'row', marginBottom: 10}}>
        <Image
          style={{width: 100, height: 100}}
          source={{
            uri: 'https://image.tmdb.org/t/p/w500/' + item.poster_path,
          }}
        />
        <View style={{marginLeft: 15}}>
          <Text style={{fontSize: 20}}>
            {item?.original_title ? item?.original_title : item?.original_name}
          </Text>
          <Text style={{fontSize: 12, marginVertical: 2}}>
            {'Popularity: ' + item.popularity}
          </Text>
          <Text style={{fontSize: 12, marginVertical: 2}}>
            {'Release Date: ' + item.release_date}
          </Text>

          <TouchableOpacity onPress={() => moreDetailsClick(item)}>
            <View style={{backgroundColor: '#33ACDE', padding: 10, width: 180}}>
              <Text style={{color: 'white', textAlign: 'center'}}>
                More Details
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const renderEmpty = () => (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        marginTop: 100,
      }}>
      <Text style={{color: 'black', fontSize: 25, fontWeight: 'bold'}}>
        Please initiate a search
      </Text>
    </View>
  );

  return (
    <View style={{flex: 1}}>
      <Text style={{marginTop: 15, marginBottom: 10, marginLeft: 40}}>
        Search Movie/TV Show Name
        <Text style={{color: 'red'}}> *</Text>
      </Text>
      <View style={{alignItems: 'center'}}>
        <View
          style={[
            {
              backgroundColor: '#d3d3d3',
              width: '80%',
              flexDirection: 'row',
              padding: 6,
              borderWidth: 2,
            },
            {borderColor: valid ? '#33ACDE' : 'red'},
          ]}>
          <Image source={searchIcon} style={{width: 22, height: 22}} />
          <TextInput
            style={{width: '85%', marginLeft: 10}}
            placeholder={'i.e James Bond, CSI'}
            onChangeText={str => {
              setQuery(str);
            }}
            value={query}
          />
        </View>
        <Text style={{marginTop: 10, marginBottom: 10}}>
          Choose Search Type
        </Text>

        <View style={{flex: 1, flexDirection: 'row', marginLeft: 10}}>
          <Dropdown
            style={[styles.dropdown, {borderColor: valid ? 'grey' : 'red'}]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={dropDownData}
            maxHeight={300}
            labelField="label"
            valueField="value"
            searchPlaceholder="Search..."
            value={value}
            onChange={async item => {
              await setValue(item);
            }}
          />
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: '#33ACDE',
              padding: 10,
              height: 40,
              marginRight: 20,
            }}
            onPress={() => {
              if (query && query.trim().length > 0) {
                requestAPI(true);
                setValid(true);
                setSearchString(undefined);
              } else {
                setValid(false);
                setSearchString('Movie/TV show name is required');
              }
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image source={searchWhite} style={{width: 22, height: 22}} />

              <Text style={{color: 'white', textAlign: 'center'}}>Search</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <Text
        style={[
          {marginTop: 50, marginLeft: 40},
          {color: valid ? 'black' : 'red'},
        ]}>
        {searchString}
      </Text>
      <FlatList
        contentContainerStyle={{
          flexGrow: 1,
          marginTop: 20,
          marginHorizontal: 16,
        }}
        data={data}
        ListEmptyComponent={renderEmpty}
        renderItem={renderList}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 4,
    marginHorizontal: 24,
    paddingHorizontal: 8,
    flex: 1,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default SearchResults;
