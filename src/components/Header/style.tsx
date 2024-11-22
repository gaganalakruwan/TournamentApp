import {StyleSheet} from 'react-native';
import colors from '../../constant/colors';

export default StyleSheet.create({
  container: {
    backgroundColor: colors.headerBlue,
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderBottomColor: colors.seperator,
    borderBottomWidth: 2,
    borderBottomEndRadius: 100,
    borderBottomStartRadius: 100,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
  },
  rightIcon:{
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    alignContent: 'flex-end',
    textAlign: 'right',
  },
  image: {width: 50, height: 50, borderRadius: 100},
  title: {
    fontSize: 17,
    color: colors.white,
    alignSelf: 'center',
    flex: 1,
    fontWeight: '700',
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: colors.gray,
  },
});
