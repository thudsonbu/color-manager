import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/styles'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit';
import styles from './styles/MiniPaletteStyles'

class MiniPalette extends PureComponent{
    constructor(props){
        super(props)
        this.deletePalette = this.deletePalette.bind(this);
        this.editPalette = this.editPalette.bind(this);
    }
    deletePalette(e){
        e.stopPropagation();
        this.props.openDialog(this.props.id, "Delete");
    }
    editPalette(e){
        e.stopPropagation();
        this.props.openDialog(this.props.id, "Edit");
    }
    render(){
        const { classes, paletteName, emoji, colors, handleClick, id } = this.props;
        const miniColorBoxes = colors.map(color => (
            <div 
                className={classes.miniColor}
                style={{backgroundColor: color.color}} 
                key={color.name}
            />
        ))
        return(
            <div className={classes.root} onClick={() => handleClick(id)}>
                <DeleteIcon 
                    style={{transition: "all 0.3s ease-in-out"}}
                    className={classes.deleteIcon}
                    onClick={this.deletePalette}
                />
                <EditIcon
                    style={{transition: "all 0.3s ease-in-out"}}
                    className={classes.editIcon}
                    onClick={this.editPalette}
                />
                <div className={classes.colors}>
                    {miniColorBoxes}
                </div>
                <h5 className={classes.title}>
                    {paletteName} <span className={classes.emoji}>{emoji}</span>
                </h5>
            </div>
        )
    }
}

export default withStyles(styles)(MiniPalette)