import React, { Component } from 'react';
import Palette from './Palette'
import { Route, Switch } from 'react-router-dom'
import seedColors from './seedColors'
import './App.css'
import SingleColorPalette from './SingleColorPalette'
import NewPaletteForm from './NewPaletteForm'
import { generatePalette } from './colorHelpers'
import PaletteList from './PaletteList';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Page from "./Page";

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      palettes: seedColors
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
    this.setState({palettes: [...this.state.palettes, newPalette]})
  }
  deletePalette(id) {
    this.setState(
      st => ({palettes: st.palettes.filter(palette => palette.id !== id)})
    )
  }
  render() {
    return (
      <Route render={( {location} ) => (
        <TransitionGroup>
          <CSSTransition key={location.key} classNames='fade' timeout={500}>
            <Switch location={location}>
              <Route
                exact
                path="/palette/new"
                render={ ( routeProps ) => 
                  (
                    <Page>
                      <NewPaletteForm 
                      savePalette={this.savePalette} 
                      {...routeProps} 
                      palettes={this.state.palettes}
                      />
                    </Page>
                  )
                }
              />
              <Route exact
                path="/"
                render={ ( routeProps ) => 
                  (
                    <Page>
                      <PaletteList 
                      palettes={this.state.palettes} 
                      deletePalette={this.deletePalette}
                      {...routeProps} 
                      />
                    </Page>
                  )
                }
              />
              <Route
                exact
                path="/palette/:id"
                render={ ( routeProps ) => 
                  (
                    <Page>
                      <Palette
                        palette={generatePalette(this.findPalette(routeProps.match.params.id))}
                      />
                    </Page>
                  )
                }
              />
              <Route
                path={"/palette/:paletteId/:colorId"}
                render={ ( routeProps ) => 
                  (
                    <Page>
                      <SingleColorPalette
                        colorId={routeProps.match.params.colorId}
                        palette={generatePalette(this.findPalette(routeProps.match.params.paletteId))}
                      />
                    </Page>
                  )
                }
              />
            </Switch>  
          </CSSTransition>
        </TransitionGroup>
      )
      }/>
    );
  }
}

export default App;
