import React from 'react'
import './App.css'
import OrgChart from '@unicef/react-org-chart'
import { BrowserRouter, Route } from 'react-router-dom'
import { tree, tree1, tree2, tree4, tree5,tree6, tree7 } from './Tree'
import avatarPersonnel from './assets/avatar-personnel.svg'

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      tree: tree,
      downloadingChart: false,
      config: {},
      highlightPostNumbers: [1],
    }
  }

  getChild = id => {
    switch (id) {
      case 100:
        return tree1
      case 36:
        return tree2
      case 37:
        return tree5
      case 25:
        return tree4
      case 26:
        return tree6
      case 27:
        return tree7
      default:
        return console.log('no children')
    }
  }

  getParent = d => {
    if (d.id === 100) {
      return {
        id: 500,
        person: {
          id: 500,
          avatar: avatarPersonnel,
          department: '',
          name: 'Pascal ruth',
          title: 'Member',
          totalReports: 1,
        },
        hasChild: false,
        hasParent: true,
        children: [d],
      }
    } else if (d.id === 500) {
      return {
        id: 1,
        person: {
          id: 1,
          avatar: avatarPersonnel,
          department: '',
          name: 'Bryce joe',
          title: 'Director',
          totalReports: 1,
        },
        hasChild: false,
        hasParent: false,
        children: [d],
      }
    } else {
      return d
    }
  }

  handleDownload = () => {
    this.setState({ downloadingChart: false })
  }

  handleOnChangeConfig = config => {
    this.setState({ config: config })
  }

  handleLoadConfig = () => {
    const { config } = this.state
    return config
  }

  render() {
    const { tree, downloadingChart } = this.state

    //For downloading org chart as image or pdf based on id
    const downloadImageId = 'download-image'
    const downloadPdfId = 'download-pdf'

    return (
      <BrowserRouter basename="/react-org-chart">
        <Route exact path="/">
          <React.Fragment>
            <h1 style={{color:"purple",display:"flex", alignItems:"center", justifyContent:"center"}}>ಸಂಕೊನಟ್ಟಿ ಕುಟುಂಬ</h1>
            <OrgChart
              tree={tree}
              downloadImageId={downloadImageId}
              downloadPdfId={downloadPdfId}
              onConfigChange={config => {
                this.handleOnChangeConfig(config)
              }}
              loadConfig={d => {
                let configuration = this.handleLoadConfig(d)
                if (configuration) {
                  return configuration
                }
              }}
              downlowdedOrgChart={d => {
                this.handleDownload()
              }}
              loadImage={d => {
                return Promise.resolve(avatarPersonnel)
              }}
              // loadParent={d => {
              //   const parentData = this.getParent(d)
              //   return parentData
              // }}
              loadChildren={d => {
                const childrenData = this.getChild(d.id)
                return childrenData
              }}
            />
          </React.Fragment>
        </Route>
      </BrowserRouter>
    )
  }
}
