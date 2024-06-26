import React from 'react'

import { ResponsiveBar } from '@nivo/bar'

export const EmployeeBarChart = () => {

    const data = [
        {
          "country": "AD",
          "hours": 9,
          "paid": 181,
          "debt": 28

        },
        {
          "country": "AE",
          "hours": 50,
          "paid": 170,
          "debt": 119
        },
        {
          "country": "AF",
          "hours": 125,
          "paid": 27,
          "debt": 77
        },
        {
          "country": "AG",
          "hours": 75,
          "paid": 145,
          "debt": 103
        },
        {
          "country": "AI",
          "hours": 132,
          "paid": 158,
          "debt": 70
        },
        {
          "country": "AL",
          "hours": 183,
          "paid": 146,
          "debt": 18
        },
        {
          "country": "AM",
          "hours": 72,
          "paid": 161,
          "debt": 13
        }
    ]
    return (
        <ResponsiveBar
            data={data}
            keys={[
                'hours',
                'debt',
                'paid'
            ]}
            indexBy="country"
            margin={{ top: 50, right: 60, bottom: 25, left: 60 }}
            padding={0.3}
            innerPadding={2}
            groupMode="grouped"
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true }}
            colors={{ scheme: 'set2' }}
            borderRadius={8}
            defs={[
                {
                    id: 'dots',
                    type: 'patternDots',
                    background: 'inherit',
                    color: '#38bcb2',
                    size: 4,
                    padding: 1,
                    stagger: true
                },
                {
                    id: 'lines',
                    type: 'patternLines',
                    background: 'inherit',
                    color: '#eed312',
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10
                }
            ]}
            borderColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        1.6
                    ]
                ]
            }}
            valueFormat={value => {
                if (value >= 1000) {
                return `${value / 1000}k`;
                }
                return value;
            }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: '',
                legendPosition: 'middle',
                legendOffset: 32,
                truncateTickAt: 0
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: '',
                legendPosition: 'middle',
                legendOffset: -40,
                truncateTickAt: 0
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        1.6
                    ]
                ]
            }}
            legends={[]}
            role="application"
            ariaLabel="Nivo bar chart demo"
            barAriaLabel={e=>e.id+": "+e.formattedValue+" in country: "+e.indexValue}
        />
    )
}
