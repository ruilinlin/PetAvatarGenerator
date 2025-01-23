import React, { useState, useRef, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Image, 
  Dimensions, 
  ScrollView, 
  TouchableOpacity 
} from 'react-native';

const { width } = Dimensions.get('window');

export default function Banner() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef(null);

  // 示例数据 - 实际使用时替换为您的图片
  const bannerData = [
    { id: 1, image: require('../../../assets/banner1.png') },
    { id: 2, image: require('../../../assets/banner2.png') },
    { id: 3, image: require('../../../assets/banner3.png') },
  ];

  // 自动轮播
  useEffect(() => {
    const timer = setInterval(() => {
      const nextIndex = (activeIndex + 1) % bannerData.length;
      setActiveIndex(nextIndex);
      scrollViewRef.current?.scrollTo({
        x: nextIndex * width,
        animated: true,
      });
    }, 3000);

    return () => clearInterval(timer);
  }, [activeIndex, bannerData.length]);

  // 处理滚动结束事件
  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / width);
    setActiveIndex(index);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        style={styles.scrollView}
      >
        {bannerData.map((item) => (
          <TouchableOpacity 
            key={item.id}
            activeOpacity={0.9}
            onPress={() => {
              // 处理banner点击事件
              console.log(`Banner ${item.id} clicked`);
            }}
          >
            <Image
              source={item.image}
              style={styles.bannerImage}
              resizeMode="cover"
            />
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* 指示器 */}
      <View style={styles.pagination}>
        {bannerData.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              index === activeIndex && styles.paginationDotActive,
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 200,
    position: 'relative',
  },
  scrollView: {
    width: width,
  },
  bannerImage: {
    width: width,
    height: 200,
  },
  pagination: {
    position: 'absolute',
    bottom: 16,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: '#fff',
    width: 16,
  },
});
