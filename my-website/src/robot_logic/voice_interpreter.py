import speech_recognition as sr
import time
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/listen": {"origins": "http://localhost:3000"}})

class VoiceCommandInterpreter:
    def __init__(self):
        self.recognizer = sr.Recognizer()
        self.microphone = sr.Microphone()
        print("Voice Command Interpreter initialized.")

    def transcribe_voice_command(self):
        with self.microphone as source:
            self.recognizer.adjust_for_ambient_noise(source)
            print("Listening for voice command...")
            try:
                audio = self.recognizer.listen(source, timeout=5)
                command_text = self.recognizer.recognize_google(audio).lower()
                print(f"Transcribed: {command_text}")
                return command_text
            except sr.WaitTimeoutError:
                return "No speech detected within timeout."
            except sr.UnknownValueError:
                return "Google Speech Recognition could not understand audio."
            except sr.RequestError as e:
                return f"Could not request results from Google Speech Recognition service; {e}"

interpreter = VoiceCommandInterpreter()

@app.route('/listen', methods=['POST'])
def listen_command():
    print("Received request on /listen endpoint.")
    command = interpreter.transcribe_voice_command()
    return jsonify({"command": command})

if __name__ == "__main__":
    print("Starting Flask Voice Command API. Ensure PyAudio, SpeechRecognition, Flask, and Flask-Cors are installed.")
    app.run(host='127.0.0.1', port=5000)
