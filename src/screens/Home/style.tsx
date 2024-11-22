import colors from 'constant/colors';
import {StyleSheet} from 'react-native';
import {getScaleNumber} from 'utils/refDimention';
const ITEM_WIDTH = 200; // Width of horizontal items
const ITEM_HEIGHT = 100; // Height of each vertical item

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkBlue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  horizontalItem: {
    width: ITEM_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  verticalItem: {
    height: ITEM_HEIGHT,
    width: '100%',
    backgroundColor: colors.itemBackBlue,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bookingContainer: {
    backgroundColor: colors.lightPurple,
    height: 50,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  bookingText: {
    color: 'white',
    fontSize: 12,
  },
  bookingBack: {
    backgroundColor: colors.itemBackBlue,
    padding: 3,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: colors.white,
    borderRadius: 20,
  },
});
