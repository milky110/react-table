```jsx
const columns = [
    {
        title: 'Event Type',
        render: (value, row, index) => {
            return (
                <div style={{ wordBreak: 'break-word' }}>
                    { row.eventType }
                </div>
            );
        }
    },
    {
        title: 'Affected Devices',
        dataKey: 'affectedDevices'
    },
    {
        title: 'Detections',
        width: 300,
        dataKey: 'detections'
    }
];

const data = [
    { id: 1, eventType: 'Virus/Malware', affectedDevices: 20, detections: 634 },
    { id: 2, eventType: 'Spyware/Grayware', affectedDevices: 20, detections: 634 },
    { id: 3, eventType: 'URL Filtering', affectedDevices: 15, detections: 598 },
    { id: 4, eventType: 'Web Reputation', affectedDevices: 15, detections: 598 },
    { id: 5, eventType: 'Network Virus', affectedDevices: 15, detections: 497 },
    { id: 6, eventType: 'Application Control', affectedDevices: 0, detections: 0 }
];

<TableTemplate
    minimalist
    columns={columns}
    data={data}
    width={800}
/>
```