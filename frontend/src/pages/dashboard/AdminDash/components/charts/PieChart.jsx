import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';
import { Colors } from 'chart.js';
import Chart from 'chart.js/auto';
import React from 'react';
import { Pie } from 'react-chartjs-2';

const PieChart = () => {
    const [labels, setLabels] = React.useState(["January", "February", "March", "April", "May", "June", "July"]);
    Chart.register(Colors);

    const data = {
        labels: labels,
        datasets: [
            {
                label: "My First dataset",
                data: [10, 10, 5, 45, 20, 30, 40],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.7)',
                    'rgba(255, 159, 64, 0.7)',
                    'rgba(255, 205, 86, 0.7)',
                    'rgba(75, 192, 192, 0.7)',
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(153, 102, 255, 0.7)',
                ],
            },
        ],
    };

    const options = {
        layout: {
            padding: 10
        },
        plugins: {
            legend: {
                display: false
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
        responsive: true,
        maintainAspectRatio: false,

    }

    const legendStyles = {
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        listStyle: 'none',
        justifyContent: 'center',
        gap: 2,
        padding: 0,
    };


    return (
        <Box sx={{ width: '100%', height: '100%' }}>
            {/* <List style={legendStyles}>
                {labels.map((label, index) => (
                    // when we click specific label it will remove that label from the chart
                    <ListItem onClick={() => {
                        const newLabels = [...labels];
                        newLabels.splice(index, 1);
                        setLabels(newLabels);
                    }} key={index} style={{ margin: '0 0', borderRadius: '5px', background: data.datasets[0].backgroundColor[index] }}>
                        <ListItemText style={{ margin: '0', padding: '0' }}>
                            <Typography variant="body2" fontSize={12} style={{ color: '#fff' }}>{label}</Typography>
                        </ListItemText>
                    </ListItem>
                ))}
            </List> */}
            <Pie data={data} options={options} />
        </Box>
    );
};

export default PieChart;
