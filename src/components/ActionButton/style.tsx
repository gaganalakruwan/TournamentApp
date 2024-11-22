import colors from 'constant/colors';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: colors.itemBackBlue,
    borderRadius: 10,
    width: 100,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  changeBack: {
    backgroundColor: colors.lightYellow,
  },
  title: {
    color: colors.white,
    padding: 10,
  },
  changeBackTitle:{
    color: colors.black,
  }
});
