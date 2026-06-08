from rules import RulesAgentPlanificator
from memory import Memory
class Tools:
  # rules = RulesAgentPlanificator
  def __init__(self):
    self.tools = RulesAgentPlanificator

  def crearTarea(self, tarea, duracion):
   new_task = {"task": tarea, "duration": duracion}
   Memory.write_json_routine_new(new_task)
   print(f"\n[⚡ ACCIÓN INTERNA]: Escribiendo '{new_task}' en cronograma.json...")
   return f"Tarea guardada en el JSON exitosamente."
  
  def actualizarTarea(self, name_old_task,tarea, duracion):
    new_task = {"task": tarea, "duration": duracion}
    Memory.update_task(name_old_task, new_task)
    print(f"\n[⚡ ACCIÓN INTERNA]: Actualizando '{new_task}' en cronograma.json...")
    return f"Tarea actualizada en el JSON exitosamente."
    
  def eliminarTarea(self, name_task):
    Memory.deleteTask(name_task)
    print(f"\n[⚡ ACCIÓN INTERNA]: Eliminando '{name_task}' en cronograma.json...")
    return f"Tarea eliminada en el JSON exitosamente."