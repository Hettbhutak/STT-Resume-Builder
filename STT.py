import whisper
import sounddevice as sd
from scipy.io.wavfile import write
import tempfile
import os

# Record duration (in seconds)
duration = 5  # change to any length
sample_rate = 16000

def record_audio(duration, sample_rate):
    print("🎤 Recording started...")
    audio = sd.rec(int(duration * sample_rate), samplerate=sample_rate, channels=1)
    sd.wait()
    print("✅ Recording finished.")
    
    # Save to a temporary WAV file
    tmp_file = tempfile.NamedTemporaryFile(delete=False, suffix=".wav")
    write(tmp_file.name, sample_rate, audio)
    return tmp_file.name

def transcribe_audio(file_path):
    print("🔍 Loading Whisper model (tiny)...")
    model = whisper.load_model("tiny")  # Options: tiny, base, small, medium, large
    print("🧠 Transcribing...")
    result = model.transcribe(file_path)
    return result["text"]

# Main process
if __name__ == "__main__":
    file_path = record_audio(duration, sample_rate)
    text = transcribe_audio(file_path)
    print("\n📝 Transcribed Text:\n", text)

    # Clean up temp file
    os.remove(file_path)
