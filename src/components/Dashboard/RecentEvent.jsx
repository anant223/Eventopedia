import React from 'react'

const RecentEvent = () => {
  return (
    <div className="overflow-x-auto text-gray-400 rounded">
    <table className="min-w-full divide-y divide-gray-700">
        <thead className="bg-gray-700">
        <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Event Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Attendees
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Status
            </th>
        </tr>
        </thead>
        <tbody className="bg-gray-900 divide-y divide-gray-200">
        {[
            {
            name: "Tech Conference 2023",
            date: "2023-10-15",
            attendees: 75,
            status: "Upcoming",
            },
            {
            name: "Product Launch",
            date: "2023-09-30",
            attendees: 120,
            status: "Completed",
            },
            {
            name: "Team Building Workshop",
            date: "2023-11-05",
            attendees: 30,
            status: "Upcoming",
            },
        ].map((event, index) => (
            <tr key={index}>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
                {event.name}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {event.date}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {event.attendees}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <span
                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    event.status === "Upcoming"
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }`}
                >
                {event.status}
                </span>
            </td>
            </tr>
        ))}
        </tbody>
    </table>
    </div>
  );
}

export default RecentEvent