import subprocess
import whisper
class Whisper:
  modelWhisper = 'medium'
  def __init__(self, newAudioPath):
    self.audioPath = newAudioPath
    self.text = None

  def normalizeAudio(self):
    outputPath = f'agentPomo/audio/{self.audioPath.split(".")[0]}Normalize.wav'
    command = [
            "ffmpeg", "-y",
            "-i", f'agentPomo/audio/{self.audioPath}',
            "-ar", "16000",          # 👈 sample rate correcto para Whisper
            "-ac", "1",              # 👈 mono
            "-af", "loudnorm=I=-16:TP=-1.5:LRA=11",
            outputPath
        ]
    try:
        subprocess.run(command, check=True, capture_output=True, text=True)
        return outputPath
    except subprocess.CalledProcessError as e:
        print("--- ERROR DETALLADO DE FFMPEG ---")
        print(e.stderr) 
        raise e
  
  def audiotoText(self):
    audio_normalize_path = self.normalizeAudio()
    try:
      model = whisper.load_model(self.modelWhisper)
      text =  model.transcribe(
            audio_normalize_path,
            language="es",               
            task="transcribe",            
            fp16=False,
            initial_prompt=(
                "Este audio describe una rutina de trabajo y descanso, "
                "menciona actividades y tiempos en minutos."
            )
        )
      self.text = text["text"]
      return self.text
    except Exception as e:
       print(f"Error in the transcription: {e}")
       return None
    