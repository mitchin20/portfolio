const today = new Date();

export let timelineResourceData: Object[] = [
    {
        Id: 1,
        CustomerName: "C_1",
        Subject: 'Appointment 1',
        Services: ['service_1', 'service_2'],
        StartTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 0),
        EndTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12, 30),
        TechnicianId: 1,
        Note: "Note 1",
    },
    {
        Id: 2,
        CustomerName: "C_2",
        Subject: 'Appointment 2',
        Services: ['service_1', 'service_2'],
        StartTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 0),
        EndTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 0),
        TechnicianId: 2,
        Note: "Note 1",
    },
    {
        Id: 3,
        CustomerName: "C_3",
        Subject: 'Appointment 3',
        Services: ['service_1', 'service_2'],
        StartTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 11, 0),
        EndTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12, 0),
        TechnicianId: 1,
        Note: "Note 1",
    },
    {
        Id: 4,
        CustomerName: "C_4",
        Subject: 'Appointment 4',
        Services: ['service_1', 'service_2'],
        StartTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 14, 0),
        EndTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 15, 0),
        TechnicianId: 3,
        Note: "Note 2",
    },
];

export const technicianData = [
    { text: 'Alexandra Martinez', id: 1, color: '#ffaa00', description: "Example 1" },
    { text: 'Brandon Williams', id: 2, color: '#f8a398', description: "Example 2" },
    { text: 'Catherine Johnson', id: 3, color: '#7fa900', description: "Example 3" },
    { text: 'David Thompson', id: 4, color: '#7fa903', description: "Example 4" },
    { text: 'Emily Davis', id: 5, color: '#7fa920', description: "Example 5" },
    { text: 'Michael Anderson', id: 6, color: '#7fa960', description: "Example 6" },
];
