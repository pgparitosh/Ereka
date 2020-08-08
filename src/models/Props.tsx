import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams
} from "react-navigation";

export interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  theme: any;
}
