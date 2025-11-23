// Mock setup for React Native Testing Library

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
}));

// Mock react-native-localize
jest.mock('react-native-localize', () => ({
    getLocales: () => [{ languageCode: 'en', countryCode: 'US' }],
    getNumberFormatSettings: () => ({
        decimalSeparator: '.',
        groupingSeparator: ',',
    }),
    getCalendar: () => 'gregorian',
    getCountry: () => 'US',
    getCurrencies: () => ['USD'],
    getTemperatureUnit: () => 'celsius',
    getTimeZone: () => 'America/New_York',
    uses24HourClock: () => false,
    usesMetricSystem: () => false,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
}));


// Mock react-native-vector-icons
jest.mock('react-native-vector-icons/MaterialCommunityIcons', () => 'Icon');

// Mock react-native-reanimated
jest.mock('react-native-reanimated', () => {
    const Reanimated = require('react-native-reanimated/mock');
    Reanimated.default.call = () => { };
    return Reanimated;
});

// Mock react-native-gesture-handler
jest.mock('react-native-gesture-handler', () => {
    const View = require('react-native/Libraries/Components/View/View');
    return {
        Swipeable: View,
        DrawerLayout: View,
        State: {},
        ScrollView: View,
        Slider: View,
        Switch: View,
        TextInput: View,
        ToolbarAndroid: View,
        ViewPagerAndroid: View,
        DrawerLayoutAndroid: View,
        WebView: View,
        NativeViewGestureHandler: View,
        TapGestureHandler: View,
        FlingGestureHandler: View,
        ForceTouchGestureHandler: View,
        LongPressGestureHandler: View,
        PanGestureHandler: View,
        PinchGestureHandler: View,
        RotationGestureHandler: View,
        RawButton: View,
        BaseButton: View,
        RectButton: View,
        BorderlessButton: View,
        FlatList: View,
        gestureHandlerRootHOC: jest.fn(),
        Directions: {},
    };
});

// Mock react-native-toast-message
jest.mock('react-native-toast-message', () => {
    const React = require('react');
    return {
        __esModule: true,
        default: () => React.createElement('Toast', null),
        show: jest.fn(),
        hide: jest.fn(),
    };
});
