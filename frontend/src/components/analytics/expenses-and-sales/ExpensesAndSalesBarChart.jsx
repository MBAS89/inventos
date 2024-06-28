import React from 'react'

//nivo
import { ResponsiveBar } from '@nivo/bar'

export const ExpensesAndSalesBarChart = () => {

    const data = [
        {
          "day": "AD",
          "Debt": 9,
          "Sales": 181,
          "Expenses": 28,
          "Due":50,
          "Profit":80

        },
        {
          "day": "AE",
          "Debt": 50,
          "Sales": 170,
          "Expenses": 119,
          "Due":50,
          "Profit":80
        },
        {
          "day": "AF",
          "Debt": 125,
          "Sales": 27,
          "Expenses": 77,
          "Due":50,
          "Profit":80
        },
        {
          "day": "AG",
          "Debt": 75,
          "Sales": 145,
          "Expenses": 103,
          "Due":50,
          "Profit":80
        },
        {
          "day": "AI",
          "Debt": 132,
          "Sales": 158,
          "Expenses": 70,
          "Due":50,
          "Profit":80
        },
        {
          "day": "AL",
          "Debt": 183,
          "Sales": 146,
          "Expenses": 18,
          "Due":50,
          "Profit":80
        },
        {
          "day": "AM",
          "Debt": 72,
          "Sales": 161,
          "Expenses": 13,
          "Due":50,
          "Profit":80
        }
    ]


    return (
        <ResponsiveBar
            data={data}
            keys={[
                'Sales',
                'Expenses',
                'Debt',
                'Due',
                'Profit'
            ]}
            indexBy="day"
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
            barAriaLabel={e=>e.id+": "+e.formattedValue+" in day: "+e.indexValue}
        />
    )
}
