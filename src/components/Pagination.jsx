import { StyleSheet, Text, View } from 'react-native';
import Dot from './Dot';

const Pagination = ({ data, x }) => {
  return (
    <View style={styles.paginationContainer}>
      {data.map((_, index) => (
        <Dot key={index} index={index} x={x} />
      ))}
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: 'row',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
