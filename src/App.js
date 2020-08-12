import React, { Component } from 'react';
import Palette from './Palette'
import { Route, Switch } from 'react-router-dom'
import seedColors from './seedColors'
import './App.css'
import SingleColorPalette from './SingleColorPalette'
import { generatePalette } from './colorHelpers'
import PaletteList from './PaletteList';

class App extends Component{
  findPalette(id){
    return seedColors.find(function(palette){
      return palette.id === id
    })
  }
  render() {
    return (
      <Switch>
        <Route exact 
          path="/" 
          render={(routeProps) => <PaletteList palettes={seedColors} {...routeProps}/>}/>
        <Route 
          exact 
          path="/palette/:id" 
          render={routeProps => 
            <Palette 
              palette={generatePalette(this.findPalette(routeProps.match.params.id))} 
            /> 
          }
        />
        <Route
          path={"/palette/:paletteId/:colorId"}
          render={routeProps => 
            <SingleColorPalette 
              colorId={routeProps.match.params.colorId}
              palette={generatePalette(this.findPalette(routeProps.match.params.paletteId))} 
            /> 
          }
        />
      </Switch>
      // <div className="App">
      //   <Palette palette={generatePalette(seedColors[4])} />
      // </div>
    );
  }
}

export default App;
