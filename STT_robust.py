import sys
import os
import threading
import time

# Try to import required libraries
try:
    import sounddevice as sd
    from scipy.io.wavfile import write
    import tempfile
    import numpy as np
    print("✅ Basic audio libraries imported successfully")
except ImportError as e:
    print(f"❌ Error importing basic libraries: {e}")
    sys.exit(1)

# Try to import keyboard input library
try:
    import keyboard
    print("✅ Keyboard library imported successfully")
    KEYBOARD_AVAILABLE = True
except ImportError:
    print("⚠️ Keyboard library not available, using input() method")
    KEYBOARD_AVAILABLE = False

# Try different speech recognition approaches
def try_whisper_import():
    try:
        import whisper
        return whisper, "whisper"
    except Exception as e:
        print(f"⚠️ Whisper import failed: {e}")
        return None, None

def try_speech_recognition_import():
    try:
        import speech_recognition as sr
        return sr, "speech_recognition"
    except Exception as e:
        print(f"⚠️ SpeechRecognition import failed: {e}")
        return None, None

# Record duration (in seconds) - no longer used for fixed timing
sample_rate = 16000

# Global variables for recording control
recording = False
audio_data = []

def record_audio_continuous():
    """Record audio continuously until stopped"""
    global recording, audio_data
    
    print("🎤 Recording started... Press 'j' to stop recording")
    
    # Start recording in chunks
    chunk_duration = 0.1  # 100ms chunks
    chunk_size = int(sample_rate * chunk_duration)
    
    audio_data = []
    
    while recording:
        try:
            # Record a small chunk
            chunk = sd.rec(chunk_size, samplerate=sample_rate, channels=1, dtype='float32')
            sd.wait()
            audio_data.append(chunk)
        except Exception as e:
            print(f"Error during recording: {e}")
            break
    
    if audio_data:
        # Combine all chunks
        full_audio = np.concatenate(audio_data, axis=0)
        
        # Convert float32 to int16 (PCM format)
        audio_int16 = (full_audio * 32767).astype(np.int16)
        
        # Save to a temporary WAV file
        tmp_file = tempfile.NamedTemporaryFile(delete=False, suffix=".wav")
        write(tmp_file.name, sample_rate, audio_int16)
        print("✅ Recording finished and saved.")
        return tmp_file.name
    else:
        print("❌ No audio data recorded.")
        return None

def wait_for_keys():
    """Wait for h to start and j to stop recording"""
    global recording
    
    if KEYBOARD_AVAILABLE:
        print("📋 Controls:")
        print("  Press 'h' to START recording")
        print("  Press 'j' to STOP recording")
        print("  Press 'q' to QUIT")
        print("\nWaiting for input...")
        
        while True:
            event = keyboard.read_event()
            if event.event_type == keyboard.KEY_DOWN:
                key = event.name.lower()
                
                if key == 'h' and not recording:
                    recording = True
                    return 'start'
                elif key == 'j' and recording:
                    recording = False
                    return 'stop'
                elif key == 'q':
                    return 'quit'
    else:
        # Fallback method using input()
        print("📋 Controls:")
        print("  Type 'h' and press Enter to START recording")
        print("  Type 'j' and press Enter to STOP recording")
        print("  Type 'q' and press Enter to QUIT")
        
        while True:
            user_input = input("\nEnter command (h/j/q): ").lower().strip()
            
            if user_input == 'h' and not recording:
                recording = True
                return 'start'
            elif user_input == 'j' and recording:
                recording = False
                return 'stop'
            elif user_input == 'q':
                return 'quit'
            else:
                if recording:
                    print("Currently recording... Press 'j' to stop")
                else:
                    print("Not recording... Press 'h' to start")

def transcribe_with_whisper(file_path, whisper_module):
    print("🔍 Loading Whisper model (tiny)...")
    model = whisper_module.load_model("tiny")
    print("🧠 Transcribing...")
    result = model.transcribe(file_path)
    return result["text"]

def transcribe_with_speech_recognition(file_path, sr_module):
    print("🔍 Initializing speech recognition...")
    r = sr_module.Recognizer()
    
    with sr_module.AudioFile(file_path) as source:
        print("🧠 Processing audio...")
        audio = r.record(source)
    
    try:
        print("🌐 Transcribing using Google Speech Recognition...")
        text = r.recognize_google(audio)
        return text
    except sr_module.UnknownValueError:
        return "Could not understand the audio"
    except sr_module.RequestError as e:
        return f"Error with the speech recognition service: {e}"

# Main process
if __name__ == "__main__":
    print("🎙️ Speech-to-Text Program")
    print("=" * 40)
    
    # Try to determine which speech recognition library to use
    whisper_module, whisper_type = try_whisper_import()
    sr_module, sr_type = try_speech_recognition_import()
    
    if whisper_module:
        print("✅ Using OpenAI Whisper for transcription")
        transcribe_func = lambda fp: transcribe_with_whisper(fp, whisper_module)
    elif sr_module:
        print("✅ Using SpeechRecognition library for transcription")
        transcribe_func = lambda fp: transcribe_with_speech_recognition(fp, sr_module)
    else:
        print("❌ No speech recognition library available!")
        print("Please install either 'openai-whisper' or 'SpeechRecognition'")
        sys.exit(1)
    
    try:
        print("\n🎙️ Ready to record!")
        
        while True:
            command = wait_for_keys()
            
            if command == 'quit':
                print("👋 Goodbye!")
                break
            elif command == 'start':
                # Start recording in a separate thread
                record_thread = threading.Thread(target=record_audio_continuous)
                record_thread.daemon = True
                record_thread.start()
            elif command == 'stop':
                # Wait for recording to finish
                time.sleep(0.2)  # Small delay to ensure recording stops
                
                # Get the recorded file
                if audio_data:
                    # Create the audio file from recorded data
                    full_audio = np.concatenate(audio_data, axis=0)
                    audio_int16 = (full_audio * 32767).astype(np.int16)
                    
                    tmp_file = tempfile.NamedTemporaryFile(delete=False, suffix=".wav")
                    write(tmp_file.name, sample_rate, audio_int16)
                    file_path = tmp_file.name
                    
                    print("🧠 Processing audio...")
                    text = transcribe_func(file_path)
                    print("\n📝 Transcribed Text:")
                    print(f"'{text}'")
                    
                    # Clean up temp file
                    os.remove(file_path)
                    print("\n✅ Process completed!")
                    print("\nPress 'h' to record again or 'q' to quit")
                else:
                    print("❌ No audio recorded")
        
    except KeyboardInterrupt:
        print("\n\n👋 Program interrupted by user")
        
    except Exception as e:
        print(f"\n❌ Error during processing: {e}")
        if 'file_path' in locals():
            try:
                os.remove(file_path)
            except:
                pass
    
    input("\nPress Enter to exit...")
