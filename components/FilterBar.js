import React from 'react';
import { Text, View, Pressable, StyleSheet } from 'react-native';


const FilterBar = ({ handleFilter, activeFilter }) => {
  return (
    <View style={styles.filterBar}>
      <Pressable
        style={[styles.filterButton, activeFilter === 'likes' && styles.activeFilter]}
        onPress={() => handleFilter('likes')}>
        <Text style={styles.filterButtonText}>Likes</Text>
      </Pressable>
      <Pressable
        style={[styles.filterButton, activeFilter === 'date' && styles.activeFilter]}
        onPress={() => handleFilter('date')}>
        <Text style={styles.filterButtonText}>Date</Text>
      </Pressable>
      <Pressable
        style={[styles.filterButton, activeFilter === 'alphabetique' && styles.activeFilter]}
        onPress={() => handleFilter('alphabetique')}>
        <Text style={styles.filterButtonText}>Alphabetique</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  filterBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  filterButton: {
    padding: 8,
  },
  filterButtonText: {
    color: '#16A2CC',
  },
  activeFilter: {
    borderBottomWidth: 2,
    borderBottomColor: '#16A2CC',
  },
});

export default FilterBar;