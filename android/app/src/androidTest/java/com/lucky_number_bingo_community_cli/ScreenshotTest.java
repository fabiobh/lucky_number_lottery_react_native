package com.lucky_number_bingo_community_cli;

import androidx.test.ext.junit.rules.ActivityScenarioRule;
import androidx.test.ext.junit.runners.AndroidJUnit4;
import androidx.test.filters.LargeTest;
import androidx.test.uiautomator.UiDevice;
import androidx.test.uiautomator.UiObject;
import androidx.test.uiautomator.UiSelector;

import org.junit.ClassRule;
import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;

import tools.fastlane.screengrab.Screengrab;
import tools.fastlane.screengrab.UiAutomatorScreenshotStrategy;
import tools.fastlane.screengrab.locale.LocaleTestRule;

import static androidx.test.platform.app.InstrumentationRegistry.getInstrumentation;

@LargeTest
@RunWith(AndroidJUnit4.class)
public class ScreenshotTest {

    @ClassRule
    public static final LocaleTestRule localeTestRule = new LocaleTestRule();

    @Rule
    public ActivityScenarioRule<MainActivity> activityRule = new ActivityScenarioRule<>(MainActivity.class);

    @Test
    public void testTakeScreenshots() throws Exception {
        Screengrab.setDefaultScreenshotStrategy(new UiAutomatorScreenshotStrategy());
        UiDevice device = UiDevice.getInstance(getInstrumentation());
        
        // Aguardar app carregar
        Thread.sleep(3000);
        
        // Screenshot 1: Tela inicial
        Screengrab.screenshot("01-HomeScreen");
        Thread.sleep(1000);
        
        // Tentar clicar em botões visíveis
        try {
            // Procurar e clicar em botões
            UiObject button1 = device.findObject(new UiSelector().clickable(true).index(0));
            if (button1.exists()) {
                button1.click();
                Thread.sleep(2000);
                Screengrab.screenshot("02-AfterFirstButton");
            }
        } catch (Exception e) {
            // Continuar se não encontrar
        }
        
        // Tentar navegar para opções
        try {
            UiObject optionsButton = device.findObject(new UiSelector().textContains("Options"));
            if (optionsButton.exists()) {
                optionsButton.click();
                Thread.sleep(2000);
                Screengrab.screenshot("03-OptionsScreen");
                device.pressBack();
                Thread.sleep(1000);
            }
        } catch (Exception e) {
            // Continuar
        }
        
        // Tentar navegar para tela de jogo
        try {
            UiObject gameButton = device.findObject(new UiSelector().textContains("Game"));
            if (gameButton.exists()) {
                gameButton.click();
                Thread.sleep(2000);
                Screengrab.screenshot("04-GameScreen");
                
                // Clicar em alguns botões da tela de jogo
                for (int i = 0; i < 3; i++) {
                    try {
                        UiObject actionButton = device.findObject(new UiSelector().clickable(true).index(i));
                        if (actionButton.exists()) {
                            actionButton.click();
                            Thread.sleep(1000);
                            Screengrab.screenshot("05-GameScreen-Action" + (i + 1));
                        }
                    } catch (Exception ex) {
                        // Continuar
                    }
                }
            }
        } catch (Exception e) {
            // Continuar
        }
        
        // Tentar alternar tema
        try {
            UiObject themeButton = device.findObject(new UiSelector().textMatches("(?i).*theme.*|.*dark.*|.*light.*"));
            if (themeButton.exists()) {
                themeButton.click();
                Thread.sleep(1000);
                Screengrab.screenshot("06-DifferentTheme");
            }
        } catch (Exception e) {
            // Continuar
        }
        
        // Capturar mais interações
        for (int i = 0; i < 5; i++) {
            try {
                UiObject button = device.findObject(new UiSelector().clickable(true).index(i));
                if (button.exists()) {
                    button.click();
                    Thread.sleep(1000);
                    Screengrab.screenshot(String.format("%02d-Button%d", 7 + i, i + 1));
                }
            } catch (Exception e) {
                // Continuar
            }
        }
    }
}
