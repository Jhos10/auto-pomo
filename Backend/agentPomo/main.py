from fastapi import FastAPI, UploadFile, File
from transcribe import Whisper
from mistral import ModelIA
from utils import uploadFileAudio


app = FastAPI()

# os.makedirs(UPLOAD_DIR, exist_ok=True)
@app.get("/")
def read_root():
  iaModel = ModelIA()
  firstAudio = Whisper('Grabación (2).m4a')

  text = firstAudio.audiotoText()

  pomoJson = iaModel.textToPomodoro(text)
  return pomoJson




@app.post("/upload-audio")
async def receive_audio(file: UploadFile = File(...)):
  informationFile = uploadFileAudio(file=file)


