import {
  Animated,
  ScrollView,
  Text,
  View,
  Dimensions,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Svg, {Path, Line, Rect} from 'react-native-svg';
import ActionButton from 'components/ActionButton';
const {width, height} = Dimensions.get('window');
const ITEM_COUNT = 6; // Number of vertical items
const SPACING_MIN = 5; // Minimum vertical spacing (when scrolled far)
const SPACING_MAX = 30; // Maximum vertical spacing (when in focus)
const ITEM_WIDTH = 200; // Width of horizontal items
const ITEM_HEIGHT_MAX = 100; // Normal height for items
const ITEM_HEIGHT_MIN = 60; // Reduced height for items
const AnimatedLine = Animated.createAnimatedComponent(Line);
const AnimatedSVG = Animated.createAnimatedComponent(Svg);
import styles from './style';
import {useDispatch} from 'react-redux';
import {endLoading, startLoading} from '../../redux/action/SpinnerAction';
import ApiService from 'services/apiService';
import ItemView from 'components/ItemView';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from 'components/Header';
import {MainDataType} from '../../../type';
import colors from 'constant/colors';

const Home = () => {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const scrollViewRef = React.useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const dispatch = useDispatch();
  const [leagueData, setLeagueData] = useState([]);

  useEffect(() => {
    getAllKnockoutData();
  }, []);

  const getAllKnockoutData = () => {
    dispatch(startLoading());
    ApiService.getAllKnockoutData()
      .then(res => {
        dispatch(endLoading());
        let allData = res?.data?.data;
        const filterQuarterFinalData = allData.filter(
          (a: any) => a.level === 'QUARTER_FINAL',
        );
        const filterSemiFinalData = allData.filter(
          (a: any) => a.level === 'SEMI_FINAL',
        );
        const filterFinalData = allData.filter((a: any) => a.level === 'FINAL');
        setLeagueData([
          filterQuarterFinalData,
          filterSemiFinalData,
          filterFinalData,
        ]);
      })
      .catch(error => {
        dispatch(endLoading());
        console.log(error);
      });
  };

  const onScroll = Animated.event(
    [{nativeEvent: {contentOffset: {x: scrollX}}}],
    {
      useNativeDriver: false,
      listener: event => {
        const offsetX = event.nativeEvent.contentOffset.x;
        const currentIndex = Math.round(offsetX / (ITEM_WIDTH + 60)); // Calculate the active index
        setActiveIndex(currentIndex); // Update the active index
      },
    },
  );

  const onPressNaviation = (type: string) => {
    let targetIndex = 0;

    switch (type) {
      case 'quotarFinal':
        console.log('.....', type);
        targetIndex = 0;
        break;

      case 'semiFinal':
        console.log('.....', type);
        targetIndex = 1;
        break;

      case 'final':
        console.log('.....', type);
        targetIndex = 2;
        break;

      default:
        break;
    }

    scrollViewRef.current?.scrollTo({
      x: targetIndex * (ITEM_WIDTH + 60),
      animated: true,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header isImage={false} title="Matches" />
      <View style={{flexDirection: 'row',marginVertical:10}}>
        <ActionButton
          title="Quotar Final"
          onPress={() => onPressNaviation('quotarFinal')}
          isFocuse={activeIndex == 0 ? true : false}
        />
        <ActionButton
          title="Semi Final"
          onPress={() => onPressNaviation('semiFinal')}
          isFocuse={activeIndex == 1 ? true : false}
        />
        <ActionButton
          title="Final"
          onPress={() => onPressNaviation('final')}
          isFocuse={activeIndex == 2 ? true : false}
        />
      </View>
      <View style={styles.bookingContainer}>
        <Text style={styles.bookingText}>Presented By </Text>
        <View style={styles.bookingBack}>
          <Text style={styles.bookingText}>Booking.com</Text>
        </View>
      </View>
      <Animated.ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        ref={scrollViewRef}
        onScroll={onScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{paddingHorizontal: width / 4}}>
        {leagueData.map((newItem: MainDataType[], index: number) => {
          const inputRange = [
            (index - 1) * ITEM_WIDTH, // Before the horizontal item
            index * ITEM_WIDTH, // At the horizontal item
            (index + 1) * ITEM_WIDTH, // After the horizontal item
          ];

          const spacing = scrollX.interpolate({
            inputRange,
            outputRange: [100, SPACING_MAX, SPACING_MIN], // Decrease vertical spacing dynamically
            extrapolate: 'clamp',
          });
          const bracketSpacing = scrollX.interpolate({
            inputRange,
            outputRange: [150, 170, 150], // Decrease vertical spacing dynamically
            extrapolate: 'clamp',
          });
          const group1Height = scrollX.interpolate({
            inputRange,
            outputRange: [ITEM_HEIGHT_MAX, ITEM_HEIGHT_MAX, ITEM_HEIGHT_MIN], // Reduce height
            extrapolate: 'clamp',
          });

          const marginVertical = scrollX.interpolate({
            inputRange,
            outputRange: [60, 80, 0], // Adjust vertical margin dynamically
            extrapolate: 'clamp',
          });

          return (
            <View style={{flexDirection: 'row'}} key={index}>
              <Animated.View key={index} style={[styles.horizontalItem]}>
                {newItem.map((teamData, idx) => (
                  <Animated.View
                    key={idx}
                    style={[
                      styles.verticalItem,
                      {
                        marginVertical: idx === ITEM_COUNT - 1 ? 0 : spacing, // Apply dynamic spacing between vertical items
                        height: group1Height,
                      },
                    ]}>
                    <ItemView
                      image={teamData.away_team.flag}
                      country={teamData.away_team.name}
                      score={teamData.away_team.score}
                    />
                    <ItemView
                      image={teamData.home_team.flag}
                      country={teamData.home_team.name}
                      score={teamData.home_team.score}
                    />
                  </Animated.View>
                ))}
              </Animated.View>
              <View
                key={index}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {Array.from({length: newItem.length / 2}).map((_, idx) => (
                  <Animated.View
                    key={`${index}-svg-${idx}`}
                    style={{
                      marginVertical, // Use the dynamic margin
                    }}>
                    <AnimatedSVG width="70" height={bracketSpacing}>
                      {/* Horizontal Line */}
                      <AnimatedLine
                        x1="0"
                        y1={scrollX.interpolate({
                          inputRange: [
                            (index - 1) * ITEM_WIDTH,
                            index * ITEM_WIDTH,
                            (index + 1) * ITEM_WIDTH,
                          ],
                          outputRange: [10, 10, 40], // Dynamic start position
                          extrapolate: 'clamp',
                        })}
                        x2="30"
                        y2={scrollX.interpolate({
                          inputRange: [
                            (index - 1) * ITEM_WIDTH,
                            index * ITEM_WIDTH,
                            (index + 1) * ITEM_WIDTH,
                          ],
                          outputRange: [10, 10, 40], // Dynamic end position
                          extrapolate: 'clamp',
                        })}
                        stroke={colors.darkWhite}
                        color={colors.darkWhite}
                        strokeWidth="2"
                      />
                      {/*Verticle Line*/}
                      <AnimatedLine
                        x1="30"
                        y1={scrollX.interpolate({
                          inputRange: [
                            (index - 1) * ITEM_WIDTH,
                            index * ITEM_WIDTH,
                            (index + 1) * ITEM_WIDTH,
                          ],
                          outputRange: [20, 10, 40], // Dynamic start position
                          extrapolate: 'clamp',
                        })}
                        x2="30"
                        y2={scrollX.interpolate({
                          inputRange: [
                            (index - 1) * ITEM_WIDTH,
                            index * ITEM_WIDTH,
                            (index + 1) * ITEM_WIDTH,
                          ],
                          outputRange: [100, 150, 120], // Dynamic end position
                          extrapolate: 'clamp',
                        })}
                        stroke={colors.darkWhite}
                        color={colors.darkWhite}
                        strokeWidth="2"
                      />
                      {/* Horizontal Line to next match */}
                      <AnimatedLine
                        x1="0"
                        y1={scrollX.interpolate({
                          inputRange: [
                            (index - 1) * ITEM_WIDTH,
                            index * ITEM_WIDTH,
                            (index + 1) * ITEM_WIDTH,
                          ],
                          outputRange: [100, 150, 120], // Dynamic start position
                          extrapolate: 'clamp',
                        })}
                        x2="30"
                        y2={scrollX.interpolate({
                          inputRange: [
                            (index - 1) * ITEM_WIDTH,
                            index * ITEM_WIDTH,
                            (index + 1) * ITEM_WIDTH,
                          ],
                          outputRange: [100, 150, 120], // Dynamic end position
                          extrapolate: 'clamp',
                        })}
                        stroke={colors.darkWhite}
                        color={colors.darkWhite}
                        strokeWidth="2"
                      />
                      <AnimatedLine
                        x1="30"
                        y1={scrollX.interpolate({
                          inputRange: [
                            (index - 1) * ITEM_WIDTH,
                            index * ITEM_WIDTH,
                            (index + 1) * ITEM_WIDTH,
                          ],
                          outputRange: [70, 80, 75], // Dynamic start position
                          extrapolate: 'clamp',
                        })}
                        x2="60"
                        y2={scrollX.interpolate({
                          inputRange: [
                            (index - 1) * ITEM_WIDTH,
                            index * ITEM_WIDTH,
                            (index + 1) * ITEM_WIDTH,
                          ],
                          outputRange: [70, 80, 75], // Dynamic end position
                          extrapolate: 'clamp',
                        })}
                        stroke={colors.darkWhite}
                        color={colors.darkWhite}
                        strokeWidth="2"
                      />
                    </AnimatedSVG>
                  </Animated.View>
                ))}
              </View>
            </View>
          );
        })}
        <View style={{justifyContent: 'center'}}>
          {leagueData.length > 0 && (
            <Image
              source={require('../../assets/images/trofi.png')} // Replace with your image URL
              style={{width: 80, height: 120}}
            />
          )}
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

export default Home;
