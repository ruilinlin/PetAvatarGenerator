import { StyleSheet, View, ScrollView, Dimensions } from 'react-native'
import React from 'react'
import Card from './Card'

const { width } = Dimensions.get('window')

export default function CardCarousel({ items }) {
  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        snapToInterval={width - 48} // 左右留出24的padding
        decelerationRate="fast"
        contentContainerStyle={styles.scrollContent}
      >
        {items.map((item, index) => (
          <View key={index} style={styles.cardContainer}>
            <Card {...item} />
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  scrollContent: {
    paddingHorizontal: 24,
  },
  cardContainer: {
    width: width - 48, // 左右各留出24的padding
  },
})