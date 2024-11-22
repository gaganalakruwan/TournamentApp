export declare type commonState = {
  loading: boolean;
  spinnerMessage: string;
};
export declare interface ReduxState {
  common: commonState;
}

export declare enum IconType {
  FontAwesome = 'FontAwesome',
  AntDesign = 'AntDesign',
  MaterialIcons = 'MaterialIcons',
  EvilIcons = 'EvilIcons',
  Entypo = 'Entypo',
  Foundation = 'Foundation',
  Ionicons = 'Ionicons',
  MaterialCommunityIcons = 'MaterialCommunityIcons',
  Zocial = 'Zocial',
  Octicons = 'Octicons',
  SimpleLineIcons = 'SimpleLineIcons',
  Fontisto = 'Fontisto',
  Feather = 'Feather',
  FontAwesome5 = 'FontAwesome5',
}
export interface IconProps extends TextProps {
  type: IconType;
  name: string;
  size?: number;
  color?: string;
  brand?: string;
  solid?: string;
  onPress?: (event: GestureResponderEvent) => void;
  style?: TextStyle;
}

export declare type MainDataType = {
  id: number;
  stage: string;
  level: string;
  date: string;
  status: string;
  media: {
    thumbnail_path: any;
    path: any;
  };
  home_team: TeamDataType;
  away_team: TeamDataType;
  group: {
    id: any;
    name: any;
    round: any;
  };
  tournament: TournamentDataType;
};

export declare type TeamDataType = {
  id: number;
  name: string;
  flag: string;
  score: number;
  penalties: string;
  paid: boolean;
  is_did_not_attend: number;
  group: {
    id: number;
    name: string;
    position: number;
  };
  parent_fixture_id: string;
};
export declare type TournamentDataType = {
  id: number;
  name: string;
  type: string;
  level: string;
  season: string;
};
