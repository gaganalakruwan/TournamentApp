import {View, Text} from 'react-native';
import React from 'react';
import { Image } from 'react-native';
import style from './style'

type Props = {
  image: string;
  country: string;
  score: number;
};

const ItemView = ({image, country, score}: Props) => {
  return (
    <View
      style={style.container}>
      <View style={{flexDirection: 'row'}}>
        <Image
          source={{uri: image}}
          width={25}
          height={25}
          style={style.image}
        />
        <Text style={style.text}>{country}</Text>
      </View>
      <View>
        <Text style={[style.text]}>{score}</Text>
      </View>
    </View>
  );
};

export default ItemView;
