import requests
from google.genai import types
from google import genai
from dotenv import load_dotenv
from tools import Tools
import os
load_dotenv()
class AgentPlanificator:
  def __init__(self, pModel, pRules):
    self.client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
    self.model = pModel
    self.rules = pRules.rules
    self.history = []

  # Procesar respuesta
  def procces_response(self, new_messages):
    try:
      tools_agent = Tools()
      self.history.append({'role': 'user', 'parts': [{'text': new_messages}]})
      response = self.client.models.generate_content(
        model=self.model,
        config=types.GenerateContentConfig(
          system_instruction=self.rules,
          contents=self.history,
          tools= [tools_agent.crearTarea, tools_agent.actualizarTarea, tools_agent.eliminarTarea],
        )
      )
      self.history.append({'role': 'assistant', 'parts': [{'text': response.text}]})
      return response.text
    except Exception as e:
      if self.history and self.history[-1]['role'] == 'user':
        self.history.pop()
      return f"Error al momento de interactuar con el modelo, el error es el siguiente: {e}"
