const RNHTMLtoPDF = require('react-native-html-to-pdf');
import Share from 'react-native-share';
import { Platform } from 'react-native';

export interface Card {
  numbers: number[];
  index: number;
}

export const generateCardsPDF = async (
  cards: number[][],
  numbersPerCard: number,
  numCount: number,
  t: (key: string, options?: any) => string,
): Promise<string> => {
  // Generate HTML content for the PDF
  const htmlContent = generateCardsHTML(cards, numbersPerCard, numCount, t);

  try {
    const options = {
      html: htmlContent,
      fileName: `lottery_cards_${Date.now()}`,
      directory: Platform.OS === 'ios' ? 'Documents' : 'Downloads',
      base64: false,
    };

    const file = await RNHTMLtoPDF.convert(options);
    return file.filePath || '';
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};

export const sharePDF = async (filePath: string) => {
  try {
    const shareOptions = {
      title: 'Share Lottery Cards PDF',
      url: Platform.OS === 'ios' ? filePath : `file://${filePath}`,
      type: 'application/pdf',
      failOnCancel: false,
    };

    await Share.open(shareOptions);
  } catch (error) {
    console.error('Error sharing PDF:', error);
    throw error;
  }
};

const generateCardsHTML = (
  cards: number[][],
  numbersPerCard: number,
  numCount: number,
  t: (key: string, options?: any) => string,
): string => {
  const cardsHTML = cards
    .map(
      (card, index) => `
    <div class="card">
      <div class="card-header">
        <h2>${t('card')} ${index + 1}</h2>
        <div class="card-info">
          <span>${numbersPerCard} ${t('numbers')}</span>
        </div>
      </div>
      <div class="card-numbers">
        ${card
          .map(
            number => `
          <div class="number-box">
            <span class="number">${number}</span>
          </div>
        `,
          )
          .join('')}
      </div>
    </div>
  `,
    )
    .join('');

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${t('lotteryCards')}</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            padding: 20px;
            background: #f5f5f5;
          }
          
          .header {
            text-align: center;
            margin-bottom: 30px;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border-radius: 12px;
          }
          
          .header h1 {
            font-size: 32px;
            margin-bottom: 10px;
          }
          
          .header p {
            font-size: 16px;
            opacity: 0.9;
          }
          
          .cards-container {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
            margin-bottom: 20px;
          }
          
          .card {
            background: white;
            border-radius: 12px;
            padding: 20px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            page-break-inside: avoid;
          }
          
          .card-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
            padding-bottom: 10px;
            border-bottom: 2px solid #667eea;
          }
          
          .card-header h2 {
            font-size: 20px;
            color: #333;
          }
          
          .card-info {
            background: #f0f0f0;
            padding: 5px 12px;
            border-radius: 20px;
            font-size: 12px;
            color: #666;
            font-weight: 600;
          }
          
          .card-numbers {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 8px;
          }
          
          .number-box {
            aspect-ratio: 1;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          
          .number {
            color: white;
            font-size: 18px;
            font-weight: bold;
          }
          
          .footer {
            text-align: center;
            margin-top: 30px;
            padding: 15px;
            background: white;
            border-radius: 12px;
            font-size: 12px;
            color: #666;
          }
          
          @media print {
            body {
              background: white;
            }
            
            .cards-container {
              grid-template-columns: repeat(2, 1fr);
            }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🎲 ${t('lotteryCards')}</h1>
          <p>${t('totalCards')}: ${cards.length} | ${t('numbersPerCard')}: ${numbersPerCard} | ${t('totalNumbers')}: ${numCount}</p>
        </div>
        
        <div class="cards-container">
          ${cardsHTML}
        </div>
        
        <div class="footer">
          <p>${t('generatedOn')} ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}</p>
        </div>
      </body>
    </html>
  `;
};
