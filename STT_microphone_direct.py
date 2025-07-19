import speech_recognition as sr
import time
import threading
import sys

# Global variable to track if user wants to stop
stop_recording = False

# Try to import keyboard library for key detection
try:
    import keyboard
    KEYBOARD_AVAILABLE = True
    print("✅ Keyboard library available - you can press 's' to stop early")
except ImportError:
    KEYBOARD_AVAILABLE = False
    print("⚠️ Keyboard library not available - using 15 second timeout only")

def listen_for_stop_key():
    """Listen for 's' key to stop recording early"""
    global stop_recording
    if KEYBOARD_AVAILABLE:
        keyboard.wait('s')  # Wait for 's' key press
        stop_recording = True
        print("\n🛑 Stop key pressed - ending recording...")

def record_and_transcribe():
    global stop_recording
    stop_recording = False
    
    # Initialize recognizer
    r = sr.Recognizer()
    
    # Use default microphone as audio source
    with sr.Microphone() as source:
        print("🎙️ Speech-to-Text Program")
        print("=" * 30)
        print("🔧 Adjusting for ambient noise...")
        # Adjust for ambient noise
        r.adjust_for_ambient_noise(source, duration=1)
        
        print("🎤 Listening... Speak now!")
        print("(Recording for up to 15 seconds)")
        if KEYBOARD_AVAILABLE:
            print("💡 Press 's' anytime to stop recording early")
        
        # Start listening for stop key in a separate thread
        if KEYBOARD_AVAILABLE:
            stop_thread = threading.Thread(target=listen_for_stop_key, daemon=True)
            stop_thread.start()
        
        # Record audio with custom logic for early stopping
        try:
            if KEYBOARD_AVAILABLE:
                # Custom listening with stop key support
                audio_frames = []
                start_time = time.time()
                
                # Listen in small chunks to check for stop condition
                while time.time() - start_time < 15.0 and not stop_recording:
                    try:
                        # Listen for a small chunk (0.5 seconds at a time)
                        chunk_audio = r.listen(source, timeout=0.5, phrase_time_limit=0.5)
                        audio_frames.append(chunk_audio.frame_data)
                    except sr.WaitTimeoutError:
                        # Continue listening if no audio in this chunk
                        continue
                
                # Combine all audio chunks
                if audio_frames:
                    # Combine all frame data
                    combined_data = b''.join(audio_frames)
                    # Create AudioData object from combined data
                    audio = sr.AudioData(combined_data, source.SAMPLE_RATE, source.SAMPLE_WIDTH)
                else:
                    print("❌ No speech detected")
                    return "No speech detected"
                    
            else:
                # Fallback to simple 15-second recording
                audio = r.listen(source, timeout=20, phrase_time_limit=15)
            
            print("✅ Recording completed!")
            
        except sr.WaitTimeoutError:
            print("❌ No speech detected within timeout period")
            return "No speech detected"
    
    # Try to transcribe using different services
    print("🧠 Transcribing audio...")
    
    # Try Google Speech Recognition first
    try:
        print("🌐 Using Google Speech Recognition...")
        text = r.recognize_google(audio)
        return text
    except sr.UnknownValueError:
        print("⚠️ Google Speech Recognition could not understand audio")
    except sr.RequestError as e:
        print(f"⚠️ Google Speech Recognition error: {e}")
    
    # Try offline recognition as fallback
    try:
        print("🔄 Trying offline recognition...")
        text = r.recognize_sphinx(audio)
        return text
    except sr.UnknownValueError:
        return "Could not understand the audio"
    except sr.RequestError as e:
        return f"Offline recognition error: {e}"
    except Exception as e:
        return f"Recognition failed: {e}"

# Main process
if __name__ == "__main__":
    try:
        # Check if microphone is available
        print("🔍 Checking microphone availability...")
        mic_list = sr.Microphone.list_microphone_names()
        if not mic_list:
            print("❌ No microphones found!")
            input("Press Enter to exit...")
            exit(1)
        
        print(f"✅ Found {len(mic_list)} microphone(s)")
        print("Using default microphone")
        
        # Record and transcribe
        result = record_and_transcribe()
        
        print("\n📝 Transcribed Text:")
        print(f"'{result}'")
        print("\n✅ Process completed!")
        
    except Exception as e:
        print(f"\n❌ Error: {e}")
    
    input("\nPress Enter to exit...")
