export const LightColors = {
  primary: '#0F9D58',
  secondary: '#6B46C1',
  background: '#F8F9FA',
  textPrimary: '#212529',
  textSecondary: '#6C757D',
  border: '#DEE2E6',
  shadow: '#000',
  white: '#FFFFFF',
  gray: '#ADB5BD',
  success: '#A5D6A7',
  danger: '#DC3545',
  light_gray: '#EAEAEA',
  gray_text: '#95A5A6',
  dark_gray: '#2C3E50',
};

export const DarkColors = {
  primary: '#0F9D58',
  secondary: '#8B5CF6',
  background: '#121212',
  textPrimary: '#FFFFFF',
  textSecondary: '#B0B0B0',
  border: '#333333',
  shadow: '#000',
  white: '#1E1E1E',
  gray: '#666666',
  success: '#4CAF50',
  danger: '#F44336',
  light_gray: '#2A2A2A',
  gray_text: '#888888',
  dark_gray: '#E0E0E0',
};

// Legacy export for backward compatibility
export const Colors = LightColors;

export const getColors = (isDarkMode: boolean) => {
  return isDarkMode ? DarkColors : LightColors;
};
