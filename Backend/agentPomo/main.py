from fastapi import FastAPI, UploadFile, File
from transcribe import Whisper
from mistral import ModelIA
from utils import uploadFileAudio


app = FastAPI()


@app.get("/")
def read_root():
  iaModel = ModelIA()
  firstAudio = Whisper('Grabación (2).m4a')

  text = firstAudio.audiotoText()

  pomoJson = iaModel.textToPomodoro(text)
  return pomoJson




@app.post("/upload-audio")
async def receive_audio(file: UploadFile = File(...)):
  iaModel = ModelIA()
  informationFile = uploadFileAudio(file=file)
  iaAudio = Whisper(informationFile['filename'])
  text = iaAudio.audiotoText()
  pomoJson = iaModel.textToPomodoro(text)
  return pomoJson
  

