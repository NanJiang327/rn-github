import { MAIN_NAVIGATOR } from '../constants/route';

export default class NavigationUtils {
  static restToHome(navigation) {
    navigation.navigate(MAIN_NAVIGATOR);
  }
}
