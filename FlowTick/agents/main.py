import requests
from agent import AgentPlanificator
from rules import RulesAgentPlanificator

if "__main__" == __name__:
  # ask_model("Hola")
  rules_agent = RulesAgentPlanificator()
  agent = AgentPlanificator('gemini-2.5-flash',rules_agent)
  while True:
    message = input("Tu:")
    print(agent.procces_response(message))