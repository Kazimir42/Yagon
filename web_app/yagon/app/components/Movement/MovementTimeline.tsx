const movementTimeline = [
    {
        id: 1,
        content: 'Applied to',
        target: 'Front End Developer',
        href: '#',
        date: 'Sep 20',
        datetime: '2020-09-20',
        icon: '',
        iconBackground: 'bg-gray-400',
    },
    {
        id: 2,
        content: 'Advanced to phone screening by',
        target: 'Bethany Blake',
        href: '#',
        date: 'Sep 22',
        datetime: '2020-09-22',
        icon: '',
        iconBackground: 'bg-blue-500',
    },
    {
        id: 3,
        content: 'Completed phone screening with',
        target: 'Martha Gardner',
        href: '#',
        date: 'Sep 28',
        datetime: '2020-09-28',
        icon: '',
        iconBackground: 'bg-green-500',
    },
    {
        id: 4,
        content: 'Advanced to interview by',
        target: 'Bethany Blake',
        href: '#',
        date: 'Sep 30',
        datetime: '2020-09-30',
        icon: '',
        iconBackground: 'bg-blue-500',
    },
    {
        id: 5,
        content: 'Completed interview with',
        target: 'Katherine Snyder',
        href: '#',
        date: 'Oct 4',
        datetime: '2020-10-04',
        icon: '',
        iconBackground: 'bg-green-500',
    },
]


export default function MovementTimeline(props) {

    console.log(props.movements)
    return (
        <div className="flow-root">
            <ul role="list" className="-mb-8">
                {movementTimeline.map((event, eventIdx) => (
                    <li key={event.id}>
                        <div className="relative pb-8">
                            {eventIdx !== movementTimeline.length - 1 ? (
                                <span className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"
                                      aria-hidden="true"/>
                            ) : null}
                            <div className="relative flex flex-row items-center gap-3">
                                <span
                                    className={'bg-primary h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-main'}>
                                </span>
                                <div className="flex min-w-0 flex-1 justify-between space-x-4 ">
                                    <div>
                                        <p className="text-gray-500">
                                            {event.content}{' '}
                                            <a href={event.href} className="font-medium text-gray-900">
                                                {event.target}
                                            </a>
                                        </p>
                                    </div>
                                    <div className="whitespace-nowrap text-right text-sm text-gray-500">
                                        <time dateTime={event.datetime}>{event.date}</time>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
