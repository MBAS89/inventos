import React from 'react'

//nivo bar chart
import { ResponsiveBar } from '@nivo/bar'

export const SuppliersBarChart = () => {

    const data = [
        {
          "day": "AD",
          "Suppliers": 79
        },
        {
          "day": "AE",
          "Suppliers": 200
        },
        {
          "day": "AF",
          "Suppliers": 97
        },
        {
          "day": "AG",
          "Suppliers": 14
        },
        {
          "day": "AI",
          "Suppliers": 44
        },
        {
          "day": "AL",
          "Suppliers": 161
        },
        {
          "day": "AM",
          "Suppliers": 189
        }
    ]


    return (
        <ResponsiveBar
            data={data}
            keys={[
                'Suppliers'
            ]}
            indexBy="day"
            margin={{ top: 50, right: 60, bottom: 50, left: 80 }}
            padding={0.25}
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true }}
            colors={"#86efac"}
            valueFormat={value => {
                if (value >= 1000) {
                return `${value / 1000}k`;
                }
                return value;
            }}
            borderRadius={10}
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
            innerPadding={3}
            legends={[]}
            groupMode="grouped"
            axisTop={null}
            axisRight={null}
            enableGridY={true}
            axisLeft={true}
            role="application"
        />
    )
}
