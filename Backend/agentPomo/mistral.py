import ollama
import json
import re
class ModelIA:
  model = 'mistral'
  def __init__(self):
    pass

  def textToPomodoro(self, text):
        prompt = """
        Devuelve una rutina tipo Pomodoro basada en las tareas detectadas.

        REGLAS OBLIGATORIAS:
        - Cada bloque de "trabajo" DEBE ser seguido inmediatamente por un bloque de "descanso".
        - NO puede haber dos bloques de trabajo seguidos.
        - NO puede haber dos bloques de descanso seguidos.
        - El descanso depende de la duración del trabajo anterior:

        - Si el trabajo dura hasta 45 minutos → descanso de 5 minutos
        - Si dura entre 46 y 90 minutos → descanso de 10 minutos
        - Si dura entre 91 y 180 minutos → descanso de 15 minutos
        - Si dura más de 180 minutos → descanso de 30 minutos

        - Conserva exactamente las actividades detectadas.
        - Mantén el orden original de las tareas.
        - No inventes actividades nuevas.

        RESPONDE ÚNICAMENTE con un JSON.
        NO markdown.
        NO comentarios.
        NO texto adicional.

        Formato EXACTO:
        {
        "rutina": [
          {"tipo": "trabajo", "actividad": "string", "minutos": number},
          {"tipo": "descanso", "minutos": number}
        ]
        }
        """

        try:
            response = ollama.chat(
                model=self.model,
                messages=[
                    {"role": "system", "content": prompt},
                    {"role": "user", "content": text}
                ],
                options={"temperature": 0}
            )

            content = response["message"]["content"]

            content = content.strip()
            content = re.sub(r"```json|```", "", content)
            content = re.sub(r"//.*", "", content)

            return json.loads(content)

        except Exception as e:
            print("ERROR IA:", e)
            print("RESPUESTA RAW:\n", content)
            return None
