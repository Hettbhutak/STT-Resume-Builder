import speech_recognition as sr
import sounddevice as sd
from scipy.io.wavfile import write
import tempfile
import os
import numpy as np

# Record duration (in seconds)
duration = 15  # change to any length
sample_rate = 16000

# API Configuration - Add your API keys here for better accuracy
API_KEYS = {
    # Google Cloud Speech-to-Text (more accurate than free version)
    "google_cloud": "https://cloud.google.com/speech-to-text/docs/reference/rest/?apix=true#rest-resource:-v1p1beta1.operations",  # Add your Google Cloud API key here
    
    # Microsoft Azure Speech Services
    "azure": "",  # Add your Azure Speech Services key here
    
    # IBM Watson Speech to Text
    "ibm_username": "",  # Add your IBM Watson username here
    "ibm_password": "",  # Add your IBM Watson password here
    
    # OpenAI Whisper API (most accurate)
    "openai": "",  # Add your OpenAI API key here
}

# API Selection Priority (most accurate first)
API_PRIORITY = [
    "openai_whisper",
    "google_cloud", 
    "azure",
    "ibm",
    "google_free"  # fallback to free Google
]

def record_audio(duration, sample_rate):
    print(" Recording started...")
    print("Speak now...")
    # Record as float32 first
    audio = sd.rec(int(duration * sample_rate), samplerate=sample_rate, channels=1, dtype='float32')
    sd.wait()
    print(" Recording finished.")
    
    # Convert float32 to int16 (PCM format)
    audio_int16 = (audio * 32767).astype(np.int16)
    
    # Save to a temporary WAV file in PCM format
    tmp_file = tempfile.NamedTemporaryFile(delete=False, suffix=".wav")
    write(tmp_file.name, sample_rate, audio_int16)
    return tmp_file.name

def transcribe_audio(file_path):
    print(" Initializing speech recognition...")
    r = sr.Recognizer()
    
    with sr.AudioFile(file_path) as source:
        print(" Processing audio...")
        audio = r.record(source)
    
    # Try APIs in order of accuracy (best to worst)
    for api in API_PRIORITY:
        try:
            if api == "openai_whisper" and API_KEYS["openai"]:
                print(" Using OpenAI Whisper API (Highest Accuracy)...")
                # Note: This would require openai library and API setup
                print(" OpenAI Whisper API integration requires additional setup")
                continue
                
            elif api == "google_cloud" and API_KEYS["google_cloud"]:
                print(" Using Google Cloud Speech-to-Text API (High Accuracy)...")
                text = r.recognize_google_cloud(audio, credentials_json=API_KEYS["google_cloud"])
                print(" Google Cloud transcription successful!")
                return text
                
            elif api == "azure" and API_KEYS["azure"]:
                print(" Using Microsoft Azure Speech Services (High Accuracy)...")
                text = r.recognize_azure(audio, key=API_KEYS["azure"], location="eastus")
                print(" Azure transcription successful!")
                return text
                
            elif api == "ibm" and API_KEYS["ibm_username"] and API_KEYS["ibm_password"]:
                print(" Using IBM Watson Speech to Text (High Accuracy)...")
                text = r.recognize_ibm(audio, username=API_KEYS["ibm_username"], password=API_KEYS["ibm_password"])
                print(" IBM Watson transcription successful!")
                return text
                
            elif api == "google_free":
                print(" Using Google Speech Recognition (Free - Standard Accuracy)...")
                text = r.recognize_google(audio)
                print(" Google free transcription successful!")
                return text
                
        except sr.UnknownValueError:
            print(f" {api} could not understand the audio, trying next API...")
            continue
        except sr.RequestError as e:
            print(f" {api} API error: {e}, trying next API...")
            continue
        except Exception as e:
            print(f" {api} unexpected error: {e}, trying next API...")
            continue
    
    return "Could not transcribe audio with any available API"

# Main process
if __name__ == "__main__":
    print(" High-Accuracy Speech-to-Text Program")
    print("=" * 45)
    
    # Check which APIs are configured
    configured_apis = []
    if API_KEYS["openai"]:
        configured_apis.append("OpenAI Whisper (Highest Accuracy)")
    if API_KEYS["google_cloud"]:
        configured_apis.append("Google Cloud Speech-to-Text")
    if API_KEYS["azure"]:
        configured_apis.append("Microsoft Azure Speech")
    if API_KEYS["ibm_username"] and API_KEYS["ibm_password"]:
        configured_apis.append("IBM Watson Speech")
    
    if configured_apis:
        print(" Configured High-Accuracy APIs:")
        for api in configured_apis:
            print(f"   {api}")
    else:
        print(" No API keys configured - using free Google API")
        print(" For higher accuracy, add API keys to the API_KEYS section")
    
    print("\n" + "=" * 45)
    
    file_path = record_audio(duration, sample_rate)
    text = transcribe_audio(file_path)
    print("\n Transcribed Text:")
    print(f"'{text}'")

    # Clean up temp file
    os.remove(file_path)
    print("\n Process completed!")
    
    if not any(API_KEYS.values()):
        print("\n Pro Tip: For better accuracy, consider adding API keys for:")
        print("   OpenAI Whisper API (Best)")
        print("   Google Cloud Speech-to-Text")
        print("   Microsoft Azure Speech Services")
        print("   IBM Watson Speech to Text")
