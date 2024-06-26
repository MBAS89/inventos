import React from 'react'

import { ResponsivePie } from '@nivo/pie'

export const EmployeePieChart = () => {

    const data = [
        {
            "id": "Full Time",
            "label": "Full Time",
            "value": 487,
        },
        {
            "id": "Part Time",
            "label": "Part Time",
            "value": 170,
        },
        {
            "id": "Temporary",
            "label": "Temporary",
            "value": 872,
        },
        {
            "id": "Remote",
            "label": "Remote",
            "value": 250,
        },
        {
            "id": "Hybird",
            "label": "Hybird",
            "value": 120,
        },
        {
            "id": "Contract Based",
            "label": "Contract Based",
            "value": 50,
        },
        {
            "id": "Not Installed",
            "label": "Not Installed",
            "value": 100,
        }
    ]

    return (
        <ResponsivePie
            data={data}
            margin={{ top: 40, right: 100, bottom: 60, left: 120 }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            activeOuterRadiusOffset={8}
            colors={{ scheme: 'pastel1' }}
            borderWidth={1}
            borderColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        0.2
                    ]
                ]
            }}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor="#333333"
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: 'color' }}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        2
                    ]
                ]
            }}
            defs={[
                {
                    id: 'dots',
                    type: 'patternDots',
                    background: 'inherit',
                    color: 'rgba(255, 255, 255, 0.3)',
                    size: 4,
                    padding: 1,
                    stagger: true
                },
                {
                    id: 'lines',
                    type: 'patternLines',
                    background: 'inherit',
                    color: 'rgba(255, 255, 255, 0.3)',
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10
                }
            ]}
            fill={[
                {
                    match: {
                        id: 'Eexpenses'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'Sales'
                    },
                    id: 'lines'
                }
            ]}
            legends={[
                {
                    anchor: 'bottom',
                    direction: 'column',
                    justify: false,
                    translateX: -200,
                    translateY: 60,
                    itemsSpacing: 2,
                    itemWidth: 100,
                    itemHeight: 18,
                    itemTextColor: '#999',
                    itemDirection: 'left-to-right',
                    itemOpacity: 1,
                    symbolSize: 18,
                    symbolShape: 'circle',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemTextColor: '#000'
                            }
                        }
                    ]
                }
            ]}
        />
    )
}
