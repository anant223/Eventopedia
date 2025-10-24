import React from 'react'
import { Link } from 'react-router-dom';

const EventHistoryCard = ({imgUrl, title, date, id, hosts}) => {
    console.log(hosts)
    return (
      <Link to={`/main/event-detail/${id}`}>
        <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-3 shadow-sm hover:shadow-md hover:bg-muted/50 transition-all duration-200">
          <img
            src={
              imgUrl ||
              "/placeholder.svg?height=64&width=64&query=event%20thumbnail"
            }
            alt="Event thumbnail"
            className="h-14 w-14 rounded-lg object-cover ring-1 ring-border"
          />

          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground truncate">
              {title}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <div className="flex -space-x-2">
                {hosts?.slice(0, 3).map((host) => (
                  <div key={host._id} className="flex items-center gap-1">
                    <img
                      src={host.avatar || "/placeholder.svg?height=32&width=32"}
                      alt={host.name}
                      className="h-6 w-6 rounded-full border border-background object-cover"
                      title={host.name}
                    />
                    <Link
                      to="/main/profile"
                      className="text-xs text-muted-foreground hover:text-white transition capitalize"
                    >
                      {host.name}
                    </Link>
                  </div>
                ))}

                {hosts?.length > 3 && (
                  <span className="h-6 w-6 rounded-full bg-muted text-[10px] text-center flex items-center justify-center border border-border">
                    +{hosts.length - 3}
                  </span>
                )}
              </div>
            </div>
            <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <span>{new Date(date).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </Link>
    );
}

export default EventHistoryCard
