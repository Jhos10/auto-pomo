- Estadisticas por dia:
  - Descripcion:
    Cuando el usuario ponga en el input day todas las estadisticas que se muestran seran en base al dia actual.

- Estadisticas por semana
  - Descripcion:
    Se mostraran los datos en base a la semana, en el caso de la grafica se mostrara los resultados que se tuvieron en cada dia.

- Estadisticas por mes
  - Descripcion:
    Se mostrara las estadisticas que se tuvieron en cada semana, en el graficos se tendra un grafico de barras que muestre tanto el numero de trabajos completados como el de incompletados o borrados por semana.

Diseño de las graficas:

Pasos para llevar a cabo la graficación de cada uno de los datos.

Primero: Generar un grafico con valores predeterminados.

Segundo: Crear un atributo en cada una de las tareas, en el cual se va a guardar el dato de la fecha en la cual fue creado. Ademas se creara otro atributo con la fecha de finalización de la tarea.

Tercero: Crear funciones que logres retener toda la informacion necesaria para las graficas. - Funcion de recoleccion de tareas por dia, esta funcion recolectara la cantidad de trabajos que fueron realizados con exito, incumplidos o borrados en el dia.

    - Funcion de recoleccion de tareas por semanas, esta funcion recolectara la cantidad de trabajos que fueron realizados con exito, incumplidos o borrados durante los dias de la semana.

    - Funcion de recolección de tareas por mes, esta funcion recolectara las tareas que se realizaron y las que no se realizaron durante las semanas.

Cuarto: Poner la informacion recolectada de las funciones o de la funcion en el grafico.

Quinto: cambiar los datos del grafico segun la opcion seleccionada, las cuales son sessiones y focus time, las sessiones son el numero de trabajos y el focus time el tiempo en minutos.

Sexto: Cuadrar esteticamente el grafico.
