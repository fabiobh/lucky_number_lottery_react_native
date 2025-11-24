import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Animated, Dimensions} from 'react-native';
import {getColors} from '../constants';
import {useTheme} from '../contexts/ThemeContext';

export interface ToastMessage {
  id: string;
  text1: string;
  type: 'success' | 'error' | 'info';
  visibilityTime?: number;
}

interface MultiToastProps {
  messages: ToastMessage[];
  onRemove: (id: string) => void;
}

const {width} = Dimensions.get('window');
const TOAST_HEIGHT = 70;
const TOAST_MARGIN = 10;

export const MultiToast: React.FC<MultiToastProps> = ({messages, onRemove}) => {
  const {isDarkMode} = useTheme();
  const colors = getColors(isDarkMode);
  const styles = createStyles(colors);

  return (
    <View style={styles.container} pointerEvents="box-none">
      {messages.map((message, index) => (
        <ToastItem
          key={message.id}
          message={message}
          index={index}
          onRemove={onRemove}
          colors={colors}
        />
      ))}
    </View>
  );
};

interface ToastItemProps {
  message: ToastMessage;
  index: number;
  onRemove: (id: string) => void;
  colors: any;
}

const ToastItem: React.FC<ToastItemProps> = ({
  message,
  index,
  onRemove,
  colors,
}) => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(50));
  const styles = createStyles(colors);

  useEffect(() => {
    // Animate in
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    // Auto hide after visibilityTime
    const timer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 50,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        onRemove(message.id);
      });
    }, message.visibilityTime || 3000);

    return () => clearTimeout(timer);
  }, [message.id, message.visibilityTime, fadeAnim, slideAnim, onRemove]);

  const getBackgroundColor = () => {
    switch (message.type) {
      case 'success':
        return colors.success;
      case 'error':
        return colors.danger;
      case 'info':
        return colors.primary;
      default:
        return colors.primary;
    }
  };

  const bottomPosition = index * (TOAST_HEIGHT + TOAST_MARGIN) + 20;

  return (
    <Animated.View
      style={[
        styles.toast,
        {
          backgroundColor: getBackgroundColor(),
          opacity: fadeAnim,
          transform: [{translateY: slideAnim}],
          bottom: bottomPosition,
        },
      ]}>
      <Text style={styles.toastText}>{message.text1}</Text>
    </Animated.View>
  );
};

const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      alignItems: 'center',
      zIndex: 9999,
    },
    toast: {
      position: 'absolute',
      width: width - 40,
      minHeight: TOAST_HEIGHT,
      paddingHorizontal: 20,
      paddingVertical: 15,
      borderRadius: 12,
      shadowColor: colors.shadow,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 8,
      justifyContent: 'center',
      alignItems: 'center',
    },
    toastText: {
      color: colors.white,
      fontSize: 16,
      fontWeight: '600',
      textAlign: 'center',
    },
  });
