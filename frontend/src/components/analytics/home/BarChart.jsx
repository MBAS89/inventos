import React from 'react'

//nivo bar chart
import { ResponsiveBar } from '@nivo/bar'

export const BarChart = () => {

    const data = [
        {
          "day": "AD",
          "sales": 79
        },
        {
          "day": "AE",
          "sales": 200
        },
        {
          "day": "AF",
          "sales": 97
        },
        {
          "day": "AG",
          "sales": 14
        },
        {
          "day": "AI",
          "sales": 44
        },
        {
          "day": "AL",
          "sales": 161
        },
        {
          "day": "AM",
          "sales": 189
        }
    ]



    return (
        <ResponsiveBar
            data={data}
            keys={[
                'sales'
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
