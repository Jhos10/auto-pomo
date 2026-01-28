import os
import shutil
def uploadFileAudio(file):
  UPLOAD_DIR = "agentPomo/audio"
  file_path = os.path.join(UPLOAD_DIR, file.filename)
  
  with open(file_path, "wb") as buffer:
    shutil.copyfileobj(file.file,buffer)

  return {
    "filename": file.filename,
    "meessage": "Audio recibido y guardado con éxito"
  }