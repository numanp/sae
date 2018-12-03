export const accessControl = (subeScanBack) => {
    //deberiamos usar el id de la sube para traer el usuario para setear el user id en la tabla, hasta entonces, le harcodeo un usuario

    User.findOne({
        subeScanBack
    })
    .then(user=>{
        Horarios.findById(user.horarioId)
            .then(horario=>{
                //seteamos lo que traemos de la base de datos
                const diasParaComparar = horario.dias
                const horaMINArr = horario.horarioMin.split(':');
                const horaMAXArr = horario.horarioMax.split(':');
                //seteamos los datos para comparar
                const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
                const options = { year: 'numeric', month: 'long', day: 'numeric' };
                const fecha = new Date();
                const today = fecha.toLocaleDateString('en-US',options);
                const actualyTime = fecha.toLocaleTimeString(options)
                const nombreDia = dias[fecha.getDay()]
                var horaActual = [];
                horaActual.push(fecha.getHours())
                horaActual.push(fecha.getMinutes())
                //seteamos el formato en el que guardariamos la fecha de ingreso
                const toSave = today.concat(' ', actualyTime)    
                const fechaInicio = new Date(horario.fechaInicio);
                const fechaFin = new Date(horario.fechaFin)
                if(fechaInicio.getTime() <= fecha.getTime() && fechaFin.getTime() >= fecha.getTime()){
                    if(diasParaComparar.indexOf(nombreDia) != -1) {     
                        if(horaActual[0] <= horaMAXArr[0] && horaActual[0] >= horaMINArr[0]){
                            if(horaActual[0] == horaMAXArr[0]){
                                if(horaActual[1] < horaMAXArr[1]){
                                    return History.create({
                                        nombre : user.nombre,
                                        apellido : user.apellido,
                                        ingreso : toSave
                                    })
                                }else{
                                    return console.log('no pasa')
                                } 
                            }     
                            if(horaActual[0] == horaMINArr[0]){
                                if(horaActual[1] > horaMINArr[1]) {
                                    return History.create({
                                            nombre : user.nombre,
                                            apellido : user.apellido,
                                            ingreso : toSave
                                            }) 
                                }else{
                                    return console.log('no pasa')
                                }
                            }
                            return History.create({
                                nombre : user.nombre,
                                apellido : user.apellido,
                                ingreso : toSave
                            }) 
                        }else{
                            return console.log(`No puedes pasar, tu horario  : ${horario.horarioMin}  a ${horario.horarioMax}`)
                        }
  
                    }else{
                        return console.log('no puede pasar, dia no permitido')
                    }
                }
  
            })
      })
})
