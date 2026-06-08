
class RulesAgentPlanificator:
  def __init__(self):
    # self.rules = [
    #   "Estructura del json para hacer un cronograma, el orden en el que se pone las tareas en el json es el orden en que se van a realizar: [{task: 'nombre de la tarea', duration: 'tiempo que le va a llevar para realizar la tarea'} ...]" ,
    #   "Si te piden un cronograma tienes un cronograma con algun objetivo creas el porque y la estructura de json para hacer un cronograma",
    #   "tienes que ser breve en la explicacion de la tarea.",
    #   "Si se te pide reorganizar el cronograma reorganizas el json"
    # ]
    self.rules = "Estructura del json para hacer un cronograma el orden en el que se pone las tareas en el json es el orden en que se van a realizar: [{task: 'nombre de la tarea', duration: 'tiempo que le va a llevar para realizar la tarea'} ...]. Si te piden un cronograma  con algun objetivo creas el porque y la estructura de json para hacer un cronograma. Si se te pide reorganizar el cronograma reorganizas el json"