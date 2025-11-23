import { getColors, LightColors, DarkColors } from '../src/constants';

describe('constants', () => {
    describe('LightColors', () => {
        it('should have all required color properties', () => {
            expect(LightColors).toHaveProperty('primary');
            expect(LightColors).toHaveProperty('secondary');
            expect(LightColors).toHaveProperty('background');
            expect(LightColors).toHaveProperty('textPrimary');
            expect(LightColors).toHaveProperty('textSecondary');
            expect(LightColors).toHaveProperty('border');
            expect(LightColors).toHaveProperty('shadow');
            expect(LightColors).toHaveProperty('white');
            expect(LightColors).toHaveProperty('gray');
            expect(LightColors).toHaveProperty('success');
            expect(LightColors).toHaveProperty('danger');
            expect(LightColors).toHaveProperty('light_gray');
            expect(LightColors).toHaveProperty('gray_text');
            expect(LightColors).toHaveProperty('dark_gray');
        });

        it('should have valid hex color values', () => {
            const hexColorRegex = /^#([0-9A-F]{3}|[0-9A-F]{6})$/i;

            Object.values(LightColors).forEach(color => {
                expect(color).toMatch(hexColorRegex);
            });
        });

        it('should have specific color values', () => {
            expect(LightColors.primary).toBe('#0F9D58');
            expect(LightColors.secondary).toBe('#6B46C1');
            expect(LightColors.background).toBe('#F8F9FA');
            expect(LightColors.white).toBe('#FFFFFF');
        });
    });

    describe('DarkColors', () => {
        it('should have all required color properties', () => {
            expect(DarkColors).toHaveProperty('primary');
            expect(DarkColors).toHaveProperty('secondary');
            expect(DarkColors).toHaveProperty('background');
            expect(DarkColors).toHaveProperty('textPrimary');
            expect(DarkColors).toHaveProperty('textSecondary');
            expect(DarkColors).toHaveProperty('border');
            expect(DarkColors).toHaveProperty('shadow');
            expect(DarkColors).toHaveProperty('white');
            expect(DarkColors).toHaveProperty('gray');
            expect(DarkColors).toHaveProperty('success');
            expect(DarkColors).toHaveProperty('danger');
            expect(DarkColors).toHaveProperty('light_gray');
            expect(DarkColors).toHaveProperty('gray_text');
            expect(DarkColors).toHaveProperty('dark_gray');
        });

        it('should have valid hex color values', () => {
            const hexColorRegex = /^#([0-9A-F]{3}|[0-9A-F]{6})$/i;

            Object.values(DarkColors).forEach(color => {
                expect(color).toMatch(hexColorRegex);
            });
        });

        it('should have specific color values', () => {
            expect(DarkColors.primary).toBe('#0F9D58');
            expect(DarkColors.secondary).toBe('#8B5CF6');
            expect(DarkColors.background).toBe('#121212');
            expect(DarkColors.textPrimary).toBe('#FFFFFF');
        });

        it('should have different background from LightColors', () => {
            expect(DarkColors.background).not.toBe(LightColors.background);
        });
    });

    describe('getColors', () => {
        it('should return LightColors when isDarkMode is false', () => {
            const colors = getColors(false);

            expect(colors).toEqual(LightColors);
        });

        it('should return DarkColors when isDarkMode is true', () => {
            const colors = getColors(true);

            expect(colors).toEqual(DarkColors);
        });

        it('should return different color schemes based on mode', () => {
            const lightColors = getColors(false);
            const darkColors = getColors(true);

            expect(lightColors.background).not.toBe(darkColors.background);
            expect(lightColors.textPrimary).not.toBe(darkColors.textPrimary);
        });

        it('should maintain same primary color across themes', () => {
            const lightColors = getColors(false);
            const darkColors = getColors(true);

            expect(lightColors.primary).toBe(darkColors.primary);
        });
    });

    describe('Color consistency', () => {
        it('should have same number of properties in both themes', () => {
            const lightKeys = Object.keys(LightColors);
            const darkKeys = Object.keys(DarkColors);

            expect(lightKeys.length).toBe(darkKeys.length);
        });

        it('should have matching property names in both themes', () => {
            const lightKeys = Object.keys(LightColors).sort();
            const darkKeys = Object.keys(DarkColors).sort();

            expect(lightKeys).toEqual(darkKeys);
        });
    });
});
