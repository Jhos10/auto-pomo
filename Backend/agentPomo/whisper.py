import subprocess
import os
class Whisper:
  def __init__(self, newAudioPath):
    self.audioPath = newAudioPath
    self.text = None

  def normalizeAudio(self):
    output_path = f'{self.audioPath.split(".")[0]}Normalize.wav'
    command = [
          "ffmpeg", "-y", "-i", f'agentPomo/audio/{self.audioPath}',
          "-af", "loudnorm=I=-16:TP=-1.5:LRA=11",
          f'agentPomo/audio/{output_path}'
      ]
    try:
        subprocess.run(command, check=True, capture_output=True, text=True)
        return output_path
    except subprocess.CalledProcessError as e:
        print("--- ERROR DETALLADO DE FFMPEG ---")
        print(e.stderr) 
        raise e
  
  def audiotoText(self):
    pass
    