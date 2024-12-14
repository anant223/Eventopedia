import React from 'react'

const RecentEvent = ({heading1, heading2, heading3, heading4,eventAttendees, eventDate, title, eventStatus, otherInfo}) => {
  return (
    <div className="overflow-x-auto text-gray-400 rounded">
      <table className="min-w-full divide-y divide-gray-700">
        <thead className="bg-gray-700">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {heading1}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {heading2}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {heading3}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {heading4}
            </th>
          </tr>
        </thead>
        <tbody className="bg-gray-900 divide-y divide-gray-200">
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
              {title}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {eventDate}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {eventAttendees}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span
                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  eventStatus === "Upcoming"
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {eventStatus || otherInfo}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default RecentEvent