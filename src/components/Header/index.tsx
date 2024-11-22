import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import style from './style';
import CustomIcon from 'components/CustomIcon';
import colors from 'constant/colors';

type Props = {
  uri?: string;
  title: string;
  isImage: boolean;
};

const Header = ({uri, title, isImage}: Props) => {
  return (
    <View style={style.container}>
      <View style={style.imageContainer}>
        {isImage ? (
          <Image style={style.image} source={{uri: uri}} />
        ) : (
          <View>
            <CustomIcon
              icon={'calendar-plus-o'}
              type={'FontAwesome'}
              size={25}
              color={'white'}
            />
          </View>
        )}
      </View>
      <Text style={style.title}>{title}</Text>
      <View style={style.rightIcon}>
        <CustomIcon
          icon={'user-circle-o'}
          type={'FontAwesome'}
          size={25}
          color={'white'}
        />
      </View>
    </View>
  );
};

export default Header;
