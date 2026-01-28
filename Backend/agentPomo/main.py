from fastapi import FastAPI, UploadFile, File
from transcribe import Whisper
import shutil
import os

app = FastAPI()
UPLOAD_DIR = "agentPomo/audio"
# os.makedirs(UPLOAD_DIR, exist_ok=True)
@app.get("/")
def read_root():
  firstAudio = Whisper('Grabacion.mp3')
  text = firstAudio.audiotoText()
  return {"text": text}



@app.post("/upload-audio")
async def receive_audio(file: UploadFile = File(...)):

  file_path = os.path.join(UPLOAD_DIR, file.filename)
  
  with open(file_path, "wb") as buffer:
    shutil.copyfileobj(file.file,buffer)

  return {
    "filename": file.filename,
    "meessage": "Audio recibido y guardado con éxito"
  }
