import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Horarios from './Horarios';
import RadioAdminContainer from  '../containers/RadioAdminContainer'


export default ({user, handleSubmit, deleteUser, changeSUBE, handleSwitch, switcher, handleChange}) => (
    <Paper style={{width:'95%', margin:'auto'}}>
        <Grid style={{width:'95%', margin:'0 auto', padding:'3% 0'}}>
            <Grid container item xs={12} md={12}>
                <Grid item xs={12} md={3} >
                    <Grid container justify='center' style={{margin:'0 auto'}}>
                        <img className="profile-pic" src={`${user.imgPerfil}`} alt=""/>
                    </Grid>
                    <Grid container item md={12} style={{margin:'5% auto'}}>
                    <RadioAdminContainer handleChange={handleChange} user={user.levelAccess} />
                    </Grid>
                    <Grid container item justify='center' xs={12} md={12} style={{margin:'5% auto'}}>
                        <Grid item xs={12} md={10} style={{margin:'1% 0'}} > <Button fullWidth variant="contained" color="secondary" onClick={handleSubmit}> {user.name ? 'Guardar modificaciones' : 'Guardar usuario'} </Button> </Grid>
                        {user ? <Grid item xs={12} md={10} style={{margin:'1% 0'}}> <Button fullWidth variant="contained" color="secondary" onClick={deleteUser} > Eliminar usuario </Button> </Grid> : null}
                        <Grid item xs={12} md={10} style={{margin:'1% 0'}}> <Button fullWidth variant="contained" color="primary">Cambiar horarios</Button> </Grid>
                        {user ? <Grid item xs={12} md={10} style={{margin:'1% 0'}}> <Button fullWidth variant="contained" color="primary" type="submit"> Cambiar sube </Button> </Grid>: null }
                    </Grid>
                </Grid>

                <Grid container item spacing={16} xs={12} md={8}>
                    <Grid item xs={6} md={6}>
                        <TextField 
                            id="nombre"
                            label="Nombre"
                            type="text"
                            margin="normal"
                            variant="outlined"
                            fullWidth
                            value={user.nombre}
                            onChange={handleChange}
                            />
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <TextField                 
                            fullWidth
                            id="apellido"
                            label="Apellido"
                            type="text"
                            margin="normal"
                            variant="outlined"
                            value={user.apellido}
                            onChange={(e)=>handleChange(e)}
                        /> 
                    </Grid> 
                    <Grid item xs={6} md={6}>
                        <TextField 
                            id="email"
                            label="E-mail"
                            type="email"
                            margin="normal"
                            variant="outlined"
                            fullWidth
                            value={user.email}
                            onChange={(e)=>handleChange(e)}
                        />
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <TextField 
                            id="password"
                            label="Contraseña"
                            type="password"
                            margin="normal"
                            variant="outlined"
                            fullWidth
                            value={user.password}
                            onChange={(e)=>handleChange(e)}
                        /> 
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <TextField 
                            fullWidth
                            id="dni"
                            label="Documento"
                            type="text"
                            margin="normal"
                            variant="outlined"
                            value={user.dni}
                            onChange={(e)=>handleChange(e)}
                        />
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <TextField 
                            fullWidth
                            id="telefono"
                            label="Telefono"
                            type="text"
                            margin="normal"
                            variant="outlined"
                            value={user.telefono}
                            onChange={(e)=>handleChange(e)}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField 
                            fullWidth
                            disabled
                            id="subeId"
                            label="SUBE"
                            type="text"
                            margin="normal"
                            variant="outlined"
                            value={user.subeId}
                        />
                    </Grid>
                    <Grid container item xs={10} md={12}  style={{margin:'0 auto'}}> 
                        <FormControlLabel
                            labelPlacement="top"
                            label="Franja horaria - logs"
                            control={
                                <Switch
                                onChange={handleSwitch}
                                value={switcher}
                                color="secondary"
                                />
                            }
                        />
                        {switcher ?
                            <Grid container item xs={12}>
                            <Horarios />
                            </Grid>
                            : 
                            'componente logs'}
                    </Grid>


                </Grid>
            </Grid>
        </Grid>
    </Paper> 
)




//CODIGO POSTA


// import React from 'react';
// import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';
// import Switch from '@material-ui/core/Switch';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Grid from '@material-ui/core/Grid';
// import Paper from '@material-ui/core/Paper';
// import Horarios from './Horarios';
// import RadioAdminContainer from  '../containers/RadioAdminContainer'


// export default ({user, handleSubmit, deleteUser, changeSUBE, handleSwitch, switcher, handleChange}) => (
//     <Paper style={{width:'95%', margin:'auto'}}>
//         <Grid style={{width:'95%', margin:'0 auto'}}>
//             <Grid container item xs={12} md={12}>
//                 <Grid item xs={12} md={3} >
//                     <Grid>
//                         <img className="profile-pic" src={`${user.imgPerfil}`} alt=""/>
//                     </Grid>
//                     <Grid item md={12}>
//                     <RadioAdminContainer handleChange={handleChange} user={user.levelAccess}/>
//                     </Grid>
//                 </Grid>

//                 <Grid container item spacing={16} xs={12} md={8}>
//                     <Grid item xs={6} md={6}>
//                         <TextField 
//                             id="nombre"
//                             label="Nombre"
//                             type="text"
//                             margin="normal"
//                             variant="outlined"
//                             fullWidth
//                             value={user.nombre}
//                             onChange={handleChange}
//                             />
//                     </Grid>
//                     <Grid item xs={6} md={6}>
//                         <TextField                 
//                             fullWidth
//                             id="apellido"
//                             label="Apellido"
//                             type="text"
//                             margin="normal"
//                             variant="outlined"
//                             value={user.apellido}
//                             onChange={(e)=>handleChange(e)}
//                         /> 
//                     </Grid> 
//                     <Grid item xs={6} md={6}>
//                         <TextField 
//                             id="email"
//                             label="E-mail"
//                             type="email"
//                             margin="normal"
//                             variant="outlined"
//                             fullWidth
//                             value={user.email}
//                             onChange={(e)=>handleChange(e)}
//                         />
//                     </Grid>
//                     <Grid item xs={6} md={6}>
//                         <TextField 
//                             id="password"
//                             label="Contraseña"
//                             type="password"
//                             margin="normal"
//                             variant="outlined"
//                             fullWidth
//                             value={user.password}
//                             onChange={(e)=>handleChange(e)}
//                         /> 
//                     </Grid>
//                     <Grid item xs={6} md={6}>
//                         <TextField 
//                             fullWidth
//                             id="dni"
//                             label="Documento"
//                             type="text"
//                             margin="normal"
//                             variant="outlined"
//                             value={user.dni}
//                             onChange={(e)=>handleChange(e)}
//                         />
//                     </Grid>
//                     <Grid item xs={6} md={6}>
//                         <TextField 
//                             fullWidth
//                             id="telefono"
//                             label="Telefono"
//                             type="text"
//                             margin="normal"
//                             variant="outlined"
//                             value={user.telefono}
//                             onChange={(e)=>handleChange(e)}
//                         />
//                     </Grid>
//                     <Grid item xs={12} md={6}>
//                         <TextField 
//                             fullWidth
//                             disabled
//                             id="subeId"
//                             label="SUBE"
//                             type="text"
//                             margin="normal"
//                             variant="outlined"
//                             value={user.subeId}
//                         />
//                     </Grid>
//                     <Grid container item justify="flex-end" spacing={16} xs={12} md={8} style={{width:'100%', margin:'0 auto'}}>
//                     <Grid item xs={12} md={6}> <Button fullWidth variant="contained" color="secondary" onClick={handleSubmit}> {user.name ? 'Guardar modificaciones' : 'Guardar usuario'} </Button> </Grid>
//                     {user ? <Grid item xs={12} md={6}> <Button fullWidth variant="contained" color="secondary" onClick={deleteUser} > Eliminar usuario </Button> </Grid> : null}
//                     <Grid item xs={12} md={6}> <Button fullWidth variant="contained" color="primary">Cambiar horarios</Button> </Grid>
//                     {user ? <Grid item xs={12} md={6}> <Button fullWidth variant="contained" color="primary" type="submit"> Cambiar sube </Button> </Grid>: null }
//                 </Grid>
//                 </Grid>
                




//                 <Grid container item xs={10}> 
//                     <FormControlLabel
//                         labelPlacement="top"
//                         label="Franja horaria - logs"
//                         control={
//                             <Switch
//                             onChange={handleSwitch}
//                             value={switcher}
//                             color="secondary"
//                             />
//                         }
//                     />
//                     {switcher ?
//                         <Grid item xs={10}>
//                         <Horarios />
//                         </Grid>
//                         : 'componente logs'}
//                 </Grid>
//             </Grid>
//         </Grid>
//     </Paper>   
// )

