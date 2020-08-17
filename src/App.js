import React, { Component } from 'react';
import Palette from './Palette'
import { Route, Switch } from 'react-router-dom'
import seedColors from './seedColors'
import './App.css'
import SingleColorPalette from './SingleColorPalette'
import NewPaletteForm from './NewPaletteForm'
import { generatePalette } from './colorHelpers'
import PaletteList from './PaletteList';

class App extends Component {
  constructor(props) {
    super(props)
    const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"))
    this.state = {
      palettes: savedPalettes || seedColors
    }
    this.savePalette = this.savePalette.bind(this);
    this.deletePalette = this.deletePalette.bind(this);
    this.findPalette = this.findPalette.bind(this);
  }
  findPalette(id) {
    return this.state.palettes.find(function (palette) {
      return palette.id === id
    })
  }
  savePalette(newPalette) {
    this.setState(
      {palettes: [...this.state.palettes, newPalette]},
      this.syncLocalStorage  
    )
  }
  syncLocalStorage() {
    window.localStorage.setItem(
      "palettes",
      JSON.stringify(this.state.palettes)
    )
  }
  deletePalette(id) {
    let filteredPalettes = this.state.palettes.filter((palette) => (palette.id != id))
    this.setState(
      {palettes: filteredPalettes},
      this.syncLocalStorage
    )
  }
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/palette/new"
          render={(routeProps) => 
            (<NewPaletteForm 
              savePalette={this.savePalette} 
              {...routeProps} 
              palettes={this.state.palettes}
            />)
        }
        />
        <Route exact
          path="/"
          render={(routeProps) => <PaletteList 
            palettes={this.state.palettes} 
            deletePalette={this.deletePalette}
            {...routeProps} 
          />}
        />
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
    );
  }
}

export default App;
