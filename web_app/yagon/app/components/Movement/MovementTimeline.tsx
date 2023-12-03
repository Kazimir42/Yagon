import { Key } from "react"

export default function MovementTimeline(props) {

    return (
        <div className="flow-root">
            <ul role="list" className="-mb-8">
                {props.movements.reverse().map((movement: { id: Key | null | undefined }, index: number) => (
                    <li id={'movement_' + movement.id} key={movement.id}>
                        <div className="relative pb-8">
                            {index !== props.movements.length - 1 ? (
                                <span className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"
                                      aria-hidden="true"/>
                            ) : null}
                            <div className="relative flex flex-row items-center gap-3">
                                <span
                                    className={'bg-primary h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-main'}>
                                </span>
                                <div className="flex min-w-0 flex-1 justify-between space-x-4">
                                    <div>
                                        <p className="text-gray-500">
                                            {movement.name}{' '}
                                        </p>
                                        {movement.description ?
                                            <p className="text-gray-400 text-sm font-light">
                                                {movement.description}
                                            </p>
                                            :
                                            ''
                                        }
                                    </div>
                                    <div className="whitespace-nowrap text-right text-sm text-gray-500">
                                        <p id='location' className={'font-bold text-primary text-sm'}>{movement.location}</p>
                                        <time dateTime={movement.date}>{movement.date}</time>
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
