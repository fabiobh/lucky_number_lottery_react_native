#!/usr/bin/env python3
import os
import sys
from pathlib import Path

# Language mapping
LANGUAGES = {
    'ar-SA': 'Arabic',
    'ca': 'Catalan',
    'cs': 'Czech',
    'da': 'Danish',
    'de-DE': 'German',
    'el': 'Greek',
    'en-AU': 'English (Australia)',
    'en-CA': 'English (Canada)',
    'en-GB': 'English (UK)',
    'es-ES': 'Spanish (Spain)',
    'es-MX': 'Spanish (Mexico)',
    'fi': 'Finnish',
    'fr-CA': 'French (Canada)',
    'fr-FR': 'French',
    'he': 'Hebrew',
    'hi': 'Hindi',
    'hr': 'Croatian',
    'hu': 'Hungarian',
    'id': 'Indonesian',
    'it': 'Italian',
    'ja': 'Japanese',
    'ko': 'Korean',
    'ms': 'Malay',
    'nl-NL': 'Dutch',
    'no': 'Norwegian',
    'pl': 'Polish',
    'pt-BR': 'Portuguese (Brazil)',
    'pt-PT': 'Portuguese (Portugal)',
    'ro': 'Romanian',
    'ru': 'Russian',
    'sk': 'Slovak',
    'sv': 'Swedish',
    'th': 'Thai',
    'tr': 'Turkish',
    'uk': 'Ukrainian',
    'vi': 'Vietnamese',
    'zh-Hans': 'Chinese (Simplified)',
    'zh-Hant': 'Chinese (Traditional)'
}

FILES_TO_TRANSLATE = [
    'name.txt',
    'subtitle.txt',
    'description.txt',
    'keywords.txt',
    'promotional_text.txt',
    'release_notes.txt'
]

# Files that should not be translated (URLs, etc.)
SKIP_TRANSLATION = [
    'privacy_url.txt',
    'marketing_url.txt',
    'support_url.txt',
    'apple_tv_privacy_policy.txt'
]

def translate_with_ai(text, target_language, filename):
    """
    Translate text using AI/API service
    You can integrate with:
    - OpenAI API
    - Google Cloud Translation
    - DeepL API
    - Azure Translator
    """
    try:
        # Example using OpenAI (requires openai package and API key)
        # Uncomment and configure if you want to use OpenAI
        """
        import openai
        openai.api_key = os.getenv('OPENAI_API_KEY')
        
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": f"You are a professional translator. Translate the following app store metadata to {target_language}. Maintain the tone and marketing appeal."},
                {"role": "user", "content": text}
            ]
        )
        return response.choices[0].message.content.strip()
        """
        
        # Placeholder - returns original text
        print(f"    ⚠️  No translation service configured - keeping English text")
        return text
        
    except Exception as e:
        print(f"    ❌ Translation error: {e}")
        return text

def process_translations():
    script_dir = Path(__file__).parent
    metadata_path = script_dir / 'metadata'
    source_path = metadata_path / 'en-US'
    
    print("🌍 Starting metadata translation process...")
    print(f"📁 Source: {source_path}\n")
    
    if not source_path.exists():
        print("❌ Error: en-US folder not found!")
        return
    
    translated_count = 0
    skipped_count = 0
    
    for lang_code, lang_name in LANGUAGES.items():
        print(f"\n📝 Processing {lang_name} ({lang_code})...")
        target_path = metadata_path / lang_code
        
        if not target_path.exists():
            print(f"  ⚠️  Folder not found, skipping...")
            continue
        
        for filename in FILES_TO_TRANSLATE:
            source_file = source_path / filename
            target_file = target_path / filename
            
            if not source_file.exists():
                continue
            
            source_text = source_file.read_text().strip()
            if not source_text:
                continue
            
            # Skip URL files
            if filename in SKIP_TRANSLATION:
                target_file.write_text(source_text + '\n')
                print(f"  📋 Copied {filename} (no translation needed)")
                skipped_count += 1
                continue
            
            print(f"  🔄 Translating {filename}...")
            translated_text = translate_with_ai(source_text, lang_name, filename)
            target_file.write_text(translated_text + '\n')
            translated_count += 1
    
    print(f"\n✅ Translation process completed!")
    print(f"📊 Files processed: {translated_count}")
    print(f"📋 Files copied: {skipped_count}")
    print(f"\n💡 To enable actual translation:")
    print("   1. Install translation library: pip install openai")
    print("   2. Set API key: export OPENAI_API_KEY='your-key'")
    print("   3. Uncomment the OpenAI code in this script")
    print("   Or integrate with Google Translate, DeepL, or Azure Translator")

if __name__ == '__main__':
    process_translations()
