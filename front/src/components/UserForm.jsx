import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';



export default ({user, handleSubmit, saveChanges, deleteUser, changeSUBE, handleSwitch, switcher, handleChange}) => (
    <Grid container spacing={24}>
        <Grid item xs={2}>
            <img className="profile-pic" src={`${user.imgPerfil}`} alt=""/><br/>
        </Grid>
        <Grid container spacing={16} xs={10}>
            <Grid item xs={6}>
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
            <Grid item xs={6}>
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
            <Grid item xs={6}>
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
            <Grid item xs={6}>
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
            <Grid item xs={6}>
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
            <Grid item xs={3}>
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
            <Grid item xs={3}>
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
        </Grid>
        <Grid container spacing={16} xs={2}>
            <Grid item xs={12}> <Button fullWidth variant="contained" color="primary"> {user ? 'Guardar modificaciones' : 'Guardar usuario'} </Button> </Grid>
            <Grid item xs={12}> <Button fullWidth variant="contained" color="default">Cambiar horarios</Button> </Grid>
            {user ? <Grid item xs={12}> <Button fullWidth variant="contained" color="secondary"> Cambiar sube </Button> </Grid>: null }
            {user ? <Grid item xs={12}> <Button fullWidth variant="contained" color="secondary"> Eliminar usuario </Button> </Grid> : null}
        </Grid>
        <Grid container xs={10}> 
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
            {switcher ? 'componente horarios': 'componente logs'}
        </Grid>
        
        
    </Grid>
)