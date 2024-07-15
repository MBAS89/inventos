import React from 'react'

//nivo
import { ResponsiveBar } from '@nivo/bar'

export const InventoryAnalyticsBarChart = () => {

    const data = [
        {
          "country": "AD",
          "product": 9,
          "category": 181,
          "brand": 28,
          "coupon":11

        },
        {
          "country": "AE",
          "product": 50,
          "category": 170,
          "brand": 119,
          "coupon":11
        },
        {
          "country": "AF",
          "product": 125,
          "category": 27,
          "brand": 77,
          "coupon":11
        },
        {
          "country": "AG",
          "product": 75,
          "category": 145,
          "brand": 103,
          "coupon":11
        },
        {
          "country": "AI",
          "product": 132,
          "category": 158,
          "brand": 70,
          "coupon":11
        },
        {
          "country": "AL",
          "product": 183,
          "category": 146,
          "brand": 18,
          "coupon":11
        },
        {
          "country": "AM",
          "product": 72,
          "category": 161,
          "brand": 13,
          "coupon":11
        }
    ]


    return (
        <ResponsiveBar
            data={data}
            keys={[
                'product',
                'brand',
                'category',
                'coupon'
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
