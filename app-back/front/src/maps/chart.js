import React, { Component } from 'react';
import *  as d3 from 'd3';
import {FormattedMessage} from 'react-intl';

class Chart extends Component {

    componentDidMount() {
        const data = [ 
            {
                localidad:"Teusaquillo", 
                semanas:[
                    { semana: "3/11/19-9/11/19", robos: 1 + Math.random()*20},
                    { semana: "10/11/19-16/11/19", robos: 1 + Math.random()*22 },
                    { semana: "17/11/19-23/11/19", robos: 1 + Math.random()*25 },
                    { semana: "24/11/19-30/11/19", robos: 1 + Math.random()*30 },
                    { semana: "1/12/19-7/12/19", robos: 1 + Math.random()*30},
                    { semana: "13/12/19-19/12/19", robos: 1 + Math.random()*30},
                    { semana: "20/12/19-16/12/19", robos: 1 + Math.random()*30 }
                ]
            },
            {
                localidad:"Usaquen", 
                semanas:[
                    { semana: "3/11/19-9/11/19", robos: 1 + Math.random()*20},
                    { semana: "10/11/19-16/11/19", robos: 1 + Math.random()*30 },
                    { semana: "17/11/19-23/11/19", robos: 1 + Math.random()*20 },
                    { semana: "24/11/19-30/11/19", robos: 1 + Math.random()*30 },
                    { semana: "1/12/19-7/12/19", robos: 1 + Math.random()*30},
                    { semana: "13/12/19-19/12/19", robos: 1 + Math.random()*30},
                    { semana: "20/12/19-16/12/19", robos: 1 + Math.random()*28 }
                ]
            }
            
        ];
        
        this.drawChart(data)
    }

    getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    
    drawChart(data) {

        const canvas = d3.select(this.refs.canvas);
        const width = 700;
        const height = 500;
        const margin = { top:10, left:50, bottom: 40, right: 10};
        const iwidth = width - margin.left - margin.right;
        const iheight = height - margin.top -margin.bottom;

        const svg = canvas.append("svg");
        svg.attr("width", width);
        svg.attr("height", height);



        let g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);
        var d = Math.floor(Math.random()*2);
        console.log(d);
        const dataF = data[d]['semanas']
        console.log(dataF)
        const y = d3.scaleLinear() 
            .domain([0, 30])
            .range([iheight, 0]);

        const x = d3.scaleBand()
        .domain(dataF.map(d => d.semana) ) 
        .range([0, iwidth])
        .padding(0.1); 

        const bars = g.selectAll("rect").data(dataF);

        bars.enter().append("rect")
        .attr("class", "bar")
        .style("fill", d => this.getRandomColor())
        .attr("x", d => x(d.semana))
        .attr("y", d => y(d.robos))
        .attr("height", d => iheight - y(d.robos))
        .attr("width", x.bandwidth())  

        g.append("g")
        .classed("x--axis", true)
        .call(d3.axisBottom(x))
        .attr("transform", `translate(0, ${iheight})`);  

        g.append("g")
        .classed("y--axis", true)
        .call(d3.axisLeft(y));
    }
    
    render() {
            return (
                <div>
                    <h2><FormattedMessage id="Estadisticas"/></h2>
                <div ref="canvas">
                </div>
                </div>
            );
        }
}

export default Chart;