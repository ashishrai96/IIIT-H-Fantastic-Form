from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity
import speech_recognition as sr
from pydub import AudioSegment
import contextlib, wave, math
import subprocess
from pydub.utils import make_chunks
import shutil
from flask import request
from werkzeug.utils import secure_filename
import os

def Audio_to_Transcript():
    subprocess.call(['ffmpeg', '-i', 'test.mp3', 'transcript.wav'])
                                                         
    AUDIO_FILE = "transcript.wav"

    with contextlib.closing(wave.open(AUDIO_FILE,'r')) as f:
        frames = f.getnframes()
        rate = f.getframerate()
        duration = frames / float(rate)

    r = sr.Recognizer()
    f = open("transcription.txt", "w+")
    sound = AudioSegment.from_wav("transcript.wav")

    folder_name = "audio-chunks"
    if not os.path.isdir(folder_name):
        os.mkdir(folder_name)
    os.chdir(folder_name)

    chunk_length_ms = math.ceil(duration / 20) * 1000 
    chunks = make_chunks(sound , chunk_length_ms)
    for i, chunk in enumerate(chunks):
        chunk_silent = AudioSegment.silent(duration = 10)
        audio_chunk = chunk_silent + chunk + chunk_silent 
        chunk_name = "{0}.wav".format(i) 
        print ("exporting", chunk_name) 
        audio_chunk.export(chunk_name, format="wav") 

    i = 0
    for chunk in chunks:
        filename = str(i)+'.wav'
        print("Processing chunk "+str(i))
        file = filename
        with sr.AudioFile(file) as source:
            r.adjust_for_ambient_noise(source)
            audio_listened = r.listen(source)
        try:
            rec = r.recognize_google(audio_listened)
            f.write(rec+". ")
        except sr.UnknownValueError:
            print("Could not understand audio")
        except sr.RequestError as e:
            print("Could not request results. check your internet connection")
        i += 1

    os.chdir('..')
    f.close()
    shutil.rmtree(os.getcwd() + "\\" + folder_name)
    os.remove("test.mp3")
    os.remove("transcript.wav")

class Transcipt(Resource):
    @jwt_required()
    def post():
        f = request.files['file']
        codec = f.filename[-4:]
        f.filename = "test" + codec
        f.save(secure_filename(f.filename))
        Audio_to_Transcript()
        if os.path.exists("transcription.txt") == True:
            f = open("transcription.txt", "r")
            file_text = ""
            file_text += f.read()
            f.close()
            os.remove("transcription.txt")
            data = {
            200 : file_text
            }
            return data
        else:
            data = {
            500 : "Audio could not be Transcribed. Faulty Audio. Please Try Again."
            }
            return data