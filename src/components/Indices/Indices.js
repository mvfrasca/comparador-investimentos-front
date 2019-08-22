import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import * as indicesActions from '../../store/indices/actions';
import { getHistoricoIndices } from '../../store/indices/reducer';
import { stringify } from 'querystring';
import Chart from 'react-google-charts';

class Indices extends Component {
    constructor(props){
        super(props);
        this.state = {
            historicoIndices: []
        }
        autoBind(this);
    }

    componentDidMount(){
        this.props.dispatch(indicesActions.consultarIndices());
    }

    render(){
        if (this.props.historicoIndices.length === 0 ) return this.renderLoading();
        return(
            <div className="card" style={{minWidth:"250px"}}>
                <div className="card-header">
                    Histórico de índices 
                </div>
                
                <ul className="list-group list-group-flush">
                    <br/>
                    <Chart
                        chartType="Line"
                        width={'100%'}
                        // height={'500'}
                        data={this.props.historicoIndices}
                        options={{
                            chartArea: {
                                width: '100%',
                            },
                            title: 'Histórico de Índices',
                            // width: 900,
                            // height: 200,
                            series: {
                                // Gives each series an axis name that matches the Y-axis below.
                                0: { axis: 'Selic' },
                                // 1: { axis: 'CDI' },
                            },
                            axes: {
                                // Adds labels to each axis; they don't have to match the axis names.
                                y: {
                                  Selic: { label: '%' },
                                //   CDI: { label: 'CDI' },
                                },
                            },
                        }}
                        rootProps={{ 'data-testid': '1' }}
                    />
                </ul>
            </div>
        )
    }

    renderLoading() {
        return(
            <div className="card" style={{minWidth:"250px"}}>
                <div className="card-header">
                    Histórico de índices 
                </div>
                <div className="card-body d-flex align-items-center justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Carregando...</span>
                    </div>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Histórico: {JSON.stringify(this.props.historicoIndices)}</li>
                </ul>
            </div>
        )
    }
}



function mapStateToProps(state) {
    console.log("mapStateToProps state: " + JSON.stringify(state.indices.historicoIndices))
    console.log("Indices.mapStateToProps")
    return {
        historicoIndices: state.indices.historicoIndices,
    };
}

export default connect(mapStateToProps)(Indices);