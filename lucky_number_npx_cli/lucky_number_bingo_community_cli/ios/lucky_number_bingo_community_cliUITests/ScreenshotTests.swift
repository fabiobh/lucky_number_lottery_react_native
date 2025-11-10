import XCTest

class ScreenshotTests: XCTestCase {
    
    var app: XCUIApplication!
    
    override func setUp() {
        super.setUp()
        continueAfterFailure = false
        app = XCUIApplication()
        setupSnapshot(app)
        app.launch()
    }
    
    override func tearDown() {
        super.tearDown()
    }
    
    func testGenerateScreenshots() {
        print("🎬 Iniciando captura de screenshots...")
        
        // Aguardar app carregar completamente
        sleep(3)
        
        // Screenshot 1: Tela inicial
        print("📸 Capturando tela inicial...")
        snapshot("01-HomeScreen")
        
        // Aguardar um pouco entre screenshots
        sleep(2)
        
        // Screenshot 2: Tentar capturar após interação básica
        print("📸 Capturando segunda tela...")
        snapshot("02-SecondScreen")
        
        print("✅ Screenshots capturados com sucesso!")
    }
}
