import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import Radio from '@material-ui/core/Radio';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';

const styles = {
  root: {
    color: green[600],
    '&$checked': {
      color: green[500],
    },
  },
  checked: {},
};

class RadioButtons extends React.Component {
    constructor(props){
        super(props)

    }



  render() {
      console.log(this.props.classes)
    const { classes } = this.props;
    let rango = this.props.user
    console.log('SPARTAAA', rango)
    return ( 
      <div>
        {this.props.user === 'superadmin' ?  
        <div>
        SuperUser
        <Radio
        id= 'levelAccess'
          checked={rango === 'SuperAdmin'}
          onChange={this.props.handleChange}
          value= {'SuperAdmin'}
          name="levelAccess"
          aria-label="SuperAdmin"
          placeholder='SuperAdmin'
        />
        Admin
        <Radio
        id= 'levelAccess'
          checked={rango === 'Admin'}
          onChange={this.props.handleChange}
          value= {'Admin'}
          name="levelAccess"
          aria-label="Admin"
          placeholder='Admin'
        />
        User
        <Radio
        id= 'levelAccess'
          checked={rango === 'User'}
          onChange={this.props.handleChange}
          value= {'User'}
          name="levelAccess"
          aria-label="User"
          classes={{
            root: classes.root,
            checked: classes.checked,
          }} 
          placeholder='User'
        /> 
        </div>
        :
        'No eres superadmin'
        }
      </div>
    );
  }
}

RadioButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RadioButtons);


        {/* <div>
            
        <Radio
        //   checked={user.levelAccess === 'SuperAdmin'}
          onChange={handleChange}
          value='SuperAdmin'
          name="radio-button"
          aria-label="SuperAdmin"
        />
        <Radio
        //   checked={user.levelAccess}
          onChange={handleChange}
          value='Admin'
          name="radio-button"
          aria-label="Admin"
        />
        <Radio
        //   checked={user.levelAccess}
          onChange={handleChange}
          value='User'
          name="radio-button"
          aria-label="User"
        />
        </div> */}