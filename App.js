import { StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedRef,
  useSharedValue,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';
import data from './src/data/data';
import RenderItem from './src/components/RenderItem';
import Pagination from './src/components/Pagination';
import CustomButton from './src/components/CustomButton';

export default function App() {
  const flatlistRef = useAnimatedRef();
  const x = useSharedValue(0);
  const flatlistIndex = useSharedValue(0);

  const onViewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems[0].index !== null) {
      flatlistIndex.value = viewableItems[0].index;
    }
  };

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
  });

  return (
    <View style={styles.container}>
      <Animated.FlatList
        ref={flatlistRef}
        onScroll={onScroll}
        data={data}
        renderItem={({ item, index }) => {
          return <RenderItem item={item} index={index} x={x} />;
        }}
        keyExtractor={(item) => item.id}
        scrollEventThrottle={16}
        horizontal={true}
        bounces={false}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          minimumViewTime: 300,
          viewAreaCoveragePercentThreshold: 10,
        }}
      />
      <View style={styles.bottomContainer}>
        <Pagination data={data} x={x} />
        <CustomButton
          flatlistRef={flatlistRef}
          flatlistIndex={flatlistIndex}
          dataLength={data.length}
          x={x}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    marginHorizontal: 30,
    paddingVertical: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
