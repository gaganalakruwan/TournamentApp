import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import style from './style';

type Props = {
  title: string;
  onPress: () => void;
  isFocuse?:boolean
};

const ActionButton = ({title, onPress,isFocuse}: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={[style.container,isFocuse && style.changeBack]}>
      <Text style={[style.title,isFocuse && style.changeBackTitle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ActionButton;
