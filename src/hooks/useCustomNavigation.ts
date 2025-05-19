import {
  useNavigation,
  useRoute,
  NavigationProp,
  RouteProp,
  createNavigationContainerRef,
} from '@react-navigation/native';

// Auth 스택 파라미터 타입
export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  FindPassword: undefined;
  Verification: {
    phoneNumber: string;
  };
  Profile: undefined;
  UnivVerification: undefined;
};

// 메인 탭 파라미터 타입
export type MainTabParamList = {
  Home: undefined;
  Search: undefined;
  Profile: undefined;
  Settings: undefined;
};

// 루트 스택 파라미터 타입
export type RootStackParamList = {
  Main: {screen?: keyof MainTabParamList; params?: any} | undefined;
  Auth: {screen?: keyof AuthStackParamList; params?: any} | undefined;
};

// 전체 앱의 네비게이션 타입
export type AppParamList = RootStackParamList & {
  'Auth/Login': undefined;
  'Auth/Register': undefined;
  'Auth/FindPassword': undefined;
  'Auth/Verification': {phoneNumber: string};
  'Auth/Profile': undefined;
  'Auth/UnivVerification': undefined;
  'Main/Home': undefined;
  'Main/Search': undefined;
  'Main/Profile': undefined;
  'Main/Settings': undefined;
};

// 전역 네비게이션 참조 객체
export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export const globalNavigation = {
  navigate: (routeName: string) => {
    if (navigationRef.isReady()) {
      // 경로 형식: "스택/스크린" 또는 "스택"
      const parts = routeName.split('/');

      if (parts.length === 1) {
        // 단순 스택 이동 - 타입 에러 수정
        navigationRef.navigate(parts[0] as keyof RootStackParamList, undefined);
      } else if (parts.length === 2) {
        // 중첩 스크린 이동
        const [stack, screen] = parts;
        if (stack === 'Main') {
          navigationRef.navigate('Main', {
            screen: screen as keyof MainTabParamList,
          });
        } else if (stack === 'Auth') {
          navigationRef.navigate('Auth', {
            screen: screen as keyof AuthStackParamList,
          });
        }
      }
    }
  },

  goBack: () => {
    if (navigationRef.isReady() && navigationRef.canGoBack()) {
      navigationRef.goBack();
    }
  },

  popToTop: () => {
    if (navigationRef.isReady()) {
      navigationRef.dispatch({type: 'POP_TO_TOP'});
    }
  },

  navigateToLogin: () => {
    if (navigationRef.isReady()) {
      navigationRef.navigate('Auth', {screen: 'Login'});
    }
  },

  navigateToHome: () => {
    if (navigationRef.isReady()) {
      navigationRef.navigate('Main', {screen: 'Home'});
    }
  },

  getCurrentRouteName: () => {
    if (navigationRef.isReady()) {
      return navigationRef.getCurrentRoute()?.name;
    }
    return null;
  },
};

/**
 * 컴포넌트 내에서 사용할 수 있는 커스텀 네비게이션 훅
 */
export function useCustomNavigation() {
  // TypeScript 오류를 방지하기 위한 명시적 타입 정의
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList>>();

  return {
    // 원본 네비게이션 객체
    navigation,
    route,

    // 특정 화면으로 이동 (파라미터 지원 추가)
    navigateTo: (routePath: string, params?: any) => {
      const parts = routePath.split('/');

      if (parts.length === 1) {
        const stack = parts[0] as keyof RootStackParamList;
        navigation.navigate(stack, params);
      } else if (parts.length === 2) {
        const [stack, screen] = parts;
        if (stack === 'Main') {
          navigation.navigate('Main', {
            screen: screen as keyof MainTabParamList,
            params: params,
          });
        } else if (stack === 'Auth') {
          navigation.navigate('Auth', {
            screen: screen as keyof AuthStackParamList,
            params: params,
          });
        }
      }
    },

    // 뒤로 가기
    goBack: () => navigation.canGoBack() && navigation.goBack(),

    // 스택의 최상위 화면으로 이동
    popToTop: () => {
      navigation.dispatch({type: 'POP_TO_TOP'});
    },

    // 현재 라우트 이름 가져오기
    getCurrentRouteName: () => route.name,

    // 특정 스크린으로 리셋 (파라미터 지원 추가)
    reset: (routeName: string, params?: any) => {
      const parts = routeName.split('/');

      if (parts.length === 1) {
        const stack = parts[0] as keyof RootStackParamList;
        navigation.reset({
          index: 0,
          routes: [{name: stack, params}],
        });
      } else if (parts.length === 2) {
        const [stack, screen] = parts;
        if (stack === 'Main') {
          navigation.reset({
            index: 0,
            routes: [
              {
                name: 'Main',
                params: {
                  screen: screen as keyof MainTabParamList,
                  params: params,
                },
              },
            ],
          });
        } else if (stack === 'Auth') {
          navigation.reset({
            index: 0,
            routes: [
              {
                name: 'Auth',
                params: {
                  screen: screen as keyof AuthStackParamList,
                  params: params,
                },
              },
            ],
          });
        }
      }
    },
  };
}
