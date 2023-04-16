import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Button,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import {getMovies} from '../network/request';
import {useNavigation} from '@react-navigation/native';

const dropDownData = [
  {label: 'Now Playing', value: {id: '1', api: 'now_playing'}},
  {label: 'Popular', value: {id: '2', api: 'popular'}},
  {label: 'Top Rated', value: {id: '3', api: 'top_rated'}},
  {label: 'Upcoming', value: {id: '4', api: 'upcoming'}},
];

const Movies = () => {
  const navigation = useNavigation();
  const [value, setValue] = useState(dropDownData[0]);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [isLoad, setLoad] = useState(true);

  const requestAPI = async change => {
    let pageNo = change ? 1 : page;
    if (change) {
      await setData([]);
      await console.log('data', data);
    }
    getMovies({api: value.value.api, pageNo}).then(async res => {
      if (data?.page !== res?.page) {
        if (change) {
          setData(res.results);
          await setPage(1);
        } else {
          await setData([...data, ...res.results]);
        }
        // await setData(arr => [...arr, ...res.results]);
        setLoad(false);
      } else {
        setLoad(false);
      }
    });
  };

  useEffect(() => {
    requestAPI();
  }, [page]);

  const fetchMoreData = () => {
    setLoad(true);
    // if (!newsModel.isListEnd && !newsModel.moreLoading) {
    const a = page + 1;
    setPage(a);
    // }
  };

  const renderFooter = () => (
    <View style={styles.footerText}>
      {isLoad && <ActivityIndicator />}
      {!isLoad && <Text>No more articles at the moment</Text>}
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyText}>
      <Text>No Data at the moment</Text>
      <Button onPress={() => requestAPI()} title="Refresh" />
    </View>
  );

  const moreDetailsClick = item => {
    navigation.navigate('Movies Details', {
      data: item,
    });
  };

  const renderList = ({item}) => (
    <View style={{flexDirection: 'row', marginBottom: 10}}>
      <Image
        style={{width: 100, height: 100}}
        source={{
          uri: 'https://image.tmdb.org/t/p/w500/' + item.poster_path,
        }}
      />
      <View style={{marginLeft: 15}}>
        <Text style={{fontSize: 16, fontWeight: 'bold'}}>
          {item.original_title}
        </Text>
        <Text style={{fontSize: 12, marginVertical: 4}}>
          {'Popularity: ' + item.popularity}
        </Text>
        <Text style={{fontSize: 12, marginBottom: 4}}>
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
  return (
    <View style={styles.container}>
      <Dropdown
        style={[styles.dropdown]}
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
          requestAPI(true);
        }}
      />
      <FlatList
        contentContainerStyle={{flexGrow: 1, marginTop: 20}}
        data={data}
        renderItem={renderList}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
        onEndReachedThreshold={0.2}
        onEndReached={fetchMoreData}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 4,
    marginHorizontal: 24,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
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

  title: {
    fontSize: 25,
    fontWeight: '700',
    marginVertical: 15,
    marginHorizontal: 10,
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  emptyText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Movies;
