import json


class Memory:
  @staticmethod
  def write_json_routine_new(message):
      try:
          with open('./cronograma.json', "r", encoding="utf-8") as file:
            data = json.load(file)
      except:
          data = []

      data.append(message)

      with open('./cronograma.json', "w", encoding="utf-8") as file:
          json.dump(data, file, indent=2, ensure_ascii=False)

  @staticmethod
  def update_task(task_name, new_data):
      try:
        with open('./cronograma.json', "r", encoding="utf-8") as file:
          data = json.load(file)
        updated = False

        for task in data:
          if task["task"] == task_name:
            task.update(new_data)
            updated = True
            break

        with open('./cronograma.json', "w", encoding="utf-8") as file:
            json.dump(data, file, indent=2, ensure_ascii=False)
      except Exception as e:
         print(f"Error al momento de actualizar la rutina: {e}")

  @staticmethod
  def deleteTask(task_name):
    try:
      with open('./cronograma.json', 'r', encoding="utf-8") as file:
        data = json.load(file)
      is_ready = False

      tasks = []
      for task in data:
         if task["task"] != task_name:
            tasks.append(task)
      if tasks != data:
        data = task
        is_ready = True

      if is_ready:
        with open('./cronograma.json','w', encoding="utf-8") as file:
          json.dump(data,file,indent=2,ensure_ascii=False)
        
        return True
    except Exception as e:
       print(f"Error al momento de eliminar la tarea del task {e}")
       return False

