import { useTheme } from '@emotion/react';
import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';
import { Colors } from 'chart.js';
import Chart from 'chart.js/auto';
import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarChart = () => {
    const theme = useTheme();
    // State for chart labels
    const [labels, setLabels] = React.useState(["January", "February", "March", "April", "May", "June", "July"]);
    Chart.register(Colors);

    // Data for the bar chart
    const data = {
        labels: labels,
        datasets: [
            {
                label: "Homes",
                data: [10, 10, 5, 45, 20, 30, 40],
                backgroundColor: theme?.palette?.primary?.main,
                barThickness: 15,
                borderRadius: 20,
                barPercentage: 0.7,  // Adjusted bar percentage
                categoryPercentage: 0.7,
            },
            {
                label: "Lands",
                data: [5, 15, 10, 30, 15, 20, 25],
                backgroundColor: theme?.palette?.secondary?.main,
                barThickness: 15,
                borderRadius: 20,
                barPercentage: 0.7,  // Adjusted bar percentage
                categoryPercentage: 0.7, 
            },
        ],
    };

    // Options for the bar chart
    const options = {
        layout: {
            padding: {
                top: 0,
                right: 10,
                bottom: 0,
                left: 10
            },
        },
        responsive: true,
        scales: {
            x: {
                grid: {
                    display: false
                },
            },
            y: {
                grid: {

                },

            },

        },
        plugins: {
            legend: {
                display: true,

            },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const labelIndex = context.dataIndex;
                        return `${labels[labelIndex]}: ${context.formattedValue}`;
                    },
                },
            },
        },
        bars: {
            categoryPercentage: 0.6,
            barPercentage: 0.8,
        }
    }

    // Styles for the legend
    const legendStyles = {
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        listStyle: 'none',
        justifyContent: 'center',
        gap: 2,
        padding: '1rem',
    };

    // Render the BarChart component
    return (
        <Box sx={{ width: '100%', height: '100%' }}>
            {/* Legend for the chart */}
            <List style={legendStyles}>
                {labels.map((label, index) => (
                    // Clicking a label removes it from the chart
                    <ListItem onClick={() => {
                        const newLabels = [...labels];
                        newLabels.splice(index, 1);
                        setLabels(newLabels);
                    }} key={index} style={{
                        margin: '0 0', borderRadius: '25px', background: theme?.palette?.primary?.main,
                        cursor: 'pointer',
                    }}>
                        <ListItemText style={{ margin: '0', padding: '0' }}>
                            <Typography variant="body2" fontSize={12} style={{ color: '#fff' }}>{label}</Typography>
                        </ListItemText>
                    </ListItem>
                ))}
            </List>
            {/* Bar chart component */}
            <Bar data={data} options={options} />
        </Box>
    );
};

export default BarChart;
